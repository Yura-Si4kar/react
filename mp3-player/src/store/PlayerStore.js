import { makeAutoObservable } from "mobx";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/firebase";
import { v4 } from "uuid";

export default class PlayerStore {
  constructor() {
    this._isAlbum = false;
    this._list = [];
    this._albumList = [];
    this.currentTime = 0;
    this.currentAudioIndex = 0;
    this.audio = new Audio();
    this.isPlaying = false;
    this.progress = 0;
    makeAutoObservable(this);

    this.setupTimeUpdate();
    this.setupAudioEnd();
  }

  reset() {
    this.audio.pause();
    this.currentTime = 0;
    this.currentAudioIndex = 0;
    this.isPlaying = false;
    this.progress = 0;
  }

  song() {
    return this._list[this.currentAudioIndex];
  }

  setIsAlbum(bool) {
    this._isAlbum = bool;
  }

  setAudioList(list) {
    const updatedList = list.map((item) => ({ ...item, id: v4() }));
    this._list = updatedList.sort((a, b) => a.name.localeCompare(b.name));
  }

  setAudio(audio) {
    this._list = [...this._list, { ...audio, id: v4() }].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }

  deleteAudio(id) {
    this._list = this._list.filter((el) => el.id !== id);
  }

  getIsAlbum() {
    return this._isAlbum;
  }

  get list() {
    return this._list;
  }

  setAlbumAudioList(list) {
    this._albumList = list;
  }

  get albumAudioList() {
    return this._albumList;
  }

  setupTimeUpdate() {
    this.audio.addEventListener("timeupdate", () => {
      const currentTime = this.audio.currentTime;
      const duration = this.audio.duration;
      const calculateProgress = (currentTime / duration) * 100;
      this.progress = calculateProgress;
    });
  }

  setupAudioEnd() {
    this.audio.addEventListener("ended", () => {
      this.isPlaying = false;
      this.currentTime = 0;
      this.currentAudioIndex++;
      this.startPlay(this.currentAudioIndex);
    });
  }

  play(index) {
    this.progress = 0;
    if (this.isPlaying && this.currentAudioIndex === index) {
      this.audio.pause();
      this.isPlaying = false;
      this.progress = 0;
    } else {
      this.currentAudioIndex = index !== undefined ? index : this.currentAudioIndex;
      this.startPlay(this.currentAudioIndex);
      this.isPlaying = true;
    }
  }

  async startPlay(index) {
    try {
      this.currentAudioIndex = index;
      const file = this._isAlbum
        ? this._albumList[this.currentAudioIndex]
        : this._list[this.currentAudioIndex];
      const fileUrl = await getDownloadURL(ref(storage, file.fullPath));
      this.audio.src = fileUrl;
      this.audio.currentTime = this.currentTime;
      this.audio.play();
      this.isPlaying = true;
    } catch (error) {
      console.log("Помилка завантаження аудіозапису", error);
      throw error;
    }
  }

  handleProgressClick(e) {
    if (this.audio.currentTime) {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const progressBarWidth = progressBar.offsetWidth;
      const progressPercentage = (clickX / progressBarWidth) * 100;
      const seekTime = (progressPercentage * this.audio.duration) / 100;

      this.audio.currentTime = seekTime;
      this.currentTime = seekTime;
    }
  }

  handleChangeVolume(value) {
    this.audio.volume = value / 10;
  }

  previousAudioElement() {
    this.progress = 0;
    if (this.currentAudioIndex > 0) {
      this.play(this.currentAudioIndex - 1);
    } else {
      const condition = this._isAlbum
        ? this._albumList.length - 1
        : this._list.length - 1;
      this.play(condition);
    }
  }

  nextAudioElement() {
    this.progress = 0;
    const condition = this._isAlbum
      ? this.currentAudioIndex === this._albumList.length - 1
      : this.currentAudioIndex === this._list.length - 1;

    if (condition) {
      this.currentAudioIndex = 0;
      this.play(this.currentAudioIndex);
    } else {
      this.play(this.currentAudioIndex + 1);
    }
  }
}
