'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wait = exports.ButtonSet = exports.Message = undefined;

var _bluebird = require('bluebird');

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var wait = exports.wait = function () {
  var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee(time) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new Promise(function (resolve) {
              return setTimeout(function () {
                return resolve();
              }, time);
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return function wait(_x) {
    return ref.apply(this, arguments);
  };
}();

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _express = require('express');

var _Message = require('./Message.es6');

var _Message2 = _interopRequireDefault(_Message);

var _ButtonSet = require('./ButtonSet.es6');

var _ButtonSet2 = _interopRequireDefault(_ButtonSet);

var _fetch = require('./libs/fetch.es6');

var _fetch2 = _interopRequireDefault(_fetch);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.Message = _Message2.default;
exports.ButtonSet = _ButtonSet2.default;

var FacebookMessengerBot = function (_EventEmitter) {
  _inherits(FacebookMessengerBot, _EventEmitter);

  function FacebookMessengerBot(token, verification) {
    _classCallCheck(this, FacebookMessengerBot);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FacebookMessengerBot).call(this));

    _this._token = token;
    _this._verification = verification;

    _this.on(FacebookMessengerBot.REQUEST_BODY, _this._onReceiveMessage);
    return _this;
  }

  _createClass(FacebookMessengerBot, [{
    key: 'send',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee2(to, message) {
        var text, err;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return (0, _fetch2.default)('https://graph.facebook.com/v2.6/me/messages', {
                  method: 'post',
                  query: { access_token: this._token },
                  body: { recipient: { id: to }, message: message }
                });

              case 3:
                _context2.next = 14;
                break;

              case 5:
                _context2.prev = 5;
                _context2.t0 = _context2['catch'](0);

                if (!_context2.t0.text) {
                  _context2.next = 13;
                  break;
                }

                text = _context2.t0.text;

                try {
                  err = JSON.parse(_context2.t0.text).error;

                  text = (err.type || 'Unknown') + ': ' + (err.message || 'No message');
                } catch (ee) {
                  // ignore
                }

                throw Error(text);

              case 13:
                throw _context2.t0;

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 5]]);
      }));

      function send(_x2, _x3) {
        return ref.apply(this, arguments);
      }

      return send;
    }()
  }, {
    key: '_onReceiveMessage',
    value: function () {
      var ref = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee4(body) {
        var _this2 = this;

        var message, postback, attachments, location;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                message = body.entry[0].messaging[0];

                Object.assign(message, message.message);
                delete message.message;

                message.raw = JSON.parse(JSON.stringify(body));

                message.sender.fetch = (0, _bluebird.coroutine)(regeneratorRuntime.mark(function _callee3() {
                  var _ref, text;

                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.next = 2;
                          return (0, _fetch2.default)('https://graph.facebook.com/v2.6/' + message.sender.id, {
                            query: { access_token: _this2._token, fields: 'first_name,last_name,profile_pic' }
                          });

                        case 2:
                          _ref = _context3.sent;
                          text = _ref.text;


                          Object.assign(message.sender, JSON.parse(text));

                          return _context3.abrupt('return', message.sender);

                        case 6:
                        case 'end':
                          return _context3.stop();
                      }
                    }
                  }, _callee3, _this2);
                }));

                if (!message.postback) {
                  _context4.next = 10;
                  break;
                }

                postback = {};


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

                return _context4.abrupt('return');

              case 10:
                attachments = _lodash2.default.groupBy(message.attachments, 'type');


                if (attachments.image) {
                  message.images = attachments.image.map(function (a) {
                    return a.payload.url;
                  });
                }

                if (attachments.video) {
                  message.videos = attachments.video.map(function (a) {
                    return a.payload.url;
                  });
                }

                if (attachments.audio) {
                  message.audio = attachments.audio.map(function (a) {
                    return a.payload.url;
                  })[0];
                }

                if (attachments.location) {
                  location = attachments.location[0];

                  message.location = _extends({}, location, location.payload.coordinates);
                  delete message.location.payload;
                }

                message.object = body.object;

                delete message.attachments;

                this.emit('message', message);

              case 18:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _onReceiveMessage(_x4) {
        return ref.apply(this, arguments);
      }

      return _onReceiveMessage;
    }()
  }, {
    key: 'router',
    value: function router() {
      var _this3 = this;

      var router = new _express.Router();

      router.get('/', function (req, res) {
        if (req.query['hub.verify_token'] === _this3._verification) {
          res.send(req.query['hub.challenge']);
        } else {
          res.send('Error, wrong validation token');
        }
      });

      router.post('/', function (req, res) {
        _this3.emit(FacebookMessengerBot.REQUEST_BODY, req.body);
        res.send().status(200);
      });

      return router;
    }
  }]);

  return FacebookMessengerBot;
}(_events2.default);

FacebookMessengerBot.ButtonSet = _ButtonSet2.default;
FacebookMessengerBot.Message = _Message2.default;
FacebookMessengerBot.REQUEST_BODY = 'request-body';
FacebookMessengerBot.wait = wait;
exports.default = FacebookMessengerBot;
//# sourceMappingURL=Bot.js.map
