import { VideoInfoType } from "./../../common/types";
import { v4 as uuidv4 } from "uuid";

const DURATION = 1000;

interface VideoPlayerHandler {
  play(): void;
  stop(): void;
  getCurrentTime(): void;
  addVideo(video: VideoInfoType): void;
  removeVideo(videoID: string): void;
  playNext(): void;
  resetTimer(): void;
  seekTo(time: number): void;
}

class VideoPlayerHandler implements VideoPlayerHandler {
  intervalID: ReturnType<typeof setInterval>;
  isPlaying: boolean = false;
  previusDate: number;
  duration: number = 0;
  currentVideo: VideoInfoType;
  queue: VideoInfoType[] = [];

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
      console.log("playing " + this.duration);
      const currentDate = Date.now();
      const timeDiffInMiliseconds = (currentDate - this.previusDate) / 1000;
      this.previusDate = currentDate;
      this.duration += timeDiffInMiliseconds;
    }, DURATION);
  }

  stop() {
    if (!this.isPlaying) throw new Error("Already stopped");

    clearInterval(this.intervalID);

    this.isPlaying = false;

    console.log("stopped");
  }

  getCurrentTime() {
    return this.duration;
  }

  addVideo(video: VideoInfoType) {
    const videoWithID: VideoInfoType = {
      id: uuidv4(),
      isPlaying: false,
      ...video,
    };
    if (this.currentVideo === undefined) {
      this.currentVideo = videoWithID;
    }
    this.queue.push(videoWithID);
  }
  removeVideo(videoID: string): void {
    console.log("removin " + videoID);
    if (this.currentVideo.id === videoID) {
      this.playNext();
    }

    this.queue = this.queue.filter((video) => video.id !== videoID);
  }
  playNext() {
    if (this.queue.length <= 1) {
      console.log("No more videos to play");
      this.currentVideo = undefined;
      return;
    }
    this.queue.shift();
    this.currentVideo = this.queue[1];
  }

  resetTimer() {
    this.duration = 0;
  }

  seekTo(time: number) {
    if (this.currentVideo.video.duration <= time)
      throw new Error("Seeking time is greater than video duration");
    if (time < 0) throw new Error("Seeking time is less than 0");

    this.duration = time;
    console.log(`seeking to ${time}`);
  }
}

export default VideoPlayerHandler;
