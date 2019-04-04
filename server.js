const express = require('express')
const bodyParser = require('body-parser')
const { dialogflow, SimpleResponse, BasicCard, Button, Image, Permission } = require('actions-on-google');


const controller = require("./controller");

const app = dialogflow();

const actions = new controller.controller();

const giveCityResponse = (result, conv) => {
  const hasScreen = conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');

      if (hasScreen) {
        conv.ask(
          new SimpleResponse(result.title),
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
        })
      );
    } else {

      //onv.ask("I've found " + result.title);
      conv.contexts.set("getlocation-followup", 5, { description: result.description });
      conv.ask(`I've found ${result.title}. Would you like to know more?`);
      //return conv.ask("I've found ", 'is is rfeally nice', 'okay');
      //console.log(response);
      

      //conv.data.description = result.description;

    
    }
}

app.intent("get location - yes", conv => {
  console.log('i wa here;=');
  conv.ask(new SimpleResponse({speech: 'something'}));
});


app.intent("get location", async (conv, input) => {
  return await actions.getLocation(input["geo-city"])
    .then((result) => {
      return giveCityResponse(result, conv);
  });
});


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
                return giveCityResponse(result, conv);
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