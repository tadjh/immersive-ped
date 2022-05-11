import { handleRequest, requestDefault } from "..";
import { Model, PedCallback } from "../../../types";

export function SetPedModel(model?: Model, callback?: PedCallback) {
  if (model === undefined || model === "undefined")
    return requestDefault(callback);
  return handleRequest(model, callback);
}
