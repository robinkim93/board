import { Info } from "./_components/info";
import { Participants } from "./_components/participants";
import { ToolBar } from "./_components/toolbar";

const BoardPage = () => {
  return (
    <div className="w-full h-full relative bg-neutral-100">
      <Info />
      <Participants />
      <ToolBar />
    </div>
  );
};

export default BoardPage;
