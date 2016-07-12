import request from 'superagent';

export default function fetch(url, opts = {}) {
  return new Promise((resolve, reject) => {
    if (typeof opts.body === 'object' || opts.json) {
      opts.headers = Object.assign({'Content-Type': 'application/json'}, opts.headers || {});
    }

    const method = opts.method || 'get';
    let req = request[method.toLowerCase()](url);

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
      for (const [k, v] of Object.entries(opts.headers)) {
        req = req.set(k, v);
      }
    }

    req.end((err, res) => {
      if (err) {
        try {
          if (err.response && err.response.error) {
            err = err.response.error;
          } else if (res.error) {
            err = res.error;
          }

          const {status, method: _method, path, text} = err;

          Object.defineProperty(err, 'res', {value: res, enumerable: false, configurable: false});
          Object.defineProperty(err, 'status', {value: status, enumerable: false, configurable: false});
          Object.defineProperty(err, 'method', {value: _method, enumerable: false, configurable: false});
          Object.defineProperty(err, 'path', {value: path, enumerable: false, configurable: false});
          Object.defineProperty(err, 'text', {value: text, enumerable: false, configurable: false});
        } catch (e) {
          try {
            Object.defineProperty(err, 'res', {value: res, enumerable: false, configurable: false});
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
