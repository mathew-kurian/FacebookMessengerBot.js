'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Buttons = require('./Buttons');

var _Buttons2 = _interopRequireDefault(_Buttons);

var _QuickReplies = require('./QuickReplies');

var _QuickReplies2 = _interopRequireDefault(_QuickReplies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Elements = function () {
  function Elements() {
    (0, _classCallCheck3.default)(this, Elements);

    this._elements = [];
    this._quickreplies = null;
  }

  (0, _createClass3.default)(Elements, [{
    key: 'add',
    value: function add(_ref) {
      var text = _ref.text;
      var image = _ref.image;
      var subtext = _ref.subtext;
      var buttons = _ref.buttons;

      if (buttons) {
        if (!(buttons instanceof _Buttons2.default)) {
          if (Array.isArray(buttons)) {
            buttons = _Buttons2.default.from(buttons);
          } else {
            throw Error('Unable to parse buttons');
          }
        }
      }

      this._elements.push({ text: text, image: image, subtext: subtext, buttons: buttons });
      return this;
    }
  }, {
    key: 'setQuickReplies',
    value: function setQuickReplies(quickreplies) {
      if (quickreplies) {
        if (!(quickreplies instanceof _QuickReplies2.default)) {
          if (Array.isArray(quickreplies)) {
            quickreplies = _QuickReplies2.default.from(quickreplies);
          } else {
            throw Error('Unable to parse quickreplies');
          }
        }
      }

      this._quickreplies = quickreplies;
    }
  }, {
    key: 'getQuickReplies',
    value: function getQuickReplies() {
      return this._quickreplies;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var _this = this;

      var build = function build() {
        if (_this._elements.length > 1) {
          var elements = [];
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = (0, _getIterator3.default)(_this._elements), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var e = _step.value;

              var element = {};
              if (e.text) element.title = e.text;
              if (e.image) element.image_url = e.image;
              if (e.subtext) element.subtitle = e.subtext;
              if (e.buttons && e.buttons.length) element.buttons = e.buttons.toJSON();
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
        } else if (_this._elements.length === 1) {
          var _e = _this._elements[0];
          var _element = {};
          if (_e.text && _e.buttons && _e.buttons.length && _e.image) {
            _element.title = _e.text;
            _element.image_url = _e.image;
            if (_e.subtext) _element.subtitle = _e.subtext;
            _element.buttons = _e.buttons.toJSON();
            return { attachment: { type: 'template', payload: { template_type: 'generic', elements: [_element] } } };
          } else if (_e.text && _e.buttons && _e.buttons.length) {
            _element.text = _e.text;
            if (_e.image) _element.image_url = _e.image;
            _element.buttons = _e.buttons.toJSON();
            return { attachment: { type: 'template', payload: (0, _extends3.default)({ template_type: 'button' }, _element) } };
          } else if (_e.text) {
            return { text: _e.text };
          } else if (_e.image) {
            return { attachment: { type: 'image', payload: { url: _e.image } } };
          }
        }

        throw Error('Could not form a message. Have you followed the format?');
      };

      var built = build();

      if (this._quickreplies && this._quickreplies.length) {
        built.quick_replies = this._quickreplies.toJSON();
      }

      return built;
    }
  }, {
    key: 'length',
    get: function get() {
      return this._elements.length;
    }
  }]);
  return Elements;
}();

exports.default = Elements;
//# sourceMappingURL=Elements.js.map
