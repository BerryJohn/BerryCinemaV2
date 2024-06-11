import useVideoPlayerStore from "@Berry/stores/videoPlayer/store";

const Title = () => {
  const currentPlayingVideo = useVideoPlayerStore(
    (store) => store.currentPlayingVideo,
  );

  if (!currentPlayingVideo?.title) return null;

  return (
    <div className="text-2xl bg-slate-600 bg-opacity-50 rounded-sm p-2 pr-8 w-fit hover:bg-opacity-100">
      {currentPlayingVideo?.title}
    </div>
  );
};

export default Title;
