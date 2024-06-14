import { Socket } from "socket.io";
import { VideoInfoType } from "./../../common/types";
import { v4 as uuidv4 } from "uuid";

const DURATION = 1000;

const getThumbnail = (url: string) => {
  let thumbnail = undefined;
  if (url.includes("youtube.com")) {
    const videoID = url.split("v=")[1];
    thumbnail = `https://img.youtube.com/vi/${videoID}/0.jpg`;
  }
  return thumbnail;
};

interface VideoPlayerHandler {
  play(): void;
  stop(): void;
  getCurrentTime(): void;
  addVideo(video: VideoInfoType): void;
  removeVideo(videoID: string): void;
  playNext(): void;
  resetTimer(): void;
  seekTo(time: number): void;
  socket: Socket;
  reset(): void;
}

class VideoPlayerHandler implements VideoPlayerHandler {
  intervalID: ReturnType<typeof setInterval>;
  isPlaying: boolean = false;
  previusDate: number;
  duration: number = 0;
  currentVideo: VideoInfoType;
  queue: VideoInfoType[] = [];
  io: any;
  DEBUG_MODE: boolean = true;

  constructor(io: any) {
    this.io = io;
  }

  play() {
    if (!this.currentVideo || this.currentVideo.video.url === "") {
      throw new Error("No video to play");
    }
    if (this.isPlaying) {
      throw new Error("Already playing");
    }

    this.isPlaying = true;
    this.previusDate = Date.now();

    this.intervalID = setInterval(() => {
      const currentDate = Date.now();
      const timeDiffInMiliseconds = (currentDate - this.previusDate) / 1000;
      this.previusDate = currentDate;
      this.duration += timeDiffInMiliseconds;

      if (this.duration >= this.currentVideo.video.duration) {
        this.playNext();
        this.resetTimer();
        clearInterval(this.intervalID);
      }

      if (this.DEBUG_MODE) {
        console.log(`Current time: ${this.duration}`);
      }
    }, DURATION);

    if (this.DEBUG_MODE) {
      console.log("------PLAY COMMAND------");
      console.log(`Playing video: ${this.currentVideo.title}`);
      console.log(`Duration: ${this.duration}`);
      console.log("--------------------");
    }
  }

  stop() {
    if (!this.isPlaying) throw new Error("Already stopped");
    clearInterval(this.intervalID);
    this.isPlaying = false;

    if (this.DEBUG_MODE) {
      console.log("------STOP COMMAND------");
      console.log(`Stopped video: ${this.currentVideo.title}`);
      console.log(`Duration: ${this.duration}`);
      console.log("--------------------");
    }
  }

  getCurrentTime() {
    return this.duration;
  }

  addVideo(video: VideoInfoType) {
    const videoWithID: VideoInfoType = {
      id: uuidv4(),
      isPlaying: false,
      thumbnail: getThumbnail(video.video.url),
      ...video,
    };
    if (this.currentVideo === undefined) {
      this.currentVideo = videoWithID;
    }
    this.queue.push(videoWithID);

    if (this.DEBUG_MODE) {
      console.log(`Video with ID ${videoWithID.id} added to queue`);
      console.log("-------------------------------------------");
      console.log("Current queue:");
      this.queue.map((video, index: number) => {
        console.log(`Video ${index}: ${video.title} - ${video.id}`);
      });
      console.log("-------------------------------------------");
    }
  }

  removeVideo(videoID: string): void {
    if (this.currentVideo.id === videoID) {
      this.playNext();
    }

    this.queue = this.queue.filter((video) => video.id !== videoID);

    if (this.DEBUG_MODE) {
      console.log(`Video with ID ${videoID} removed from queue`);
      console.log("-------------------------------------------");
      console.log("Current queue:");
      this.queue.map((video, index: number) => {
        console.log(`Video ${index}: ${video.title} - ${video.id}`);
      });
      if (this.queue.length === 0) console.log("Queue is empty");
      console.log("-------------------------------------------");
    }
  }
  playNext() {
    if (this.queue.length <= 1) {
      this.currentVideo = undefined;
      if (this.DEBUG_MODE) {
        console.log("------Queue is empty-----");
      }
      return;
    }
    this.queue.shift();
    this.currentVideo = this.queue[0];

    if (this.DEBUG_MODE) {
      console.log("------PLAY NEXT VIDEO------");
      console.log(`Playing next video: ${this.currentVideo.title}`);
      console.log("---------------------------");
    }
  }

  resetTimer() {
    this.duration = 0;
  }

  seekTo(time: number) {
    if (this.currentVideo.video.duration <= time)
      throw new Error("Seeking time is greater than video duration");
    if (time < 0) throw new Error("Seeking time is less than 0");

    this.duration = time;

    if (this.DEBUG_MODE) {
      console.log(`----Seeked to ${time} seconds----`);
    }
  }

  reset() {
    this.isPlaying = false;
    this.previusDate = 0;
    this.duration = 0;
    this.currentVideo = undefined;
    this.queue = [];
    clearInterval(this.intervalID);

    if (this.DEBUG_MODE) {
      console.log("------RESET COMMAND------");
      console.log("Player reseted");
      console.log("--------------------");
    }
  }
}

export default VideoPlayerHandler;
