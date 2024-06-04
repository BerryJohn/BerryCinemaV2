import useVideoPlayerStore from "./../../../../stores/videoPlayer/store";

const Title = () => {
  const currentPlayingVideo = useVideoPlayerStore(
    (store) => store.currentPlayingVideo,
  );

  return <>{currentPlayingVideo?.title || ""}</>;
};

export default Title;
