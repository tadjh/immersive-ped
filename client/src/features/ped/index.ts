import { DEFAULT_PED_MODEL } from "../../config";
import { configFlags } from "../../config/flags";
import { models } from "../../config/models";
import { Args, Model } from "../../types";
import { getArg, isEmpty, shouldRequestModel, debugDATA } from "../../utils";
import { SetPedModel } from "../../utils/natives";

function handleEmit(ped: number) {
  emit("SetPedModel", ped);
  debugDATA(`emitting event "SetPedModel"`);
}

function setPedFlags(ped: number) {
  SetPedConfigFlag(ped, configFlags.PREVENT_AUTO_SHUFFLE_TO_DRIVERS_SEAT, true);
}

function spawn(model: Model, shouldEmit?: boolean) {
  SetPlayerModel(PlayerId(), model);
  SetModelAsNoLongerNeeded(model);
  const ped = PlayerPedId();
  setPedFlags(ped);
  // SetPedDefaultComponentVariation(ped);
  debugDATA(`set ped model to "${model}"`);
  if (shouldEmit) handleEmit(ped);
  return ped;
}

function shouldThreadExpire(elapsedTime: number) {
  const MAX_EXECUTION_TIME = 5000;
  return elapsedTime > MAX_EXECUTION_TIME;
}

function handleSpawn(model: Model, shouldEmit?: boolean) {
  return new Promise<number>(function (resolve, reject) {
    const startTime = Date.now();
    const tick = setTick(() => {
      if (HasModelLoaded(model)) {
        resolve(spawn(model, shouldEmit));
        return clearTick(tick);
      }
      const elapsedTime = Date.now() - startTime;
      if (shouldThreadExpire(elapsedTime)) {
        reject(`Max execution time elapsed in handleSpawn`);
        return clearTick(tick);
      }
    });
  });
}

function request(model: Model, shouldEmit?: boolean) {
  if (!shouldRequestModel(model))
    throw new Error(`ped model "${model}" not found`);
  RequestModel(model);
  return handleSpawn(model, shouldEmit);
}

export function requestDefault(shouldEmit = true) {
  return request(DEFAULT_PED_MODEL, shouldEmit);
}

export function handleRequest(arg: Model, shouldEmit?: boolean) {
  switch (arg) {
    case "f":
    case "female":
      return request(models.MP_F_Freemode_01, shouldEmit);
    case "m":
    case "male":
      return request(models.MP_M_Freemode_01, shouldEmit);
    default:
      return request(arg, shouldEmit);
  }
}

/**
 * Sets ped model based on args
 * @param _source The source (unused)
 * @param args The args
 * @returns void
 */
export async function ped(_source: number, args: Args | []) {
  const arg = isEmpty(args) ? undefined : getArg(args);
  try {
    await SetPedModel(arg);
  } catch (error) {
    debugDATA(error);
  }
}
