'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = require('./libs/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuickReplies = function () {
  function QuickReplies() {
    (0, _classCallCheck3.default)(this, QuickReplies);

    this._quickReplies = [];
  }

  (0, _createClass3.default)(QuickReplies, [{
    key: 'add',
    value: function add(_ref) {
      var text = _ref.text;
      var data = _ref.data;
      var event = _ref.event;

      if (!data && !event) {
        throw Error('Must provide a url or data i.e. {data: null} or {url: \'https://facebook.com\'}');
      }

      this._quickReplies.push({ text: text || 'QuickReply', event: event, data: data });
      return this;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var quickReplies = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(this._quickReplies), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var reply = _step.value;

          var payload = (0, _stringify2.default)({ data: reply.data, event: reply.event });
          if (!reply.text) {
            throw new Error('No text attribute');
          }

          quickReplies.push({ payload: payload, title: (0, _utils.cut)(String(reply.text), 20), content_type: 'text' });
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

      return quickReplies;
    }
  }, {
    key: 'length',
    get: function get() {
      return this._quickReplies.length;
    }
  }], [{
    key: 'from',
    value: function from(array) {
      var quickreplies = new QuickReplies();
      array.forEach(function (arg) {
        return quickreplies.add(arg);
      });
      return quickreplies;
    }
  }]);
  return QuickReplies;
}();

exports.default = QuickReplies;
//# sourceMappingURL=QuickReplies.js.map
