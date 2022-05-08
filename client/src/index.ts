import { COMMAND_PED } from "./constants";
import { ped } from "./features/ped";

RegisterCommand(COMMAND_PED, ped, false);

globalThis.exports("ped", ped);
