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

app.intent('around me', conv => {
  conv.data.requestedPermission = 'DEVICE_PRECISE_LOCATION';
  return conv.ask(new Permission({
      context: 'to locate you',
      permissions: conv.data.requestedPermission,
  }));
})
 
app.intent('user_info', async (conv, params, permissionGranted) => {
  if (permissionGranted) {
      const {
          requestedPermission
      } = conv.data;
      if (requestedPermission === 'DEVICE_PRECISE_LOCATION') {

           const city = conv.device.location.city;

          if (city) {
              return await actions.getLocation(city)
              .then((result) => {
                return conv.ask(result);
              })
          } else {
              // Note: Currently, precise locaton only returns lat/lng coordinates on phones and lat/lng coordinates
              // and a geocoded address on voice-activated speakers.
              // Coarse location only works on voice-activated speakers.
              return conv.close('Sorry, I could not figure out where you are.');
          }

      }
  } else {
      return conv.close('Sorry, permission denied.');
  }
});

express().use(bodyParser.json(), app).listen(3000, () => {
  console.log(`Express server listening on port 3000`);
});