import { Application } from "atoms-httpcore";
import * as Koa from "koa";

export interface AtomsKoaApplication extends Koa, Application.IApplicationComposable { }
