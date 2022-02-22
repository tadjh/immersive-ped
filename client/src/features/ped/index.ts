import { models as M } from "../../constants";

/**
 * Spawns the new ped model and releases it from memory
 * @param model The ped model hash
 */
const spawn = (model: number) => {
  SetPlayerModel(PlayerId(), model);
  SetPedDefaultComponentVariation(PlayerPedId()); // TODO Is this needed?
  SetModelAsNoLongerNeeded(model);
};

/**
 * Loads the ped into memory
 * @param name The ped name
 * @returns void
 */
const request = (name: string) => {
  const model = GetHashKey(name);
  if (!IsModelInCdimage(model) || !IsModelAPed(model)) return;
  RequestModel(model);
  // const startTime = Date.now();
  const tick = setTick(() => {
    if (HasModelLoaded(model)) {
      spawn(model);
      return clearTick(tick);
    }
    // if (Date.now() - startTime > MAX_EXECUTION) clearTick(tick);
    Wait(0);
  });
};

/**
 * Sets ped model based on args
 * @param source The source
 * @param args The args
 * @returns void
 */
export const ped = (source: number, args?: [string]) => {
  if (!args) return request(M.MP_M_Freemode_01);
  const [name] = args;
  let pedName = "";
  switch (name) {
    case "f":
    case "female":
      pedName = M.MP_F_Freemode_01;
      break;
    case "m":
    case "male":
      pedName = M.MP_M_Freemode_01;
      break;
    default:
      pedName = name;
      break;
  }
  request(pedName);
};
