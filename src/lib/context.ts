import { NextPageContext } from "next";

export const isServer = (ctx?: NextPageContext): boolean => !!(ctx && ctx.res && ctx.res.writeHead);

export const isStaticExport = (ctx?: NextPageContext): boolean =>
    !!(ctx && ctx.res && !ctx.res.writeHead);

export const isClient = (): boolean => typeof window !== "undefined";
