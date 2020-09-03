import React from "react";
import renderer from "react-test-renderer";
import Header from "../header";

describe("header component", () => {
  it("renders correctly", () => {
    const component = renderer.create(<Header />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
