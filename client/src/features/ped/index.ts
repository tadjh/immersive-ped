import { models } from "../../constants";
import { Args, Model } from "../../types";
import { debugDATA } from "../../utils/debug";
import { getArg, isEmpty, shouldRequestPedModel } from "./utils";

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
  if (!shouldRequestPedModel(model))
    return debugDATA(`ped model "${model}" not found`);
  RequestModel(model);
  handleSpawn(model);
}

function setDefault() {
  request(models.MP_M_Freemode_01);
}

function handleRequest(arg: string) {
  switch (arg) {
    case "f":
    case "female":
      return request(models.MP_F_Freemode_01);
    case "m":
    case "male":
      return setDefault();
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
  if (isEmpty(args)) return setDefault();
  const arg = getArg(args);
  handleRequest(arg);
}
