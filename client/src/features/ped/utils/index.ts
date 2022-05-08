import { Model } from "../../../types";
export * from "../../../utils";

export function shouldRequestPedModel(model: Model) {
  return IsModelInCdimage(model) && IsModelAPed(model);
}
