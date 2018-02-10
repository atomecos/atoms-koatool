import { HttpContextStore } from "atoms-httpcore";
import { IProcessContext } from "atomservicescore";

export const composeHttpContext = async (ctx: any, next: () => void, processContext?: IProcessContext) => {
  ctx.process = processContext;
  ctx.store = new HttpContextStore();

  await next();
};
