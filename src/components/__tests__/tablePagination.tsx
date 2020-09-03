import React from "react";
import renderer from "react-test-renderer";
import moment from "moment";
import TablePagination from "../tablePagination";
import { workout_category_enum } from "../../../typings/generated/globalTypes";

describe("tablePagination component", () => {
  it("renders correctly", () => {
    const setFilters = jest.fn();
    const component = renderer.create(
      <TablePagination
        filters={{
          page: 1,
          categories: [workout_category_enum.c1],
          month: moment(),
        }}
        setFilters={setFilters}
        workoutCount={5}
        limit={20}
        offset={0}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
