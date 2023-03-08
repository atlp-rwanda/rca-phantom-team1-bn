import * as chai from 'chai';
import * as sinon from 'sinon';
import { describe, it } from 'mocha';

const expect = chai.expect;

describe('Example Test Suite', () => {
  it('should pass', () => {
    expect(1 + 1).to.equal(2);
  });

  it('should use a spy', () => {
    const callback = sinon.spy();

    callback('hello', 'world');

    expect(callback.calledOnce).to.be.true;
    expect(callback.calledWith('hello', 'world')).to.be.true;
  });

  it('should use a stub', () => {
    const myObject = {
      myMethod: () => 'original value',
    };

    sinon.stub(myObject, 'myMethod').returns('stubbed value');

    expect(myObject.myMethod()).to.equal('stubbed value');
  });
});
