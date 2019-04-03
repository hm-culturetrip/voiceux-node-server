const express = require('express')
const bodyParser = require('body-parser')
const { dialogflow, SimpleResponse, BasicCard, Button, Image } = require('actions-on-google');


const controller = require("./controller");

const app = dialogflow();

app.intent("get location", async (conv, input) => {
  // const location = input["geo-city"];
  const actions = new controller.controller();
  await actions.getLocation(input["geo-city"])
    .then((result) => {
      const hasScreen = conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
      if (hasScreen) {
        conv.ask(new SimpleResponse(result.title),
          new BasicCard({
          title: result.title,
          subtitle: result.description,
          buttons: new Button({
            url: `https://theculturetrip.com${result.url}`,
            title: 'Read here...'
          }),
          image: new Image({
            url: result.thumbnail,
            alt: ''
          })
        }))
      } else {
        conv.ask(result.title);
      }
    })
  
})

express().use(bodyParser.json(), app).listen(3000, () => {
  console.log(`Express server listening on port 3000`);
});