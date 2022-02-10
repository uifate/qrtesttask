import { types } from "mobx-state-tree";

export const UserStore = types.model("UserStore", {
  loggedIn: types.optional(types.boolean, false)
}).actions((self) => ({
  load() {
    if (localStorage.getItem("user") === "true") {
      self.loggedIn = true;
    }
  },
  save() {
    localStorage.setItem("user", "true");
  },
  login(username, password) {
    if (username === "test" && password === "test") {
      self.loggedIn = true;
      self.save();
      return true;
    } else {
      return false;
    }
  },
  logout() {
    localStorage.removeItem("user");
    self.loggedIn = false;
  }
}));