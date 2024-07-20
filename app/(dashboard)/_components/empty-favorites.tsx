import Image from "next/image";

export const EmptyFavorites = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Image
        src="./empty-favorites.svg"
        alt="empty-favorites"
        width={200}
        height={200}
      />
      <h2 className="text-2xl font-semibold mt-6">No favorites!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Try favoriting a board
      </p>
    </div>
  );
};
