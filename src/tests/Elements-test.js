import assert from 'assert';
import {Elements} from '../..';
import simpleMessage from '../../fixtures/simple-message.json';

describe('Elements', () => {
  it('#toJSON', () => {
    const elements = new Elements();
    elements.add({text: 'sup', buttons: [{text: 'Google', url: 'http://google.com'}]});
    assert.deepEqual(simpleMessage, elements.toJSON());
  });
});
