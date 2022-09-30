import { createRouter } from "./context";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const citationRouter = createRouter()
  .query("getAll", {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ ctx }) {
      return await ctx.prisma.citation.findMany({
        where: {
          userId: ctx?.session?.user?.id,
        },
      });
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
  })
  .mutation("delete", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.citation.delete({
        where: {
          id: input.id,
        },
      });
    },
  });
