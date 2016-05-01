import assert from 'assert';
import {Bot} from '../..';
import text from '../../fixtures/text.json';
import image from '../../fixtures/image.json';

const token = process.env.PAGE_ACCESS_TOKEN;

describe('Bot', () => {
  const bot = new Bot(token);

  if (token) {
    it('should fetch user profile', done => {
      bot.once('message', async message => {
        const {sender} = message;
        await sender.fetch('first_name,last_name', true);

        assert.equal(sender.first_name, 'Mathew');
        assert.equal(sender.last_name, 'Kurian');
        assert.equal(sender.fromCache, false);

        await sender.fetch('first_name,last_name', true);
        assert.equal(sender.fromCache, true);
        done();
      });

      bot.handleMessage(text);
    });
  }


  it('should extract text', done => {
    bot.once('message', async message => {
      assert.equal(message.text, text.entry[0].messaging[0].message.text);
      done();
    });

    bot.handleMessage(text);
  });


  it('should extract images', done => {
    bot.once('message', async message => {
      assert.equal(message.images[0], image.entry[0].messaging[0].message.attachments[0].payload.url);
      done();
    });

    bot.handleMessage(image);
  });
});
