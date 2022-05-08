import { COMMAND_PED } from "./constants";
import { ped } from "./features";

RegisterCommand(COMMAND_PED, ped, false);

globalThis.exports("ped", ped);
