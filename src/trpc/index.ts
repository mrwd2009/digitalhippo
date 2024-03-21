import { authRouter } from "./auth-router";
import { publicProcedure, router, createContext } from "./trpc";

export const appRouter = router({
  anyApiRoute: publicProcedure.query(() => {
    return 'hello';
  }),
  auth: authRouter,
});

export  {
  createContext,
};

export type AppRouter = typeof appRouter;