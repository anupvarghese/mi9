import request from 'superagent';
import assert from 'assert';
import { describe, it } from 'mocha';
import '../index.js';

const req1 = require('./test_sample/sampleReq1.json');
const resp1 = require('./test_sample/sampleResp1.json');
const req2 = require('./test_sample/sampleReq2.json');
const req3 = require('./test_sample/sampleReq3.json');
const errorResp = require('./test_sample/errorResp.json');

describe('server', () => {
  it('should return 200', done => {
    request.get('localhost:3000').end((err, res) => {
      assert.equal(200, res.status);
      assert.equal(JSON.stringify({ hello: 'App is now running, please post the data' }), res.text);
      done();
    });
  });
});

describe('Example submit valid data', () => {
  it('should post data', done => {
    request.post('localhost:3000')
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(req1))
    .end((err, res) => {
      assert.equal(200, res.status);
      assert.equal(JSON.stringify(resp1), res.text);
      done();
    });
  });
});

describe('Example submit invalid data', () => {
  it('should not post data', done => {
    request.post('localhost:3000')
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(req2))
    .end((err, res) => {
      assert.equal(400, res.status);
      assert.equal(JSON.stringify(errorResp), res.text);
      done();
    });
  });
});

describe('Example submit invalid data 2', () => {
  it('should not post data', done => {
    request.post('localhost:3000')
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(req3))
    .end((err, res) => {
      assert.equal(400, res.status);
      assert.equal(JSON.stringify(errorResp), res.text);
      done();
    });
  });
});
