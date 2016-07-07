'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _ = require('../..');

var _simpleMessage = require('../../fixtures/simple-message.json');

var _simpleMessage2 = _interopRequireDefault(_simpleMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Elements', function () {
  it('#toJSON', function () {
    var elements = new _.Elements();
    elements.add({ text: 'sup', buttons: [{ text: 'Google', url: 'http://google.com' }] });
    _assert2.default.deepEqual(_simpleMessage2.default, elements.toJSON());
  });
});
//# sourceMappingURL=Elements-test.js.map
