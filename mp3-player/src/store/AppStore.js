import { makeAutoObservable } from "mobx";
import { getItemsFromLocalStorage, saveItemsToLocalStorage } from "../storages/localStorages";

export default class AppStore {
  constructor() {
    this._isLoading = false;
    this._isAuth = false;
    this._isOpen = false;
    this._user = {};
    this._alarms = [];
    makeAutoObservable(this);
  }

  setLoading(bool) {
    this._isLoading = bool;
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }

  setUserData(user) {
    this._user = user;
  }

  setIsOpen(bool) {
    this._isOpen = bool;
  }

  setAlarmsTime(obj) {
    this._alarms = saveItemsToLocalStorage(obj);
  }

  get loading() {
    return this._isLoading;
  }

  get isAuth() {
    return this._isAuth;
  }

  get userData() {
    return this._user;
  }

  get isOpen() {
    return this._isOpen;
  }

  get alarmsTime() {
    return this._alarms = getItemsFromLocalStorage();
  }
}
