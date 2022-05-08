import { models } from "../../constants";
import { Args } from "../../types";
import { getArg, shouldRequestModel } from "./utils";

/**
 * Spawns the new ped model and releases it from memory
 * @param model The ped model hash
 */
function spawn(model: number) {
  SetPlayerModel(PlayerId(), model);
  SetPedDefaultComponentVariation(PlayerPedId()); // TODO Is this needed?
  SetModelAsNoLongerNeeded(model);
}

function handleSpawn(model: number) {
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
function request(name: string) {
  const model = GetHashKey(name);
  if (!shouldRequestModel(model)) return;
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
export function ped(_source: number, args?: Args) {
  if (!args) return setDefault();
  const arg = getArg(args);
  handleRequest(arg);
}
