'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const Koa = require('koa');
const Util = require('../../dst/lib/util').Util;
const AtomsKoaToolFactory = require('../../dst/lib/atoms.koa.tool.factory').AtomsKoaToolFactory;

describe('atoms.koatool.factory.js tests', () => {
  describe('#AtomsKoaToolFactory()', () => {
    let useSpy;

    before(() => {
      useSpy = sinon.spy(Koa.prototype, 'use');
    });

    after(() => {
      useSpy.restore();
    });

    it('expect to create an instance of Koa', () => {
      // arranges

      // acts
      const instance = AtomsKoaToolFactory();

      // asserts
      expect(instance).not.to.be.undefined;
      expect(instance instanceof Koa).to.be.true;
    });

    it('expect to call use() function in AtomsKoaToolFactory', () => {
      // arranges

      // acts
      AtomsKoaToolFactory();

      // asserts
      expect(useSpy.called).to.be.true;
    });
  });

  describe('#setProcessContext() and #getProcessContext()', () => {
    it('expect to set a process context', () => {
      // arranges
      const instance = AtomsKoaToolFactory();
      const context = {};

      // acts
      instance.setProcessContext(context);

      // asserts
      expect(instance.getProcessContext()).to.equal(context);
    });
  });

  describe('#compose()', () => {
    it('expect to compose a function', () => {
      // arranges
      const instance = AtomsKoaToolFactory();
      const composing = () => { };

      // acts
      const composed = instance.compose(composing);

      // asserts
      expect(typeof composed).to.equal('function');
    });

    it('expect to call a composed function with exactly specified arguments', () => {
      // arranges
      const instance = AtomsKoaToolFactory();
      const processContext = {};
      instance.setProcessContext(processContext);
      const composing = sinon.stub();
      const arg_a = { val: 'arg_a' };
      const arg_b = { val: 'arg_b' };
      const ctx = { val: 'context' };
      const next = () => { };

      // acts
      const composed = instance.compose(composing, arg_a, arg_b);
      composed(ctx, next);

      // asserts
      expect(composing.calledWithExactly(ctx, arg_a, arg_b)).to.be.false;
      expect(composing.calledWithExactly(ctx, arg_a, arg_b, next)).to.be.true;
    });

    it('expect to call a composed function with exactly specified arguments, in case of no process context', () => {
      // arranges
      const instance = AtomsKoaToolFactory();
      const composing = sinon.stub();
      const arg_a = { val: 'arg_a' };
      const arg_b = { val: 'arg_b' };
      const ctx = { val: 'context' };
      const next = () => { };

      // acts
      const composed = instance.compose(composing, arg_a, arg_b);
      composed(ctx, next);

      // asserts
      expect(composing.calledWithExactly(ctx, arg_a, arg_b)).to.be.false;
      expect(composing.calledWithExactly(ctx, arg_a, arg_b, next)).to.be.true;
    });
  });

  describe('#useCompose()', () => {
    const instance = AtomsKoaToolFactory();
    let composeSpy;
    let useSpy;

    before(() => {
      composeSpy = sinon.spy(instance, 'compose');
      useSpy = sinon.spy(instance, 'use');
    });

    after(() => {
      composeSpy.restore();
      useSpy.restore();
    });

    it('expect to use a composed function', () => {
      // arranges
      const composing = sinon.stub();
      const arg_a = { val: 'arg_a' };
      const arg_b = { val: 'arg_b' };

      // acts
      instance.useCompose(composing, arg_a, arg_b);

      // asserts
      expect(composeSpy.calledWithExactly(composing, arg_a, arg_b)).to.be.true;
      expect(useSpy.called).to.be.true;
    });
  });
});