'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const composeHttpContext = require('../../../dst/lib/util/compose.http.context').composeHttpContext;

describe('compose.http.context.js tests', () => {
  describe('#composeHttpContext()', () => {
    it('expect to create an instance of HttpContext', () => {
      // arranges
      const toolname = 'AtomsKoaTool';
      const processContext = {};
      const val = 'test';
      const ctx = { val: 'test' };
      const next = sinon.stub();

      // acts
      composeHttpContext(ctx, next, processContext);

      // asserts
      expect(next.called).to.be.true;
      expect(ctx.toolname).to.deep.equal(toolname);
      expect(ctx.process).to.deep.equal(processContext);
      expect(ctx.store).to.deep.equal({});
      expect(ctx.val).to.deep.equal(val);
    });

    it('expect to next() function to be called', async () => {
      // arranges
      const ctx = { val: 'test' };
      const processContext = {};
      const next = sinon.stub().resolves();

      // acts
      await composeHttpContext(ctx, next, processContext);

      // asserts
      expect(next.called).to.be.true;
    });
  });
});
