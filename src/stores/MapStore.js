import { types, destroy } from "mobx-state-tree";

const mapInitial = require("~/src/assets/map.json").map((p, i) => ({ ...p, id: i }));

const MapPoint = types.model({
  id: types.identifierNumber,
  name: types.string,
  x: types.number,
  y: types.number,
  amount: types.number
}).actions((self) => ({
  change(point) {
    self.x = point.x ?? self.x;
    self.y = point.y ?? self.y;
    self.name = point.name ?? self.name;
    self.amount = point.amount ?? self.amount;
  }
}));

const MapStore = types.model("MapStore", {
  points: types.optional(types.array(MapPoint), []),
  selectedPoint: types.maybeNull(types.reference(MapPoint))
}).actions((self) => ({
  setSelected(id) {
    self.selectedPoint = id;
  },
  setSelectedPoint(point) {
    self.setSelected(point.id);
  },
  unselect() {
    self.setSelected(null);
  },
  removePoint(point) {
    destroy(point);
    self.unselect();
  },
  removeSelectedPoint() {
    self.removePoint(self.selectedPoint);
    self.savePoints();
  },
  changeSelectedPoint(point) {
    self.selectedPoint.change(point);
    self.savePoints();
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
    self.unselect();
  }
}));

export { MapPoint, MapStore }