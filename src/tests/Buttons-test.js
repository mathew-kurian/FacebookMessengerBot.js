import assert from 'assert';
import {Buttons} from '../..';


describe('Buttons', () => {
  it('#toJSON', () => {
    const buttons = new Buttons();
    buttons.add({text: 'Google', url: 'http://google.com'});
    buttons.add({text: 'Yahoo', url: 'http://yahoo.com'});
    buttons.add({text: 'Bing', url: 'http://bing.com'});

    assert.deepEqual([
      {type: 'web_url', url: 'http://google.com', title: 'Google'},
      {type: 'web_url', url: 'http://yahoo.com', title: 'Yahoo'},
      {type: 'web_url', url: 'http://bing.com', title: 'Bing'}
    ], buttons.toJSON());
  });

  it('should throw an error', () => {
    try {
      const buttons = new Buttons();
      buttons.add({});
      assert.fail('should have thrown an error');
    } catch (e) {
      assert.ok('does not have data/url attributes');
    }
  });

  it('should parse object', () => {
    try {
      Buttons.from([{data: [], text: 'sup'}, {data: [], text: 'cat'}]);
      assert.ok('parsed correctly');
    } catch (e) {
      assert.fail('should have thrown an error');
    }
  });


  it('should throw an error', () => {
    try {
      const buttons = new Buttons();
      buttons.add({event: 'simple-event'});
      assert.fail('should have thrown an error');
    } catch (e) {
      assert.ok('does not have data/url attributes');
    }
  });
});
