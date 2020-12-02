import { expect } from "chai";

import { capture } from "./regex";

describe("regex/capture", () => {
  it("extracts values from one capturing group", () => {
    const captures = capture(/^!(?<foo>\d+)!$/, "!322!", {
      foo: (s) => parseInt(s),
    });

    expect(captures).to.have.keys(["foo"]);
    expect(captures.foo).to.eq(322);
  });

  it("extracts values from multiple capturing group", () => {
    const captures = capture(/^!(?<foo>\d+)!(?<bar>[\.\d]+)!$/, "!322!1.25!", {
      foo: (s) => parseInt(s),
      bar: (s) => parseFloat(s),
    });

    expect(captures).to.have.keys(["foo", "bar"]);
    expect(captures.foo).to.eq(322);
    expect(captures.bar).to.eq(1.25);
  });
});
