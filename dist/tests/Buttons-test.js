'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _ = require('../..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Buttons', function () {
  it('#toJSON', function () {
    var buttons = new _.Buttons();
    buttons.add({ text: 'Google', url: 'http://google.com' });
    buttons.add({ text: 'Yahoo', url: 'http://yahoo.com' });
    buttons.add({ text: 'Bing', url: 'http://bing.com' });

    _assert2.default.deepEqual([{ type: 'web_url', url: 'http://google.com', title: 'Google' }, { type: 'web_url', url: 'http://yahoo.com', title: 'Yahoo' }, { type: 'web_url', url: 'http://bing.com', title: 'Bing' }], buttons.toJSON());
  });

  it('should throw an error', function () {
    try {
      var buttons = new _.Buttons();
      buttons.add({});
      _assert2.default.fail('should have thrown an error');
    } catch (e) {
      _assert2.default.ok('does not have data/url attributes');
    }
  });

  it('should parse object', function () {
    try {
      _.Buttons.from([{ data: [], text: 'sup' }, { data: [], text: 'cat' }]);
      _assert2.default.ok('parsed correctly');
    } catch (e) {
      _assert2.default.fail('should have thrown an error');
    }
  });

  it('should throw an error', function () {
    try {
      var buttons = new _.Buttons();
      buttons.add({ event: 'simple-event' });
      _assert2.default.fail('should have thrown an error');
    } catch (e) {
      _assert2.default.ok('does not have data/url attributes');
    }
  });
});
//# sourceMappingURL=Buttons-test.js.map
