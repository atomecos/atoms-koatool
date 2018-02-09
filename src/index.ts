import * as Koa from "koa";
import { ToolsetsDefined } from "atomservicescore";
import { AtomsKoaToolFactory } from "./lib";
import { AtomsKoaApplication } from "./lib/core";

export { Koa, AtomsKoaApplication };

module.exports = {
  toolsets: "AtomsKoaTool",
  asset: AtomsKoaToolFactory,
  as: "factory",
} as ToolsetsDefined;
