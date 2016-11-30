# Facebook Messenger Bot
[![](https://travis-ci.org/bluejamesbond/FacebookMessengerBot.js.svg?branch=master)](https://travis-ci.org/bluejamesbond/FacebookMessengerBot.js)  
The purpose of this library is to offer a simple, light-weight Facebook Messenger Bot API for Node with ES6 support.
Internally, it uses [Promises to ensure compatibility with `async/await`](https://github.com/bluejamesbond/FacebookMessengerBot.js/blob/master/.babelrc#L13).

**Objective:** Given a set of inputs, the library automatically selects the optimal message format to display this data.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Install](#install)
- [Example](#example)
- [Demo](#demo)
- [API By Example](#api-by-example)
  - [Attach Express Router for Verification and Receiving Messages](#attach-express-router-for-verification-and-receiving-messages)
  - [Receive Messages](#receive-messages)
  - [Send Responses](#send-responses)
  - [Handle Postbacks](#handle-postbacks)
  - [Delivery and Optin](#delivery-and-optin)
  - [Set/Delete Greeting and Set Get Started](#setdelete-greeting-and-set-get-started)
  - [Pipe Messages into Bot (i.e. I don't use Express!)](#pipe-messages-into-bot-ie-i-dont-use-express)
  - [Debugging](#debugging)
  - [Extras: Fetch User](#extras-fetch-user)
- [Next Release (very soon)](#next-release-very-soon)
- [Maintainers](#maintainers)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install
```
npm install facebook-messenger-bot --save -E
```

## Example
```es6
import {Bot, Elements} from 'facebook-messenger-bot';

const bot = new Bot(myPageAccessToken, myVerification);

bot.on('message', async message => {
    const {sender} = message;
    await sender.fetch('first_name');

    const out = new Elements();
    out.add({text: `hey ${sender.first_name}, how are you!`});

    await bot.send(sender.id, out);
});

const app = express();
app.use('/facebook', bot.router());
app.listen(3000);
```

## Demo
<a href="http://freedaa.com"><img src="other/banner-3.png" width="500"></a>

I am a chatbot that helps you find free food. Find me on [Facebook Messenger](http://www.freedaa.com).


## API By Example

### Attach Express Router for Verification and Receiving Messages
```es6
import express from 'express';
import {Bot} from 'facebook-messenger-bot'; // import Bot class

const app = express();
const bot = new Bot(myPageAccessToken, myVerification); // create bot instance

app.use('/facebook', bot.router()); // use the router
app.listen(3000);
```

### Receive Messages
```es6
import {Elements} from 'facebook-messenger-bot';

bot.on('message', async message => {
    const {sender} = message;

    // get sender id
    console.log(`Received a message from ${sender.id}`);

    // fetch additional user properties
    await sender.fetch(`first_name,last_name,profile_pic`, true); // true: use cache

    console.log(`Fetched ${sender.first_name}, ${sender.last_name}, ${sender.profile_pic}`);

    const {text, images, videos, location, audio} = message;

    if (text) {
        console.log(text);      // 'hey'
    }

    if (images) {
        console.log(images);    // ['http://...', 'http://...']
    }

    if (videos) {
        console.log(videos);    // ['http://...', 'http://...']
    }

    if (location) {
        console.log(location);  // {title, long, lat, url}
    }

    if (audio) {
        console.log(audio);     // url
    }

    console.log(message);       // log the message to learn about all the attributes
});
```

### Send Responses
```es6
import {Bot, Elements} from 'facebook-messenger-bot'; // import Bot class

bot.on('message', async message => {
    const {sender} = message;

    let out, buttons;

    // ---- send text
    out = new Elements();
    out.add({text: 'hey! what up'});
    await bot.send(sender.id, out);

    // wait for 1s
    await Bot.wait(1000);

    // ---- send image
    const out = new Elements();
    out.add({image: 'https://developers.facebook.com/images/devsite/fb4d_logo-2x.png'});
    await bot.send(sender.id, out);

    await Bot.wait(1000);

    // ---- send buttons (single card)
    buttons = new Buttons();
    buttons.add({text: 'Google', url: 'http://google.com'});
    buttons.add({text: 'Yahoo', url: 'http://yahoo.com'});
    buttons.add({text: 'Bing', url: 'http://bing.com'});
    out = new Elements();
    out.add({text: 'search engines', subtext: 'click to get redirected', buttons}); // add a card
    await bot.send(to, out);
    
    // ---- send share/call buttons
    buttons = new Buttons();
    buttons.add({text: 'Call us', phone: '+808 863718243'});
    buttons.add({share: true});
    out = new Elements();
    out.add({text: 'ABC Flower shop', subtext: 'Office hours 10am - 6pm', buttons}); // add a card
    await bot.send(to, out);

    await Bot.wait(2000);

  	// ---- send list
  	out = new Elements();
    out.setListStyle('compact'); // or 'large'
  	out.add({text: 'Item 1', subtext: 'Subtitle'}); // add list item
  	out.add({text: 'Item 2', subtext: 'Subtitle'}); // add list item
  	await bot.send(sender.id, out);

    // ---- send image + buttons (multiple cards)
    buttons = new Buttons();
    buttons.add({text: 'Google', url: 'http://google.com'});
    buttons.add({text: 'Yahoo', url: 'http://yahoo.com'});
    out = new Elements();
    out.add({image: 'http://google.com/logo.png', text: 'hey', buttons}); // first card
    out.add({image: 'http://yahoo.com/logo.png', text: 'hey', buttons}); // second card
    await bot.send(to, out);

    // ---- send call button
    buttons = new Buttons();
    buttons.add({text: 'Call us now', phone: '+16505551234'});
    out = new Elements();
    out.add({text: 'Contact us', subtext: 'click to start a phone call', buttons});
    await bot.send(to, out);

    // ---- send quick reply for location
    let replies = new QuickReplies();
    replies.add({text: 'location', isLocation: true});
    out = new Elements();
    out.add({text: 'Send us your location'});
    out.setQuickReplies(replies);
    await bot.send(to, out);
});
```
### Handle Postbacks
```es6
bot.on('message', async message => {
    const {sender} = message;

    let out, buttons;

    // ---- send buttons
    buttons = new Buttons();
    buttons.add({text: 'Google', data: 'google', event: 'search-engine'});
    buttons.add({text: 'Bing', data: 'bing', event: 'search-engine'});
    buttons.add({text: 'Yahoo', data: 'yahoo', event: 'search-engine'});
    out = new Elements();
    out.add({image: 'http://someimage.com', text: 'hey', buttons});
    await bot.send(to, out);
    await Bot.wait(2000);
});

bot.on('search-engine', async (data, message) => {
    console.log(data); // google, bing, or yahoo
});

// all postbacks are emitted via 'postback'
bot.on('postback', async (event, message, data) => {
    assert(data === message.data);
    assert(event === message.event);

    console.log(event, message, data);
});

// if the data cannot be parsed, an 'invalid-postback' is emitted
bot.on('invalid-postback', async (message) => {
    console.log(message);
});
```

### Delivery and Optin
```es6
bot.on('optin', async (message, param) => {
    assert(param === message.param);
    assert(param === message.optin);

    console.log(message, param);
});

bot.on('delivery', async (message, mids) => {
    assert(mids === message.delivered);

    console.log(message, mids);
});
```

### Set/Delete Greeting and Set Get Started
```es6
(async function () {
  console.log(await bot.setGreeting('Hi my name is Freedaa, I can help find free food around and share the free food you find!'));
  console.log(await bot.setGetStarted({data: {action: 'GET_STARTED'}}));

  // console.log(await bot.setGetStarted(null)); // DELETE greeting
})();
```

### Set/Delete persistent menu
```es6
// use postback buttons for the menu, other buttons are not supported by facebook
menuButtons = new menuButtons();

menuButtons.add({text: 'Google', data: 'google', event: 'search-engine'});
menuButtons.add({text: 'Bing', data: 'bing', event: 'search-engine'});
menuButtons.add({text: 'Yahoo', data: 'yahoo', event: 'search-engine'});

console.log(await bot.setPersistentMenu(menuButtons));

// console.log(await bot.setPersistentMenu(null)); // DELETE Persisten menu


```

### Pipe Messages into Bot (i.e. I don't use Express!)
```es6
bot.handleMessage(req.body);
```

### Debugging
```es6
buttons = new Buttons();
out = new Elements();

...

// you can compare these output with the ones provided on the Facebook website
console.log(buttons.toJSON());
console.log(out.toJSON());

// access raw parsed object via 'message' event
bot.on('message', message => {
    console.log(message.raw);
});
```

### Extras: Fetch User
```es6
const user = await bot.fetchUser(id, 'first_name,last_name', true);   // true for cache
```

## Next Release (very soon)
- Create receipt messages

## Maintainers
Looking for additional maintainers this repo. Let me know if you are interested.
