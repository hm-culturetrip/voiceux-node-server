const axios = require("axios");

class controller {
  constructor() {
    this.getLocation = this.getLocation.bind();
    this.getWishlist = this.getWishlist.bind();
  }

  getLocation(location) {
    const url = `https://app.theculturetrip.com/cultureTrip-api/v1/articles?s=${location}&offset=0&limit=10`;

    return axios.default.get(url)
      .then(result => result.data)
      .then((data) => {
        const articles = data.articleResources;

        const length = articles.length;
        const randomIndex = (Math.floor(Math.random() * Math.floor(length)));
        return articles[randomIndex];
      });
  }

  getWishlist() {
    const url = 'https://app.theculturetrip.com/cultureTrip-api/v2/users/me/bookmarks/';

    return axios.default.get(url, { headers: { authorisation: 'bearer TestUserAccessToken'}})
      .then(result => result.data)
      .then(data => {
        const wishlist = data.data;

        const wishlistLength = wishlist.length;
        const randomIndex = (Math.floor(Math.random() * Math.floor(wishlistLength)));
        return wishlist[randomIndex];
      });
  }

  getLocationWithCategory() {
    const url = `https://app.theculturetrip.com/cultureTrip-api/v1/articles?s=${location}&offset=0&limit=20`;

    return axios.default.get(url)
      .then(result => result.data)
      .then((data) => {
        const articles = data.articleResources;

        const length = articles.length;
        const randomIndex = (Math.floor(Math.random() * Math.floor(length)));
        return articles[randomIndex];
      });
  }




}
exports.controller = controller;