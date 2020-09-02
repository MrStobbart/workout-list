// TODO try to not use these exceptions
/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Link from "next/link";
import moment, { Moment } from "moment";
import { Pagination, Table, DatePicker, Select } from "antd";
import { useQuery } from "@apollo/client";
import { ColumnsType } from "antd/lib/table";
import styles from "../styles/workout.module.css";
import { GET_WORKOUTS } from "../apollo/queries";
import {
  GetWorkouts_workout,
  GetWorkouts,
} from "../../typings/generated/GetWorkouts";
import { workout_category_enum } from "../../typings/generated/globalTypes";

const columns: ColumnsType<GetWorkouts_workout> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Start date",
    dataIndex: "start_date",
    key: "start_date",
    width: "150px",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Action",
    dataIndex: "",
    key: "action",
    render: (workout) => (
      <Link href="/workouts/[id]" as={`/workouts/${workout.id}`}>
        <a>Details</a>
      </Link>
    ),
  },
];

const isDateWithinNextTwelveMonths = (date: Moment): boolean => {
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

interface Filters {
  month: Moment | null;
  categories: string[] | undefined;
  page: number;
}

const availableCategories = Object.keys(workout_category_enum);

export default function Workouts() {
  const [filters, setFilters] = useState<Filters>({
    month: null,
    categories: undefined,
    page: 1,
  });

  const limit = 20;
  const offset = (filters.page - 1) * limit;
  const { loading, error, data } = useQuery<GetWorkouts>(GET_WORKOUTS, {
    variables: {
      offset,
      limit,
      categoryFilter: filters.categories,
      earliestDate: filters.month?.clone().startOf("month"),
      latestDate: filters.month?.clone().endOf("month"),
    },
  });
  // TODO this is not optimal
  const count = data?.workout_aggregate.aggregate?.count || 1000;

  if (error) return `Error! ${error.message}`;

  const filteredOptions = availableCategories.filter((category) =>
    filters.categories ? !filters.categories.includes(category) : true
  );
  return (
    <div className={styles.container}>
      <DatePicker
        picker="month"
        format="MMM YYYY"
        inputReadOnly
        allowClear
        disabledDate={isDateWithinNextTwelveMonths}
        onChange={(month) => setFilters({ ...filters, month })}
      />
      <Select
        mode="multiple"
        placeholder="Select categories"
        value={filters.categories}
        onChange={(categories) =>
          setFilters({
            ...filters,
            categories: categories.length === 0 ? undefined : categories,
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
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data?.workout}
        loading={loading}
        pagination={false}
        size="middle"
      />
      <Pagination
        disabled={count <= limit}
        defaultCurrent={1}
        total={count}
        pageSize={20}
        onChange={(page) => setFilters({ ...filters, page })}
        showSizeChanger={false}
        showTotal={(total) => (
          <div>
            Workouts {offset + 1} - {Math.min(offset + limit, total)} from{" "}
            {total}
          </div>
        )}
      />
    </div>
  );
}
