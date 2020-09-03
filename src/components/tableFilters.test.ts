import moment from "moment";
import { monthIsNotWithinNextTwelveMonths } from "./tableFilters";

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
