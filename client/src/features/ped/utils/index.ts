import { Args, Model } from "../../../types";

export function isEmpty<T extends unknown>(arr: T[]) {
  return Array.isArray(arr) && !arr.length;
}

export function getArg(args: Args) {
  const [arg1] = args;
  return arg1;
}

export function shouldRequestPedModel(model: Model) {
  return IsModelInCdimage(model) && IsModelAPed(model);
}
