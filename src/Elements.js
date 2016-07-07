import Buttons from './Buttons';
import QuickReplies from './QuickReplies';

class Elements {
  constructor() {
    this._elements = [];
    this._quickreplies = null;
  }

  add({text, image, subtext, buttons}) {
    if (buttons) {
      if (!(buttons instanceof Buttons)) {
        if (Array.isArray(buttons)) {
          buttons = Buttons.from(buttons);
        } else {
          throw Error('Unable to parse buttons');
        }
      }
    }

    this._elements.push({text, image, subtext, buttons});
    return this;
  }

  setQuickReplies(quickreplies) {
    if (quickreplies) {
      if (!(quickreplies instanceof QuickReplies)) {
        if (Array.isArray(quickreplies)) {
          quickreplies = QuickReplies.from(quickreplies);
        } else {
          throw Error('Unable to parse quickreplies');
        }
      }
    }

    this._quickreplies = quickreplies;
  }

  getQuickReplies() {
    return this._quickreplies;
  }

  get length() {
    return this._elements.length;
  }

  toJSON() {
    const build = () => {
      if (this._elements.length > 1) {
        const elements = [];
        for (const e of this._elements) {
          const element = {};
          if (e.text) element.title = e.text;
          if (e.image) element.image_url = e.image;
          if (e.subtext) element.subtitle = e.subtext;
          if (e.buttons && e.buttons.length) element.buttons = e.buttons.toJSON();
          elements.push(element);
        }
        return {attachment: {type: 'template', payload: {template_type: 'generic', elements}}};
      } else if (this._elements.length === 1) {
        const e = this._elements[0];
        const element = {};
        if (e.text && e.buttons && e.buttons.length && e.image) {
          element.title = e.text;
          element.image_url = e.image;
          if (e.subtext) element.subtitle = e.subtext;
          element.buttons = e.buttons.toJSON();
          return {attachment: {type: 'template', payload: {template_type: 'generic', elements: [element]}}};
        } else if (e.text && e.buttons && e.buttons.length) {
          element.text = e.text;
          if (e.image) element.image_url = e.image;
          element.buttons = e.buttons.toJSON();
          return {attachment: {type: 'template', payload: {template_type: 'button', ...element}}};
        } else if (e.text) {
          return {text: e.text};
        } else if (e.image) {
          return {attachment: {type: 'image', payload: {url: e.image}}};
        }
      }

      throw Error('Could not form a message. Have you followed the format?');
    };

    const built = build();

    if (this._quickreplies && this._quickreplies.length) {
      built.quick_replies = this._quickreplies.toJSON();
    }

    return built;
  }
}

export default Elements;
