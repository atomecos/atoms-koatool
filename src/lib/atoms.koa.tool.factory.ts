import * as Koa from "koa";
import { IProcessContext } from "atomservicescore";
import { HttpContext, Composing } from "atoms-httpcore";
import { AtomsKoaApplication } from "./atoms.koa.application";

export const AtomsKoaToolFactory = (toolsetsName: string, properties: any) => {
  const application: AtomsKoaApplication = new Koa();
  application.compose = (context: IProcessContext, composing: Composing) =>
    application.use((ctx: any, next: () => Promise<any>) => {
      ctx.process = context;
      composing(ctx, next);
    });

  return application;
};
