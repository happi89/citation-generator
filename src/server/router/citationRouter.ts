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
      fullName: z.string(),
      date: z.date(),
      title: z.string(),
      websiteName: z.string(),
      url: z.string(),
    }),
    async resolve({ input }) {
      const citation = `${input.fullName}.${input.date}:${input.title}.${input.websiteName}.${input.url}`;
      return citation;
    },
  });
