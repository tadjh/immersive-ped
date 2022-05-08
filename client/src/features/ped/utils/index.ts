import { Args } from "../../../types";

export function getArg(args: Args) {
  const [arg1] = args;
  return arg1;
}

export function shouldRequestModel(model: number) {
  return IsModelInCdimage(model) && IsModelAPed(model);
}
