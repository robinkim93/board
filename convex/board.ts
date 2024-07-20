import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const images = [
  "/board-placeholder/1.svg",
  "/board-placeholder/2.svg",
  "/board-placeholder/3.svg",
  "/board-placeholder/4.svg",
  "/board-placeholder/5.svg",
  "/board-placeholder/6.svg",
  "/board-placeholder/7.svg",
  "/board-placeholder/8.svg",
  "/board-placeholder/9.svg",
  "/board-placeholder/10.svg",
  "/board-placeholder/11.svg",
  "/board-placeholder/12.svg",
  "/board-placeholder/13.svg",
];

export const create = mutation({
  args: {
    title: v.string(),
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthrized");
    }

    const randomImage = images[Math.floor(Math.random() * images.length - 1)];

    const board = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: randomImage,
    });

    return board;
  },
});

export const get = query({
  args: {
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthrized");

    /**
     * boards 테이블에서 orgId와 같은 (q.eq()) 항목을 미리 생성한 인덱스로 찾고
     * desc로 정렬해서 모두 read
     * board 목록은 조회하는 빈도가 높기 때문에 성능상승을 위해 미리 인덱스처리
     */
    const boards = await ctx.db
      .query("boards")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .order("desc")
      .collect();

    return boards;
  },
});
