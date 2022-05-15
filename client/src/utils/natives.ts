import {
  handleRequest,
  requestDefault,
  setPedModelCallback,
} from "../features/ped";
import { Model, PedCallback } from "../types";

export function SetPedModel(
  model?: Model,
  callback: PedCallback = (ped: number) => setPedModelCallback(ped)
) {
  if (model === undefined || model === "undefined") return requestDefault();
  return handleRequest(model, callback);
}
