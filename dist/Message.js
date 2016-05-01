'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = function () {
  function Message() {
    _classCallCheck(this, Message);

    this._elements = [];
  }

  _createClass(Message, [{
    key: 'add',
    value: function add(_ref) {
      var text = _ref.text;
      var image = _ref.image;
      var subtext = _ref.subtext;
      var buttons = _ref.buttons;

      this._elements.push({ text: text, image: image, subtext: subtext, buttons: buttons });
      return this;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      if (this._elements.length > 1) {
        var elements = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this._elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var e = _step.value;

            var element = {};
            if (e.text) element.title = e.text;
            if (e.image) element.image_url = e.image;
            if (e.subtext) element.subtitle = e.subtext;
            if (e.buttons) element.buttons = e.buttons;
            elements.push(element);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return { attachment: { type: 'template', payload: { template_type: 'generic', elements: elements } } };
      } else if (this._elements.length === 1) {
        var _e = this._elements[0];
        var _element = {};
        if (_e.text && _e.buttons && _e.image) {
          _element.title = _e.text;
          _element.image_url = _e.image;
          if (_e.subtext) _element.subtitle = _e.subtext;
          _element.buttons = _e.buttons;
          return { attachment: { type: 'template', payload: { template_type: 'generic', elements: [_element] } } };
        } else if (_e.text && _e.buttons) {
          _element.text = _e.text;
          if (_e.image) _element.image_url = _e.image;
          _element.buttons = _e.buttons;
          return { attachment: { type: 'template', payload: _extends({ template_type: 'button' }, _element) } };
        } else if (_e.text) {
          return { text: _e.text };
        } else if (_e.image) {
          return { attachment: { type: 'image', payload: { url: _e.image } } };
        }
      }

      throw Error('Could not form a message. Have you followed the format?');
    }
  }]);

  return Message;
}();

exports.default = Message;
//# sourceMappingURL=Message.js.map
