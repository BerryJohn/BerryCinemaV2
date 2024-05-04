import { PlaylistData } from "./types";

const fakePlaylistData: PlaylistData[] = [
  {
    name: "Playlist 1",
    description: "This is a playlist",
    url: "https://www.youtube.com/watch?v=3y5A4paFOb4",
    image: "https://i.ytimg.com/vi/3y5A4paFOb4/hqdefault.jpg",
  },
  {
    name: "Playlist 2",
    description: "This is a playlist",
    url: "https://www.youtube.com/watch?v=3y5A4paFOb4",
    image: "https://i.ytimg.com/vi/3y5A4paFOb4/hqdefault.jpg",
  },
];

const Playlist = () => {
  return (
    <div className="border-red-900 border col-span-2 col-start-1">
      <div className="flex items-center gap-2">
        <span className="text-4xl">Playlist</span>
        <div className="divide-y divide-gray-400 " />
        <span className="text-xl">0</span>
        <span className="text-xl">00:00:00</span>
      </div>
      <div className="flex-col gap-4">
        {fakePlaylistData.map((playlist) => (
          <div className="border-red-900 border h-12">
            {/* <img src={playlist.image} alt={playlist.name} />
            <span>{playlist.name}</span>
            <span>{playlist.description}</span>
            <a href={playlist.url} target="_blank" rel="noreferrer">
              Watch
            </a> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;
