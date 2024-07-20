import Image from "next/image";
import Link from "next/link";
import { Overlay } from "./overlay";
import { Footer } from "./footer";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";

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

  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] flex flex-col border rounded-lg overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt={title} fill className="object-fill" />
          <Overlay />
        </div>
        <Footer
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          isFavorite={isFavorite}
          onClick={() => {}}
          disabled={false}
        />
      </div>
    </Link>
  );
};
