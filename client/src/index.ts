import { COMMAND_PED } from "./constants";
import { ped } from "./features";

// Commands
RegisterCommand(COMMAND_PED, ped, false);

// Exports
globalThis.exports("ped", ped);
