import { DEFAULT_PED_MODEL, models } from "../../config";
import { Args, Model } from "../../types";
import { getArg, isEmpty, shouldRequestModel, debugDATA } from "./utils";

/**
 * Spawns the new ped model and releases it from memory
 * @param model The ped model hash
 */
function spawn(model: Model) {
  SetPlayerModel(PlayerId(), model);
  SetPedDefaultComponentVariation(PlayerPedId());
  SetModelAsNoLongerNeeded(model);
  debugDATA(`set ped model to "${model}"`);
}

function handleSpawn(model: Model) {
  const tick = setTick(() => {
    if (HasModelLoaded(model)) {
      spawn(model);
      return clearTick(tick);
    }
    Wait(0);
  });
}

/**
 * Loads the ped into memory
 * @param name The ped name
 * @returns void
 */
function request(model: Model) {
  if (!shouldRequestModel(model))
    return debugDATA(`ped model "${model}" not found`);
  RequestModel(model);
  handleSpawn(model);
}

function requestDefault() {
  request(DEFAULT_PED_MODEL);
}

function handleRequest(arg: string) {
  switch (arg) {
    case "f":
    case "female":
    case "-1667301416":
    case models.MP_F_Freemode_01:
      return request(models.MP_F_Freemode_01);
    case "m":
    case "male":
    case "1885233650":
    case models.MP_M_Freemode_01:
      return request(models.MP_M_Freemode_01);
    default:
      return request(arg);
  }
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
  handleRequest(arg);
}
