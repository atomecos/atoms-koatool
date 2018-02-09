import * as Koa from "koa";
import { HttpContext, HttpContextStore } from "atoms-httpcore";
import { IProcessContext } from "atomservicescore";

export const composeHttpContext = (ctx: any, next: () => void, processContext?: IProcessContext) => {
  ctx.process = processContext;
  ctx.store = new HttpContextStore();

  next();
};
