export const ToolBar = () => {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-2 flex flex-col space-y-4">
      <div className="bg-white rounded-md p-1.5 shadow-md flex space-y-1 flex-col items-center">
        <div>Pencil</div>
        <div>Square</div>
        <div>Circle</div>
      </div>
      <div className="bg-white rounded-md p-1.5 shadow-md flex space-y-1 flex-col items-center">
        <div>Undo</div>
        <div>Redo</div>
      </div>
    </div>
  );
};
