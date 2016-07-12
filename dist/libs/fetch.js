'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = fetch;

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetch(url) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  return new _promise2.default(function (resolve, reject) {
    if ((0, _typeof3.default)(opts.body) === 'object' || opts.json) {
      opts.headers = (0, _assign2.default)({ 'Content-Type': 'application/json' }, opts.headers || {});
    }

    var method = opts.method || 'get';
    var req = _superagent2.default[method.toLowerCase()](url);

    req = req.query(opts.query);

    if (opts.method === 'get') {
      req = req.query(opts.body);
    } else {
      req = req.send(opts.body);
    }

    if (opts.credentials) {
      req = req.withCredentials();
    }

    if (opts.headers) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)((0, _entries2.default)(opts.headers)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = (0, _slicedToArray3.default)(_step.value, 2);

          var k = _step$value[0];
          var v = _step$value[1];

          req = req.set(k, v);
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
    }

    req.end(function (err, res) {
      if (err) {
        try {
          if (err.response && err.response.error) {
            err = err.response.error;
          } else if (res.error) {
            err = res.error;
          }

          var _err = err;
          var status = _err.status;
          var _method = _err.method;
          var path = _err.path;
          var text = _err.text;


          Object.defineProperty(err, 'res', { value: res, enumerable: false, configurable: false });
          Object.defineProperty(err, 'status', { value: status, enumerable: false, configurable: false });
          Object.defineProperty(err, 'method', { value: _method, enumerable: false, configurable: false });
          Object.defineProperty(err, 'path', { value: path, enumerable: false, configurable: false });
          Object.defineProperty(err, 'text', { value: text, enumerable: false, configurable: false });
        } catch (e) {
          try {
            Object.defineProperty(err, 'res', { value: res, enumerable: false, configurable: false });
          } catch (ee) {
            // fallback for crappy browsers
            err.res = res;
          }
        }

        reject(err);
      } else {
        if ((opts.json || /\/json/g.test(res.headers['Content-Type'])) && res.text) {
          try {
            res.body = JSON.parse(res.text.trim());
          } catch (e) {
            // ignore
          }
        }

        resolve(res);
      }
    });
  });
}
//# sourceMappingURL=fetch.js.map
