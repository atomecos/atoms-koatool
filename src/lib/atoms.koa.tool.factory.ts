import * as Koa from "koa";
import { IProcessContext } from "atomservicescore";
import { AtomsKoaApplication } from "./core/atoms.koa.application";
import { Util } from "./util";

export const AtomsKoaToolFactory = (toolsetsName: string, properties: any) => {
  const application: AtomsKoaApplication = new Koa();

  application.getProcessContext = () => Util.getProcessContext(application);
  application.setProcessContext = (processContext: IProcessContext) => Util.setProcessContext(application, processContext);

  application.use((ctx: Koa.Context, next: () => void) => Util.composeHttpContext(ctx, next, application.getProcessContext()));

  application.compose = (composing: Function, ...args: any[]) =>
    (ctx: Koa.Context, next: () => void) => composing.apply(undefined, [ctx, ...args, next]);

  application.useCompose = (composing: Function, ...args: any[]) => {
    const composed: any = application.compose(composing, ...args);
    application.use(composed);
  };

  return application;
};
