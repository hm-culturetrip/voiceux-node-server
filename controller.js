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
        const title = data.articleResources[0].title;
        res.send(title);
      });
  }

  getLocation(location) {
    const url = `https://app.theculturetrip.com/cultureTrip-api/v1/articles?s=${location}&offset=0&limit=12`
    return axios.default.get(url)
      .then(result => result.data)
      .then((data) => {
        const article = data.articleResources[0];
        return article;
      });
  }

  getWishlist() {
    const url = 'https://app.theculturetrip.com/cultureTrip-api/v2/users/me/bookmarks/'
    return axios.default.get(url, { headers: { authorisation: 'bearer TestUserAccessToken'}})
      .then(result => result.data)
      .then(data => {
        const wishlist = data.data;

        const wishlistLength = wishlist.length;
        const randomIndex = (Math.floor(Math.random() * Math.floor(wishlistLength)));
        return wishlist[randomIndex];
      });
  }
}
exports.controller = controller;