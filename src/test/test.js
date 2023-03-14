// eslint-disable-next-line node/no-unpublished-require
const { expect } = require('chai');
// eslint-disable-next-line node/no-unpublished-require
const sinon = require('sinon');

describe('Example Test Suite', () => {
  it('should pass', () => {
    expect(1 + 1).to.equal(2);
  });

  it('should use a spy', () => {
    const callback = sinon.spy();

    callback('hello', 'world');

    expect(callback.calledWith('hello', 'world')).to.be.true;
  });
});
