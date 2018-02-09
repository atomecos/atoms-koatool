'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const composeHttpContext = require('../../../dst/lib/util/compose.http.context').composeHttpContext;

describe('compose.http.context.js tests', () => {
  describe('#AtomsExpressToolFactory()', () => {
    it('expect to create an instance of express', () => {
      // arranges
      const ctx = { val: 'test' };
      const next = sinon.stub();
      const processContext = {};
      const expected = {
        val: 'test',
        process: processContext,
        store: {}
      };

      // acts
      composeHttpContext(ctx, next, processContext);

      // asserts
      expect(next.called).to.be.true;;
      expect(ctx).to.deep.equal(expected);
    });
  });
});
