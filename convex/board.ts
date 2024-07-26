import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { GenericMutationCtx, GenericQueryCtx } from "convex/server";
import { DataModel, Id } from "./_generated/dataModel";
import { getAllOrThrow } from "convex-helpers/server/relationships";

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

const getIdentity = async (
  ctx: GenericMutationCtx<DataModel> | GenericQueryCtx<DataModel>
) => {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    throw new Error("Unauthrized");
  }

  return identity;
};

export const create = mutation({
  args: {
    title: v.string(),
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await getIdentity(ctx);

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

export const getBoardList = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favorites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await getIdentity(ctx);

    /**
     * boards 테이블에서 orgId와 같은 (q.eq()) 항목을 미리 생성한 인덱스로 찾고
     * desc로 정렬해서 모두 read
     * board 목록은 조회하는 빈도가 높기 때문에 성능상승을 위해 미리 인덱스처리
     */
    let boards = [];

    const title = args.search as string;

    /**
     * TODO : favorite과 search 동시 사용해보기
     */
    if (args.favorites) {
      const favoriteBoards = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_org", (q) =>
          q.eq("userId", identity.subject).eq("orgId", args.orgId)
        )
        .order("desc")
        .collect();

      const ids = favoriteBoards.map((board) => board.boardId);

      const boardList = await getAllOrThrow(ctx.db, ids);

      return boardList.map((board) => ({
        ...board,
        isFavorite: true,
      }));
    }

    if (title) {
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q) =>
          q.search("title", title).eq("orgId", args.orgId)
        )
        .collect();
    } else {
      boards = await ctx.db
        .query("boards")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
        .order("desc")
        .collect();
    }

    const boardsRelationFavorite = boards.map((board) => {
      return ctx.db
        .query("userFavorites")
        .withIndex("by_user_board", (q) =>
          q.eq("userId", identity.subject).eq("boardId", board._id)
        )
        .unique()
        .then((favorite) => {
          return { ...board, isFavorite: !!favorite };
        });
    });

    const result = await Promise.all(boardsRelationFavorite);

    return result;
  },
});

export const remove = mutation({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx, args) => {
    await getIdentity(ctx);

    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: {
    id: v.id("boards"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    await getIdentity(ctx);

    const title = args.title;

    if (!title) throw new Error("title is required");
    if (title.length >= 60) throw new Error("title is under 60 character");

    const board = await ctx.db.patch(args.id, { title });

    return board;
  },
});

export const favorite = mutation({
  args: {
    id: v.id("boards"),
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await getIdentity(ctx);

    // board, favorite 조회해서 유무 판단 후, 에러처리
    // 에러처리 후 favorite db에 insert

    const board = await ctx.db.get(args.id);

    if (!board) throw new Error("board not found");

    const userId = identity.subject;

    const isExistFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", args.id)
      )
      .unique();

    if (isExistFavorite) throw new Error("already favorite");

    await ctx.db.insert("userFavorites", {
      orgId: args.orgId,
      userId,
      boardId: args.id,
    });

    return;
  },
});

export const unFavorite = mutation({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const identity = await getIdentity(ctx);

    // board, favorite 조회해서 유무 판단 후, 에러처리
    // 에러처리 후 favorite delete

    const board = await ctx.db.get(args.id);

    if (!board) throw new Error("board not found");

    const userId = identity.subject;

    const isExistFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", args.id)
      )
      .unique();

    if (!isExistFavorite) throw new Error("favorite not found");

    /**
     * 테이블 정보를 전달하지 않아도 id로 삭제가 가능한 이유는
     * isExistFavorite에서 userFavorites 테이블의 데이터를 조회하고
     * 반환되는 _id의 타입에 userFavorites 테이블이 명시되어 있기 때문에
     * delete 메서드를 사용할 때 테이블 정보를 전달하지 않아도 삭제가 가능하다.
     */
    await ctx.db.delete(isExistFavorite._id);

    return;
  },
});

export const getBoard = query({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const board = await ctx.db.get(args.id);

    return board;
  },
});
