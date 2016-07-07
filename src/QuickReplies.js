import {cut} from './libs/utils';

class QuickReplies {
  constructor() {
    this._quickReplies = [];
  }

  add({text, data, event}) {
    if (!data && !event) {
      throw Error('Must provide a url or data i.e. {data: null} or {url: \'https://facebook.com\'}');
    }

    this._quickReplies.push({text: text || 'QuickReply', event, data});
    return this;
  }

  toJSON() {
    const quickReplies = [];
    for (const reply of this._quickReplies) {
      const payload = JSON.stringify({data: reply.data, event: reply.event});
      if (!reply.text) {
        throw new Error('No text attribute');
      }

      quickReplies.push({payload, title: cut(String(reply.text), 20), content_type: 'text'});
    }

    return quickReplies;
  }

  static from(array) {
    const quickreplies = new QuickReplies();
    array.forEach(arg => quickreplies.add(arg));
    return quickreplies;
  }

  get length() {
    return this._quickReplies.length;
  }
}

export default QuickReplies;
