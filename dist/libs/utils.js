'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cut = cut;
function cut(str, max) {
  var trail = arguments.length <= 2 || arguments[2] === undefined ? '...' : arguments[2];

  if (str.length > max) {
    str = str.substring(0, max - trail.length) + trail;
  }

  return str;
}
//# sourceMappingURL=utils.js.map
