import React from "react";
import moment from "moment";
import renderer from "react-test-renderer";
import TableFilters, {
  monthIsNotWithinNextTwelveMonths,
} from "../tableFilters";
import { workout_category_enum } from "../../../typings/generated/globalTypes";

describe("monthIsNotWithinNextTwelveMonths", () => {
  it("return false for dates within the next twelve months", () => {
    expect(monthIsNotWithinNextTwelveMonths(moment().add(364, "days"))).toBe(
      false
    );
    expect(monthIsNotWithinNextTwelveMonths(moment().add(1, "days"))).toBe(
      false
    );
  });

  it("return true for dates in the past", () => {
    expect(
      monthIsNotWithinNextTwelveMonths(moment().subtract(1, "month"))
    ).toBe(true);
    expect(
      monthIsNotWithinNextTwelveMonths(moment().subtract(12, "years"))
    ).toBe(true);
  });

  it("return true for dates further than 1 year in the future ", () => {
    expect(monthIsNotWithinNextTwelveMonths(moment().add(13, "month"))).toBe(
      true
    );
    expect(monthIsNotWithinNextTwelveMonths(moment().add(2, "years"))).toBe(
      true
    );
  });
});

describe("tableFilter component", () => {
  it("renders correctly", () => {
    const setFilters = jest.fn();
    const component = renderer.create(
      <TableFilters
        filters={{
          page: 1,
          categories: [workout_category_enum.c1],
          month: moment(),
        }}
        setFilters={setFilters}
      />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
