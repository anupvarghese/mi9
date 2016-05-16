import http from 'http';
import assert from 'assert';
import { describe, it } from 'mocha';
import '../index.js';

describe('Example node server', () => {
  it('should return 200', done => {
    http.get('http://localhost:3000', res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});
