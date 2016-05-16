import request from 'superagent';
import assert from 'assert';
import { describe, it } from 'mocha';
import '../index.js';

const req1 = require('./test_sample/sampleReq1.json');
const resp1 = require('./test_sample/sampleResp1.json');
const req2 = require('./test_sample/sampleReq2.json');
const req3 = require('./test_sample/sampleReq3.json');
const req4 = require('./test_sample/originalSample.json');
const resp4 = require('./test_sample/originalSampleResp.json');
const errorResp = require('./test_sample/errorResp.json');

describe('server', () => {
  it('should return 200', done => {
    request.get('localhost:3000').end((err, res) => {
      assert.equal(200, res.status);
      assert.equal('application/json', res.type);
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
      assert.equal('application/json', res.type);
      const resp = JSON.parse(res.text);
      assert.equal(JSON.stringify(resp1), JSON.stringify(resp.response));
      done();
    });
  });
});

describe('Example submit valid data provided', () => {
  it('should post data', done => {
    request.post('localhost:3000')
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(req4))
    .end((err, res) => {
      assert.equal(200, res.status);
      assert.equal('application/json', res.type);
      const resp = JSON.parse(res.text);
      assert.equal(JSON.stringify(resp4), JSON.stringify(resp.response));
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
      assert.equal('application/json', res.type);
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
      assert.equal('application/json', res.type);
      assert.equal(JSON.stringify(errorResp), res.text);
      done();
    });
  });
});

describe('Example submit empty request', () => {
  it('should not post data', done => {
    request.post('localhost:3000')
    .set('Content-Type', 'application/json')
    .send()
    .end((err, res) => {
      assert.equal(400, res.status);
      assert.equal('application/json', res.type);
      assert.equal(JSON.stringify(errorResp), res.text);
      done();
    });
  });
});

describe('Example access other route', () => {
  it('should not post data', done => {
    request.post('localhost:3000/someotherroute')
    .set('Content-Type', 'application/json')
    .send()
    .end((err, res) => {
      assert.equal(400, res.status);
      assert.equal('application/json', res.type);
      assert.equal(JSON.stringify(errorResp), res.text);
      done();
    });
  });
});
