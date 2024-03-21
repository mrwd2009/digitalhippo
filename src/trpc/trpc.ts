import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";

export const createContext = ({ req, res}: CreateExpressContextOptions) => {
  return {
    req,
    res,
  };
};

type ExpressContext = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<ExpressContext>().create();

export const router = t.router;

export const publicProcedure = t.procedure;