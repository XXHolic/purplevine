import axios from "../asset/js/axios.min.js";
import Sortable from "../asset/js/sortable.esm.js";
import { api } from "./api.js";

const expando = "player" + new Date().getTime();
class AudioPlayer {
  constructor(params) {
    const { ele, src } = params;
    ele[expando] = this;
    this.ele = ele;
    this.src = src;
  }

  static get(ele) {
    return ele[expando];
  }

  play() {
    this.ele.play();
  }

  pause() {
    this.ele.pause();
  }

  on(type,fun) {
    this.ele.addEventListener(type, fun);
  }
}

const audioEle = document.querySelector("#audioPlayer");
let preloadTimer = null;

const preloadProgress = () => {
  const buffered = audioEle.buffered;
  if (buffered.length) {
    console.info("duration", audioEle.duration);
    console.info("buffered.end(0)", buffered.end(0));
  }
  preloadTimer = setTimeout(preloadProgress, 1000);
}

const audioEvent = (params) => {
  const { src } = params;
  audioEle.src = src;
  const hasInstance = AudioPlayer.get(audioEle);
  if (!hasInstance) {
    const player = new AudioPlayer({ ele: audioEle, src });
    player.play();
    player.on("play", () => {
      preloadProgress();
    });
  }
}

const getMusic = async (params) => {
  const { status, data } = await axios.post(api.song, params);
  if (status == 200) {
    const playerMsg = document.querySelector("#playerMsg");
    const playerTimeTotal = document.querySelector("#playerTimeTotal");
    const { format, singerName, songName } = data;
    playerMsg.innerHTML = `${songName}-${singerName}`;
    playerTimeTotal.innerHTML = format;
    audioEvent(data);
  }
};
export { getMusic };
