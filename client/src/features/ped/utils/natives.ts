import { handleRequest, requestDefault } from "..";
import { PedCallback } from "../../../types";

export function SetPedModel(model?: string, callback?: PedCallback) {
  if (model === undefined || model === "undefined")
    return requestDefault(callback);
  return handleRequest(model, callback);
}
