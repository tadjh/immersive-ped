import { COMMAND_PED } from "./config";
import { ped } from "./features/ped";
import { SetPedModel } from "./utils/natives";

RegisterCommand(COMMAND_PED, ped, false);

globalThis.exports("ped", ped);
globalThis.exports("SetPedModel", SetPedModel);
