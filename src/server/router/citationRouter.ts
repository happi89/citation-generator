import { createRouter } from "./context";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const citationRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.citation.findMany({});
    },
  })
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
  })
  .mutation("add", {
    input: z.object({
      content: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.citation.create({
        data: {
          content: input.content,
          userId: String(ctx?.session?.user?.id),
        },
      });
    },
  });
