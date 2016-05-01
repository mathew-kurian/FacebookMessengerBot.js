'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = fetch;

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _traceError = require('trace-error');

var _traceError2 = _interopRequireDefault(_traceError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetch(url) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  return new Promise(function (resolve, reject) {
    if (_typeof(opts.body) === 'object' || opts.json) {
      opts.headers = Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {});
    }

    var method = opts.method || 'get';
    var req = _superagent2.default[method.toLowerCase()](url);

    req = req.query(opts.query);

    if (opts.method === 'get') {
      req = req.query(opts.body);
    } else if (method === 'post') {
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
        for (var _iterator = Object.entries(opts.headers)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2);

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
        resolve(res);
      }
    });
  });
}
//# sourceMappingURL=fetch.js.map
