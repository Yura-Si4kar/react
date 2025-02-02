import { makeAutoObservable } from "mobx";

export default class AlbumsStore {
  constructor() {
    this._list = [];
    makeAutoObservable(this);
  }

  setAlbums(list) {
    this._list = list;
  }

  get albums() {
    return this._list;
  }
}
