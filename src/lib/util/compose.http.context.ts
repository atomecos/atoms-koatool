import { HttpContextStore, Util } from "atoms-httpcore";
import { IProcessContext } from "atomservicescore";

export const composeHttpContext = async (ctx: any, next: () => void, processContext?: IProcessContext) => {
  ctx.toolname = "AtomsKoaTool";
  ctx.process = processContext;
  ctx.store = new HttpContextStore();
  ctx.data = () => Object.assign({}, Util.cloneDeep(ctx.request.body), Util.cloneDeep(ctx.query));

  await next();
};
