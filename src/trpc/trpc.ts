import { User } from "../payload-types";
import { inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { PayloadRequest } from "payload/types";

export const createContext = ({ req, res}: CreateExpressContextOptions) => {
  return {
    req,
    res,
  };
};

type ExpressContext = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<ExpressContext>().create();
const middleware = t.middleware;

const isAuth = middleware(async ({ ctx, next }) => {
  const req = ctx.req as PayloadRequest;

  const { user } = req as { user: User | null };

  if (!user || !user.id) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: {
      user,
    },
  });
})

export const router = t.router;

export const publicProcedure = t.procedure;

export const privateProcedure = t.procedure.use(isAuth);