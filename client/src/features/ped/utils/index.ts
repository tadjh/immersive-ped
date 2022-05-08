import { Model } from "../../../types";
export * from "../../../utils";

export function shouldRequestModel(model: Model) {
  return IsModelInCdimage(model) && IsModelAPed(model);
}
