'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _ = require('../..');

var _text = require('../../fixtures/text.json');

var _text2 = _interopRequireDefault(_text);

var _image = require('../../fixtures/image.json');

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var token = process.env.PAGE_ACCESS_TOKEN;

describe('Bot', function () {
  var bot = new _.Bot(token);

  if (token) {
    it('should fetch user profile', function (done) {
      bot.once('message', function () {
        var _ref = (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee(message) {
          var sender;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  sender = message.sender;
                  _context.next = 3;
                  return sender.fetch('first_name,last_name', true);

                case 3:

                  _assert2.default.equal(sender.first_name, 'Mathew');
                  _assert2.default.equal(sender.last_name, 'Kurian');
                  _assert2.default.equal(sender.fromCache, false);

                  _context.next = 8;
                  return sender.fetch('first_name,last_name', true);

                case 8:
                  _assert2.default.equal(sender.fromCache, true);
                  done();

                case 10:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, undefined);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());

      bot.handleMessage(_text2.default);
    });
  }

  it('should extract text', function (done) {
    bot.once('message', function () {
      var _ref2 = (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee2(message) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _assert2.default.equal(message.text, _text2.default.entry[0].messaging[0].message.text);
                done();

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());

    bot.handleMessage(_text2.default);
  });

  it('should extract images', function (done) {
    bot.once('message', function () {
      var _ref3 = (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee3(message) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _assert2.default.equal(message.images[0], _image2.default.entry[0].messaging[0].message.attachments[0].payload.url);
                done();

              case 2:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, undefined);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }());

    bot.handleMessage(_image2.default);
  });
});
//# sourceMappingURL=Bot-test.js.map
