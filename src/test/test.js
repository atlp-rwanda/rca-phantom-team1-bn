import { expect } from "chai";
import sinon from "sinon";

describe("Example Test Suite", () => {
  it("should pass", () => {
    expect(1 + 1).to.equal(2);
  });

  it("should use a spy", () => {
    const callback = sinon.spy();

    callback("hello", "world");

    // eslint-disable-next-line no-unused-expressions
    expect(callback.calledWith("hello", "world")).to.be.true;
  });
});
