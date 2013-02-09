'use strict';

var parse = require('../')
  , address = parse.address;

/**
 * Assertations.
 */
var chai = require('chai')
  , expect = chai.expect;

chai.Assertion.includeStack = true;

describe('connection-parse()', function () {
  it('accepts multiple arguments', function () {
    var res = parse('1.1.1.1:1111', '11.11.11:1111');

    expect(res).to.be.a('object');
    expect(res.servers).to.be.a('array');
    expect(res.regular).to.be.a('array');

    Object.keys(res.weights).forEach(function (server) {
      expect(res.weights[server]).to.equal(1);
    });

    res.servers.forEach(function (server) {
      expect(server.host).to.be.a('string');
      expect(server.port).to.be.a('number');
      expect(server.string).to.be.a('string');
    });

    res.regular.forEach(function (server) {
      expect(server).to.be.a('string');
    });
  });

  it('accepts an array', function () {
    var res = parse(['1.1.1.1:1111', '11.11.11:1111']);

    expect(res).to.be.a('object');
    expect(res.servers).to.be.a('array');
    expect(res.regular).to.be.a('array');

    Object.keys(res.weights).forEach(function (server) {
      expect(res.weights[server]).to.equal(1);
    });

    res.servers.forEach(function (server) {
      expect(server.host).to.be.a('string');
      expect(server.port).to.be.a('number');
      expect(server.string).to.be.a('string');
    });

    res.regular.forEach(function (server) {
      expect(server).to.be.a('string');
    });
  });

  it('accepts an object', function () {
    var res = parse({ '1.1.1.1:1111': 100 });

    expect(res).to.be.a('object');
    expect(res.servers).to.be.a('array');
    expect(res.regular).to.be.a('array');
    expect(res.weights).to.be.a('object');

    Object.keys(res.weights).forEach(function (server) {
      expect(server).to.equal('1.1.1.1:1111');
      expect(res.weights[server]).to.equal(100);
    });

    res.servers.forEach(function (server) {
      expect(server.host).to.be.a('string');
      expect(server.port).to.be.a('number');
      expect(server.string).to.be.a('string');
    });

    res.regular.forEach(function (server) {
      expect(server).to.be.a('string');
    });
  });

  it('accepts an string', function () {
    var res = parse('1.1.1.1:1111');

    expect(res).to.be.a('object');
    expect(res.servers).to.be.a('array');
    expect(res.regular).to.be.a('array');

    Object.keys(res.weights).forEach(function (server) {
      expect(res.weights[server]).to.equal(1);
    });

    res.servers.forEach(function (server) {
      expect(server.port).to.equal(1111);
      expect(server.string).to.equal('1.1.1.1:1111');
      expect(server.host).to.equal('1.1.1.1');
    });

    res.regular.forEach(function (server) {
      expect(server).to.equal('1.1.1.1:1111');
    });
  });
});
