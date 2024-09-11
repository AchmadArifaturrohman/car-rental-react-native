import * as React from "react";
import renderer from "react-test-renderer";

import ModalPopup from "../Modal";

it(`renders correctly`, () => {
  const tree = renderer
    .create(<ModalPopup visible={true}>Snapshot test!</ModalPopup>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
