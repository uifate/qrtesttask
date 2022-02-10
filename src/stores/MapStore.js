import { types, destroy, isAlive, getParent } from "mobx-state-tree";

const mapInitial = require("~/src/assets/map.json").map((p, i) => ({ ...p, id: i }));

const MapPoint = types.model({
  id: types.number,
  name: types.string,
  x: types.number,
  y: types.number,
  amount: types.number
}).actions((self) => ({
  select() {
    getParent(self, 2).setSelected(self.id);
  },
  change(point) {
    self.x = point.x ?? self.x;
    self.y = point.y ?? self.y;
    self.name = point.name ?? self.name;
    self.amount = point.amount ?? self.amount;
    getParent(self, 2).savePoints();
  },
  remove() {
    getParent(self, 2).removePoint(self);
  }
})).views((self) => ({
  get isSelected() {
    if (isAlive(self)) {
      return getParent(self, 2).selected === self.id;
    }
  }
}));

const MapStore = types.model("MapStore", {
  points: types.optional(types.array(MapPoint), []),
  selected: types.optional(types.number, -1)
}).actions((self) => ({
  setSelected(id) {
    self.selected = id;
  },
  removePoint(point) {
    destroy(point);
    self.setSelected(-1);
  },
  newPoint() {
    const id = self.points.length ? self.points[self.points.length - 1].id + 1 : 1;
    self.points.push(MapPoint.create({
      id,
      name: "New Point",
      x: 0,
      y: 0,
      amount: 0
    }));
    self.setSelected(id);
    self.savePoints();
  },
  pointsFromArray(points) {
    self.points = points.map(p => MapPoint.create(p));
  },
  loadPoints() {
    self.pointsFromArray(JSON.parse(localStorage.getItem("points")) || mapInitial);
  },
  savePoints() {
    localStorage.setItem("points", JSON.stringify(self.points));
  },
  resetPoints() {
    self.pointsFromArray(mapInitial);
    self.savePoints();
    self.setSelected(-1);
  }
})).views((self) => ({
  get selectedPoint() {
    return self.points.find(p => p.id === self.selected);
  }
}));

export { MapPoint, MapStore }