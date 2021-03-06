import * as Koa from "koa";
import * as BodyParser from "koa-bodyparser";
import { IProcessContext } from "atomservicescore";
import { Composing } from "atoms-httpcore";
import { AtomsKoaApplication } from "./core/atoms.koa.application";
import { Util } from "./util";

export const AtomsKoaToolFactory = (toolsetsName: string, properties: any) => {
  const application: AtomsKoaApplication = new Koa();

  application.getProcessContext = () => Util.getProcessContext(application);
  application.setProcessContext = (processContext: IProcessContext) => Util.setProcessContext(application, processContext);

  application.compose = (composing: Composing, ...args: any[]) =>
    (ctx: Koa.Context, next: () => void) => composing.apply(undefined, [ctx, ...args, next]);

  application.useCompose = (composing: Composing, ...args: any[]) => {
    const composed: any = application.compose(composing, ...args);
    application.use(composed);
  };

  application.use(BodyParser());
  application.use((ctx: Koa.Context, next: () => Promise<void>) => Util.composeHttpContext(ctx, next, application.getProcessContext()));

  return application;
};
