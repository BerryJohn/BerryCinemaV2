import Playlist from "./Playlist";

const ManageSection = () => {
  return (
    <article className="w-full h-auto bg-slate-900 border-slate-700 border border-t-0 grid grid-cols-3 p-2">
      <Playlist />
      <div className="border-2 border-pink-500" />
    </article>
  );
};

export default ManageSection;
