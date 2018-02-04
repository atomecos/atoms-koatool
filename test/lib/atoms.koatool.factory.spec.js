'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const Koa = require('koa');
const AtomsKoaToolFactory = require('../../dst/lib/atoms.koatool.factory').AtomsKoaToolFactory;

describe('atoms.koatool.factory.js tests', () => {
  describe('#AtomsKoaToolFactory()', () => {
    it('expect to create an instance of Koa', () => {
      // arranges

      // acts
      const result = AtomsKoaToolFactory();

      // asserts
      expect(result).not.to.be.undefined;
      expect(result instanceof Koa).to.be.true;
    });
  });
});