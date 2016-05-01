class ButtonSet {
  constructor() {
    this._buttons = [];
  }

  add({text, data, url, event}) {
    if (!data && !url) {
      throw Error('Must provide a url or data i.e. {data: null} or {url: \'https://facebook.com\'}');
    }

    this._buttons.push({text: text || 'Button', event, data, url});
    return this;
  }

  toJSON() {
    const buttons = [];
    for (const button of this._buttons) {
      if (button.url) {
        buttons.push({type: 'web_url', url: button.url, title: button.text});
      } else if (button.data) {
        const payload = JSON.stringify({data: button.data, event: button.event});
        buttons.push({type: 'postback', payload, title: button.text});
      }
    }

    return buttons;
  }
}

export default ButtonSet;
