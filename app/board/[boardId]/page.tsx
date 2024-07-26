import { Room } from "@/components/room";
import { Canvas } from "./_components/canvas";
import { Loading } from "./_components/loading";

interface BoardPageProps {
  params: {
    boardId: string;
  };
}

const BoardPage = ({ params }: BoardPageProps) => {
  // if (true) return <Loading />;

  return (
    <Room fallback={<Loading />} roomId={params.boardId}>
      <Canvas />
    </Room>
  );
};

export default BoardPage;
