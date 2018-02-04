import { ToolsetsDefined } from "atomservicescore";
import * as Koa from "koa";
import { AtomsKoaApplication, AtomsKoaToolFactory } from "./lib";

export { Koa, AtomsKoaApplication };

module.exports = {
  toolsets: "AtomsKoaTool",
  asset: AtomsKoaToolFactory,
  as: "factory",
} as ToolsetsDefined;
