'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bot = exports.wait = exports.Buttons = exports.Elements = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _bluebird = require('bluebird');

var wait = exports.wait = function () {
  var ref = (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee(time) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new _promise2.default(function (resolve) {
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

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _Elements = require('./Elements.js');

var _Elements2 = _interopRequireDefault(_Elements);

var _Buttons = require('./Buttons.js');

var _Buttons2 = _interopRequireDefault(_Buttons);

var _fetch = require('./libs/fetch.js');

var _fetch2 = _interopRequireDefault(_fetch);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Elements = _Elements2.default;
exports.Buttons = _Buttons2.default;


var userCache = {};

var Bot = function (_EventEmitter) {
  (0, _inherits3.default)(Bot, _EventEmitter);

  function Bot(token, verification) {
    var debug = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
    (0, _classCallCheck3.default)(this, Bot);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Bot).call(this));

    _this._token = token;
    _this._debug = debug;
    _this._verification = verification;
    return _this;
  }

  (0, _createClass3.default)(Bot, [{
    key: 'send',
    value: function () {
      var ref = (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee2(to, message) {
        var text, err;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this._debug) {
                  console.log({ recipient: { id: to }, message: message ? message.toJSON() : message });
                }

                _context2.prev = 1;
                _context2.next = 4;
                return (0, _fetch2.default)('https://graph.facebook.com/v2.6/me/messages', {
                  method: 'post',
                  query: { access_token: this._token },
                  body: { recipient: { id: to }, message: message }
                });

              case 4:
                _context2.next = 15;
                break;

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2['catch'](1);

                if (!_context2.t0.text) {
                  _context2.next = 14;
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

              case 14:
                throw _context2.t0;

              case 15:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 6]]);
      }));

      function send(_x3, _x4) {
        return ref.apply(this, arguments);
      }

      return send;
    }()
  }, {
    key: 'fetchUser',
    value: function () {
      var ref = (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee3(id) {
        var fields = arguments.length <= 1 || arguments[1] === undefined ? 'first_name,last_name,profile_pic' : arguments[1];
        var cache = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

        var key, props, _ref, body;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                key = id + fields;
                props = void 0;

                if (!(cache && userCache[key])) {
                  _context3.next = 7;
                  break;
                }

                props = userCache[key];
                props.fromCache = true;
                _context3.next = 14;
                break;

              case 7:
                _context3.next = 9;
                return (0, _fetch2.default)('https://graph.facebook.com/v2.6/' + id, {
                  query: { access_token: this._token, fields: fields }, json: true
                });

              case 9:
                _ref = _context3.sent;
                body = _ref.body;


                props = body;
                props.fromCache = false;

                if (cache) {
                  userCache[key] = props;
                }

              case 14:
                return _context3.abrupt('return', props);

              case 15:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function fetchUser(_x5, _x6, _x7) {
        return ref.apply(this, arguments);
      }

      return fetchUser;
    }()
  }, {
    key: 'handleMessage',
    value: function () {
      var ref = (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee5(input) {
        var _this2 = this;

        var body, message, postback, attachments, location;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                body = JSON.parse((0, _stringify2.default)(input));
                message = body.entry[0].messaging[0];

                (0, _assign2.default)(message, message.message);
                delete message.message;

                message.raw = input;

                message.sender.fetch = function () {
                  var ref = (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee4(fields, cache) {
                    var props;
                    return _regenerator2.default.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            _context4.next = 2;
                            return _this2.fetchUser(message.sender.id, fields, cache);

                          case 2:
                            props = _context4.sent;

                            (0, _assign2.default)(message.sender, props);
                            return _context4.abrupt('return', message.sender);

                          case 5:
                          case 'end':
                            return _context4.stop();
                        }
                      }
                    }, _callee4, _this2);
                  }));
                  return function (_x11, _x12) {
                    return ref.apply(this, arguments);
                  };
                }();

                if (!message.postback) {
                  _context5.next = 11;
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

                  this.emit('postback', message.event, message, message.data);

                  if (postback.hasOwnProperty('event')) {
                    this.emit(message.event, message, message.data);
                  }
                } else {
                  this.emit('invalid-postback', message, message.postback);
                }

                return _context5.abrupt('return');

              case 11:
                if (!message.delivery) {
                  _context5.next = 17;
                  break;
                }

                (0, _assign2.default)(message, message.delivery);
                message.delivered = message.delivery.mids;

                delete message.delivery;

                this.emit('delivery', message, message.delivered);
                return _context5.abrupt('return');

              case 17:
                if (!message.optin) {
                  _context5.next = 22;
                  break;
                }

                message.param = message.optin.ref || true;
                message.optin = message.param;
                this.emit('optin', message, message.optin);
                return _context5.abrupt('return');

              case 22:
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

                  message.location = (0, _extends3.default)({}, location, location.payload.coordinates);
                  delete message.location.payload;
                }

                message.object = body.object;

                delete message.attachments;

                this.emit('message', message);

              case 30:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function handleMessage(_x10) {
        return ref.apply(this, arguments);
      }

      return handleMessage;
    }()
  }, {
    key: 'router',
    value: function router() {
      var _this3 = this;

      var router = new _express.Router();

      router.use(_bodyParser2.default.json());

      router.get('/', function (req, res) {
        if (req.query['hub.verify_token'] === _this3._verification) {
          res.send(req.query['hub.challenge']);
        } else {
          res.send('Error, wrong validation token');
        }
      });

      router.post('/', function (req, res) {
        _this3.handleMessage(req.body);
        res.send().status(200);
      });

      return router;
    }
  }]);
  return Bot;
}(_events2.default);

Bot.Buttons = _Buttons2.default;
Bot.Elements = _Elements2.default;
Bot.wait = wait;
exports.Bot = Bot;
exports.default = Bot;
//# sourceMappingURL=Bot.js.map
