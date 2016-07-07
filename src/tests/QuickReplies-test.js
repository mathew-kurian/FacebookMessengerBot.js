import assert from 'assert';
import {QuickReplies} from '../..';


describe('QuickReplies', () => {
  it('#toJSON', () => {
    const quickReplies = new QuickReplies();
    quickReplies.add({text: 'Google', data: 'http://google.com'});
    quickReplies.add({text: 'Yahoo', data: 'http://yahoo.com'});
    quickReplies.add({text: 'Bing', data: 'http://bing.com'});

    assert.deepEqual([{
      payload: '{"data":"http://google.com"}',
      title: 'Google',
      content_type: 'text'
    }, {
      payload: '{"data":"http://yahoo.com"}',
      title: 'Yahoo',
      content_type: 'text'
    }, {
      payload: '{"data":"http://bing.com"}',
      title: 'Bing',
      content_type: 'text'
    }], quickReplies.toJSON());
  });

  it('should throw an error', () => {
    try {
      const quickReplies = new QuickReplies();
      quickReplies.add({});
      assert.fail('should have thrown an error');
    } catch (e) {
      assert.ok('does not have data/url attributes');
    }
  });

  it('should throw an error', () => {
    try {
      const quickReplies = new QuickReplies();
      quickReplies.add({event: 'simple-event'});
      assert.fail('should have thrown an error');
    } catch (e) {
      assert.ok('does not have data/url attributes');
    }
  });
});
