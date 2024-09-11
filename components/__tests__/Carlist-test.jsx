import * as React from "react";
import renderer from "react-test-renderer";

import Carlist from "../Carlist";

it(`renders correctly`, () => {
  const tree = renderer
    .create(
      <Carlist
        image={require("@/assets/images/img-car.png")}
        carName={"Innova"}
        passenger={5}
        baggage={4}
        price={"500000"}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
