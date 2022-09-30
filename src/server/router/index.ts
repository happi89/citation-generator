// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { citationRouter } from "./citationRouter";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("citation.", citationRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
