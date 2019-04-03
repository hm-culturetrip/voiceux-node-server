const axios = require("axios");

class controller {
  constructor() {
    this.getLocation = this.getLocation.bind();
    this.getLocationResolved = this.getLocationResolved.bind();
  }

  getLocationResolved(req, res) {
    const { location } = req.params;
    const url = `https://app.theculturetrip.com/cultureTrip-api/v1/articles?s=${location}&offset=0&limit=12`
    axios.default.get(url)
      .then(result => result.data)
      .then((data) => {
        console.log(data);
        const title = data.articleResources[0].title;
        res.send(title);
      });
  }

  getLocation(location) {
    const url = `https://app.theculturetrip.com/cultureTrip-api/v1/articles?s=${location}&offset=0&limit=12`
    return axios.default.get(url)
      .then(result => result.data)
      .then((data) => {
        console.log(data);
        const title = data.articleResources[0].title;
        return title;
      });
  }
}
exports.controller = controller;