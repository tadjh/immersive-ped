import { DEFAULT_PED_MODEL, models } from "../../config";
import { Args, Model, PedCallback } from "../../types";
import { getArg, isEmpty, shouldRequestModel, debugDATA } from "./utils";
import { SetPedModel } from "./utils/natives";

function cleanUp(model: Model) {
  SetModelAsNoLongerNeeded(model);
}

function spawn(model: Model, callback?: PedCallback) {
  SetPlayerModel(PlayerId(), model);
  const ped = PlayerPedId();
  SetPedDefaultComponentVariation(ped);
  cleanUp(model);
  debugDATA(`set ped model to "${model}"`);
  return callback && callback(ped);
}

function handleSpawn(model: Model, callback?: PedCallback) {
  const tick = setTick(() => {
    if (HasModelLoaded(model)) {
      clearTick(tick);
      spawn(model, callback);
    }
    Wait(0);
  });
}

function request(model: Model, callback?: PedCallback) {
  if (!shouldRequestModel(model))
    return debugDATA(`ped model "${model}" not found`);
  RequestModel(model);
  handleSpawn(model, callback);
}

export function requestDefault(callback?: PedCallback) {
  request(DEFAULT_PED_MODEL, callback);
}

export function handleRequest(arg: string, callback?: PedCallback) {
  switch (arg) {
    case "f":
    case "female":
    case "-1667301416":
    case models.MP_F_Freemode_01:
      return request(models.MP_F_Freemode_01, callback);
    case "m":
    case "male":
    case "1885233650":
    case models.MP_M_Freemode_01:
      return request(models.MP_M_Freemode_01, callback);
    default:
      return request(arg, callback);
  }
}

export function callback(ped: number) {
  return ped;
}

/**
 * Sets ped model based on args
 * @param _source The source (unused)
 * @param args The args
 * @returns void
 */
export function ped(_source: number, args: Args) {
  if (isEmpty(args)) return requestDefault();
  const arg = getArg(args);
  SetPedModel(arg);
}

export { SetPedModel };
