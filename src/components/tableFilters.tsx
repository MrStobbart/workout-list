import React from "react";
import { Row, Col, DatePicker, Select } from "antd";
import moment, { Moment } from "moment";
import { workout_category_enum } from "../../typings/generated/globalTypes";

export const monthIsNotWithinNextTwelveMonths = (date: Moment): boolean => {
  if (!date) return true;
  const now = moment();

  const isPastMonth = date.month() < now.month();
  const isUpcomingMonth = date.month() > now.month();
  const isThisMonth = date.month() === now.month();
  const isThisYear = date.year() === now.year();
  const isNextYear = date.year() === now.year() + 1;

  if (isThisYear && (isThisMonth || isUpcomingMonth)) return false;
  if (isNextYear && (isThisMonth || isPastMonth)) return false;
  return true;
};

export interface Filters {
  month: Moment | null;
  categories: workout_category_enum[] | undefined;
  page: number;
}

const availableCategories = Object.keys(
  workout_category_enum
) as workout_category_enum[];

interface Props {
  filters: Filters;
  setFilters: (newFilters: Filters) => void;
}

export default function TableFilters(props: Props) {
  const { filters, setFilters } = props;
  const filteredOptions = availableCategories.filter((category) =>
    filters.categories ? !filters.categories.includes(category) : true
  );
  return (
    <Row gutter={16}>
      <Col className="gutter-row" span={8}>
        <DatePicker
          style={{ width: "135px" }}
          picker="month"
          format="MMM YYYY"
          inputReadOnly
          allowClear
          disabledDate={monthIsNotWithinNextTwelveMonths}
          onChange={(month) => setFilters({ ...filters, month, page: 1 })}
        />
      </Col>
      <Col className="gutter-row" span={8}>
        <Select
          mode="multiple"
          placeholder="Select categories"
          value={filters.categories}
          onChange={(categories) =>
            setFilters({
              ...filters,
              categories: categories.length === 0 ? undefined : categories,
              page: 1,
            })
          }
          style={{ width: "350px" }}
        >
          {filteredOptions.map((item) => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      </Col>
    </Row>
  );
}
