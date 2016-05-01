import EventEmitter from 'events';
import {Router} from 'express';
import Message from './Message.es6';
import ButtonSet from './ButtonSet.es6';
import fetch from './libs/fetch.es6';
import _ from 'lodash';

export {Message, ButtonSet};

export async function wait(time) {
  return new Promise(resolve => setTimeout(() => resolve(), time));
}

class FacebookMessengerBot extends EventEmitter {
  static ButtonSet = ButtonSet;
  static Message = Message;

  static REQUEST_BODY = 'request-body';

  static wait = wait;

  constructor(token, verification) {
    super();

    this._token = token;
    this._verification = verification;

    this.on(FacebookMessengerBot.REQUEST_BODY, this._onReceiveMessage);
  }

  async send(to, message) {
    try {
      await fetch('https://graph.facebook.com/v2.6/me/messages', {
        method: 'post',
        query: {access_token: this._token},
        body: {recipient: {id: to}, message}
      });
    } catch (e) {
      if (e.text) {
        let text = e.text;
        try {
          const err = JSON.parse(e.text).error;
          text = `${err.type || 'Unknown'}: ${err.message || 'No message'}`;
        } catch (ee) {
          // ignore
        }

        throw Error(text);
      } else {
        throw e;
      }
    }
  }

  async _onReceiveMessage(body) {
    const message = body.entry[0].messaging[0];
    Object.assign(message, message.message);
    delete message.message;

    message.raw = JSON.parse(JSON.stringify(body));

    message.sender.fetch = async () => {
      const {text} = await fetch(`https://graph.facebook.com/v2.6/${message.sender.id}`, {
        query: {access_token: this._token, fields: 'first_name,last_name,profile_pic'}
      });

      Object.assign(message.sender, JSON.parse(text));

      return message.sender;
    };

    if (message.postback) {
      let postback = {};

      try {
        postback = JSON.parse(message.postback.payload);
      } catch (e) {
        // ignore
      }

      if (postback.hasOwnProperty('data')) {
        message.postback = postback;
        message.data = postback.data;
        message.event = postback.event;

        this.emit('postback', message.event, message.data, message);

        if (postback.hasOwnProperty('event')) {
          this.emit(message.event, message.data, message);
        }
      } else {
        this.emit('invalid-postback', message.postback, message);
      }

      return;
    }

    const attachments = _.groupBy(message.attachments, 'type');

    if (attachments.image) {
      message.images = attachments.image.map(a => a.payload.url);
    }

    if (attachments.video) {
      message.videos = attachments.video.map(a => a.payload.url);
    }

    if (attachments.audio) {
      message.audio = attachments.audio.map(a => a.payload.url)[0];
    }

    if (attachments.location) {
      const location = attachments.location[0];
      message.location = {...location, ...location.payload.coordinates};
      delete message.location.payload;
    }

    message.object = body.object;

    delete message.attachments;

    this.emit('message', message);
  }

  router() {
    const router = new Router();

    router.get('/', (req, res) => {
      if (req.query['hub.verify_token'] === this._verification) {
        res.send(req.query['hub.challenge']);
      } else {
        res.send('Error, wrong validation token');
      }
    });

    router.post('/', (req, res) => {
      this.emit(FacebookMessengerBot.REQUEST_BODY, req.body);
      res.send().status(200);
    });

    return router;
  }
}

export default FacebookMessengerBot;
