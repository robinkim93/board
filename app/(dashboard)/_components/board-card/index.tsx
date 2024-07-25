import Image from "next/image";
import Link from "next/link";
import { Overlay } from "./overlay";
import { Footer } from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import { Actions } from "@/components/actions";
import { MoreHorizontal } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";

interface BoardCardProps {
  id: string;
  title: string;
  authorId: string;
  authorName: string;
  imageUrl: string;
  orgId: string;
  createdAt: number;
  isFavorite: boolean;
}

export const BoardCard = ({
  id,
  title,
  authorId,
  authorName,
  imageUrl,
  orgId,
  createdAt,
  isFavorite,
}: BoardCardProps) => {
  const { userId } = useAuth();

  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });
  const authorLabel = authorId === userId ? "You" : authorName;

  const { mutation: favoriteMutation, isPending: isFavoritePending } =
    useApiMutation(api.board.favorite);
  const { mutation: unFavoriteMutation, isPending: isUnFavoritePending } =
    useApiMutation(api.board.unFavorite);

  const onClickFavorite = () => {
    if (isFavorite) {
      unFavoriteMutation({ id });
    } else {
      favoriteMutation({ id, orgId });
    }
  };

  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] flex flex-col border rounded-lg overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt={title} fill className="object-fill" />
          <Overlay />
          <Actions id={id} title={title} side="right">
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity outline-none px-3 py-2">
              <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
        </div>
        <Footer
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          isFavorite={isFavorite}
          onClick={onClickFavorite}
          disabled={isFavoritePending || isUnFavoritePending}
        />
      </div>
    </Link>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="group aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="w-full h-full" />
    </div>
  );
};
