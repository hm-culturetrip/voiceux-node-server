const controller = require("./controller");

class routes {
  constructor() {
    this.controller = new controller.controller();
  }

  routes(app) {
    app.route("/location/:location")
        .get(this.controller.getLocationResolved);
  }
}
exports.routes = routes;