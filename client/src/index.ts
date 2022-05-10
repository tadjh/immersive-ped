import { COMMAND_PED } from "./config";
import { ped, SetPedModel } from "./features/ped";

RegisterCommand(COMMAND_PED, ped, false);

globalThis.exports("ped", ped);
globalThis.exports("SetPedModel", SetPedModel);
