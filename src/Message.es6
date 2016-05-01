class Message {
  constructor() {
    this._elements = [];
  }

  add({text, image, subtext, buttons}) {
    this._elements.push({text, image, subtext, buttons});
    return this;
  }

  toJSON() {
    if (this._elements.length > 1) {
      const elements = [];
      for (const e of this._elements) {
        const element = {};
        if (e.text) element.title = e.text;
        if (e.image) element.image_url = e.image;
        if (e.subtext) element.subtitle = e.subtext;
        if (e.buttons) element.buttons = e.buttons;
        elements.push(element);
      }
      return {attachment: {type: 'template', payload: {template_type: 'generic', elements}}};
    } else if (this._elements.length === 1) {
      const e = this._elements[0];
      const element = {};
      if (e.text && e.buttons && e.image) {
        element.title = e.text;
        element.image_url = e.image;
        if (e.subtext) element.subtitle = e.subtext;
        element.buttons = e.buttons;
        return {attachment: {type: 'template', payload: {template_type: 'generic', elements: [element]}}};
      } else if (e.text && e.buttons) {
        element.text = e.text;
        if (e.image) element.image_url = e.image;
        element.buttons = e.buttons;
        return {attachment: {type: 'template', payload: {template_type: 'button', ...element}}};
      } else if (e.text) {
        return {text: e.text};
      } else if (e.image) {
        return {attachment: {type: 'image', payload: {url: e.image}}};
      }
    }

    throw Error('Could not form a message. Have you followed the format?');
  }
}

export default Message;
