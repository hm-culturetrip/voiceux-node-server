const express = require('express')
const bodyParser = require('body-parser')
const { dialogflow } = require('actions-on-google');


const controller = require("./controller");

const app = dialogflow();

app.intent("get location", async (conv, input) => {
  // const location = input["geo-city"];
  const actions = new controller.controller();
  await actions.getLocation(input["geo-city"])
    .then((result) => {
      console.log("Result: ", result);
      conv.ask(result);
    })
  
})

express().use(bodyParser.json(), app).listen(3000, () => {
  console.log(`Express server listening on port 3000`);
});