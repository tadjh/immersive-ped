import { Args } from "../../../types";

export function isEmpty<T extends unknown>(arr: T[]) {
  return Array.isArray(arr) && !arr.length;
}

export function getArg(args: Args) {
  const [arg1] = args;
  return arg1;
}

export function shouldRequestModel(model: number) {
  return IsModelInCdimage(model) && IsModelAPed(model);
}
