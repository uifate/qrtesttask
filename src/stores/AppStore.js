import { types } from "mobx-state-tree";
import { MapStore } from "./MapStore";
import { UserStore } from "./UserStore";

export const AppStore = types.model("AppStore", {
  mapStore: types.optional(MapStore, {}),
  userStore: types.optional(UserStore, {})
}).actions((self) => ({
  load() {
    self.mapStore.loadPoints();
    self.userStore.load();
  }
}));