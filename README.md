# Facebook Messenger Bot
The purpose of this library is to offer a simple, light-weight Facebook Messenger Bot API for Node with ES6 support. 
Internally, it uses *Promises* to ensure compatibility with `async/await`. 

## API By Example
**Objective:** Given a set of inputs, the library automatically selects the optimal message format to display this data.

### 1. Attach Express Router for Verification and Receiving Messages
```es6
import express from 'express';
import {Bot} from 'facebook-messenger-bot'; // import Bot class

const app = express();
const bot = new Bot(myPageAccessToken, myVerification); // create bot instance

app.use('/facebook', bot.router()); // use the router
app.listen(3000);
```

### 2. Receive a Message
```es6
bot.on('message', async message => {
    const {sender} = message;
    
    // get sender id
    console.log(`Received a message from ${sender.id}`);
    
    // fetch additional user properties
    await sender.fetch(`first_name,last_name,profile_pic`);
    
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

### 3. Send a Responses
```
import {Message} from 'facebook-messenger-bot'; // import Bot class

bot.on('message', async message => {
    const {sender} = message;
    
    let out, buttons;
    
    // ---- send text
    out = new Message();
    out.add({text: 'hey! what up'});
    await bot.send(sender.id, out);
    
    // wait for 1s
    await bot.wait(1000);
    
    // ---- send image
    const out = new Message();
    out.add({image: 'https://developers.facebook.com/images/devsite/fb4d_logo-2x.png'});
    await bot.send(sender.id, out);
    
    await bot.wait(1000);
    
    // ---- send buttons (single card)
    buttons = new ButtonSet();
    buttons.add({text: 'Google', url: 'http://google.com'});
    buttons.add({text: 'Yahoo', url: 'http://yahoo.com'});
    buttons.add({text: 'Bing', url: 'http://bing.com'});
    out = new Message();
    out.add({text: 'search engines', subtext: 'click to get redirected', buttons}); // add a card
    await bot.send(to, out);
    
    await sleep(2000);
    
    // ---- send image + buttons (multiple cards)
    buttons = new ButtonSet();
    buttons.add({text: 'Google', url: 'http://google.com'});
    buttons.add({text: 'Yahoo', url: 'http://yahoo.com'});
    out = new Message();
    out.add({image: 'http://google.com/logo.png', text: 'hey', buttons}); // first card
    out.add({image: 'http://yahoo.com/logo.png', text: 'hey', buttons}); // second card
    await bot.send(to, out);
});
```
### 3. Handle Postbacks
```
bot.on('message', async message => {
    const {sender} = message;
        
    let out, buttons;
        
    // ---- send buttons 
    buttons = new Buttons();
    buttons.add({text: 'Google', data: 'google', event: 'search-engine'});
    buttons.add({text: 'Bing', data: 'bing', event: 'search-engine'});
    buttons.add({text: 'Yahoo', data: 'yahoo', event: 'search-engine'});
    out = new FacebookMessengerBot.Message();
    out.add({image: 'http://someimage.com', text: 'hey', buttons});
    await bot.send(to, out);
    await sleep(2000);
});

bot.on('search-engine', async (data, message) => {
    console.log(data); // google, bing, or yahoo
});

// all postbacks are emitted via 'postback'
bot.on('postback', async (event, data, message) => {
    console.log(event, data, message);
});

// if the data cannot be parsed, an 'invalid-postback' is emitted
bot.on('invalid-postback', async (message) => {
    console.log(message);
});
```

### 4. Pipe Messages into Bot (i.e. I don't use Express!)
```
bot.emit(Bot.REQUEST_BODY, req.body);
```

### Tests
Coming very soon on Travis CI