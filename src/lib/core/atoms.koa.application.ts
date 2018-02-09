import * as Koa from "koa";
import { Application } from "atoms-httpcore";

export interface AtomsKoaApplication extends
  Koa,
  Application.IApplicationComposable,
  Application.IProcessContextFunctions {
}
