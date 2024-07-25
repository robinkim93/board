import { useQuery } from "convex/react";
import { EmptyBoard } from "./empty-board";
import { EmptyFavorites } from "./empty-favorites";
import { EmptySearch } from "./empty-search";
import { api } from "@/convex/_generated/api";
import { BoardCard } from "./board-card";
import { NewBoardButton } from "./new-board-button";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
  const boardList = useQuery(api.board.get, { orgId, ...query });

  /**
   * boardList 로딩에는 성공했으나, 데이터가 없다면 convex는 Null을 포함할 것임
   * undefined는 데이터 fetching 실패로 볼 수 있음
   */
  if (boardList === undefined) {
    return (
      <div>
        <h2 className="text-3xl">
          {query.favorites ? "Favorite boards" : "Team boards"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 pb-10 mt-8">
          <NewBoardButton orgId={orgId} />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  }

  if (!boardList.length && query.search) {
    return <EmptySearch />;
  }

  if (!boardList.length && query.favorites) {
    return <EmptyFavorites />;
  }

  if (!boardList.length) {
    return <EmptyBoard />;
  }

  return (
    <div>
      <h2 className="text-3xl">
        {query.favorites ? "Favorite boards" : "Team boards"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 pb-10 mt-8">
        <NewBoardButton orgId={orgId} disabled={false} />
        {boardList.map(
          ({
            _id,
            title,
            authorId,
            authorName,
            imageUrl,
            orgId,
            isFavorite,
            _creationTime,
          }) => (
            <BoardCard
              key={_id}
              id={_id}
              title={title}
              authorId={authorId}
              authorName={authorName}
              imageUrl={imageUrl}
              orgId={orgId}
              createdAt={_creationTime}
              isFavorite={isFavorite}
            />
          )
        )}
      </div>
    </div>
  );
};
