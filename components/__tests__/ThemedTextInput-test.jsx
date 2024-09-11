import * as React from "react";
import renderer from "react-test-renderer";

import { ThemedTextInput } from "../ThemedTextInput";

it(`renders correctly`, () => {
  const tree = renderer
    .create(<ThemedTextInput>Snapshot test!</ThemedTextInput>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
