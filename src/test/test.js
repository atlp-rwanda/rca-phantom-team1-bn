const { expect } = require("chai");
const sinon = require("sinon");

describe("Example Test Suite", () => {
  it("should pass", () => {
    expect(1 + 1).to.equal(2);
  });

  it("should use a spy", () => {
    const callback = sinon.spy();

    callback("hello", "world");

    expect(callback.calledWith("hello", "world")).to.be.true;
  });
});
