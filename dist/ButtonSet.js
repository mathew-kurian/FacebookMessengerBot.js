'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ButtonSet = function () {
  function ButtonSet() {
    _classCallCheck(this, ButtonSet);

    this._buttons = [];
  }

  _createClass(ButtonSet, [{
    key: 'add',
    value: function add(_ref) {
      var text = _ref.text;
      var data = _ref.data;
      var url = _ref.url;
      var event = _ref.event;

      if (!data && !url) {
        throw Error('Must provide a url or data i.e. {data: null} or {url: \'https://facebook.com\'}');
      }

      this._buttons.push({ text: text || 'Button', event: event, data: data, url: url });
      return this;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var buttons = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._buttons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var button = _step.value;

          if (button.url) {
            buttons.push({ type: 'web_url', url: button.url, title: button.text });
          } else if (button.data) {
            var payload = JSON.stringify({ data: button.data, event: button.event });
            buttons.push({ type: 'postback', payload: payload, title: button.text });
          }
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

      return buttons;
    }
  }]);

  return ButtonSet;
}();

exports.default = ButtonSet;
//# sourceMappingURL=ButtonSet.js.map
