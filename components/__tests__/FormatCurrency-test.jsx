import * as React from "react";
import renderer from "react-test-renderer";

import FormatCurrency from "../FormatCurrency";

it(`renders correctly`, () => {
  const tree = renderer.create(<FormatCurrency amount={1000000} />).toJSON();

  expect(tree).toMatchSnapshot();
});
