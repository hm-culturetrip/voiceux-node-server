const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");

class App {
  constructor() {
    this.serverRoutes = new routes.routes();
    this.app = express();
    this.config();
    this.serverRoutes.routes(this.app);
  }

  config() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(express.static("public"));
  }
}
exports.default = new App().app;