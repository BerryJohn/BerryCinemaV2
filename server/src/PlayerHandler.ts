import { VideoInfoType } from "./../../common/types";
import { v4 as uuidv4 } from "uuid";

const DURATION = 1000;

interface VideoPlayerHandler {
  play(): void;
  stop(): void;
  getCurrentTime(): void;
  addVideo(video: VideoInfoType): void;
  playNext(): void;
  resetTimer(): void;
  seekTo(time: number): void;
}

class VideoPlayerHandler implements VideoPlayerHandler {
  intervalID: ReturnType<typeof setInterval>;
  isPlaying: boolean = false;
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

    this.intervalID = setInterval(() => {
      console.log("playing " + this.duration);
      this.duration += 1;
    }, DURATION);
  }

  stop() {
    if (!this.isPlaying) throw new Error("Already stopped");

    clearInterval(this.intervalID);

    this.isPlaying = false;

    console.log("stopped");
  }

  getCurrentTime() {
    console.log(this.duration);
  }

  addVideo(video: VideoInfoType) {
    const videoWithID: VideoInfoType = { id: uuidv4(), ...video };
    // if (this.queue.length === 0) {
    if (!this.currentVideo) {
      this.currentVideo = videoWithID;
      console.log(`playing ${this.currentVideo.title}`);
      return;
    }

    this.queue.push(videoWithID);
    console.log(`added ${video.title} to queue`);
  }

  playNext() {
    if (this.queue.length === 0) {
      console.log("queue is empty");
      return;
    }

    //ogarnij co robi ten ! na końcu
    this.currentVideo = this.queue.shift()!;
    console.log(`playing ${this.currentVideo.title}`);
  }

  resetTimer() {
    this.duration = 0;
    console.log("timer reset");
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
