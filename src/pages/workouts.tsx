import React, { useState } from "react";
import Link from "next/link";
import { Table, Button, Divider } from "antd";
import Title from "antd/lib/typography/Title";
import { useQuery } from "@apollo/client";
import { ColumnsType } from "antd/lib/table";
import styles from "../styles/workout.module.css";
import { GET_WORKOUTS } from "../apollo/queries";
import {
  GetWorkouts_workout,
  GetWorkouts,
} from "../../typings/generated/GetWorkouts";
import FiltersComponent, { Filters } from "../components/tableFilters";
import TablePagination from "../components/tablePagination";

const columns: ColumnsType<GetWorkouts_workout> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 450,
  },
  {
    title: "Start date",
    dataIndex: "start_date",
    key: "start_date",
    width: 150,
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    width: 80,
  },
  {
    title: "Action",
    dataIndex: "",
    key: "action",
    render: (workout) => (
      <Link href="/workouts/[id]" as={`/workouts/${workout.id}`}>
        <Button type="dashed">Details</Button>
      </Link>
    ),
    width: 100,
  },
];

export default function Workouts() {
  const [filters, setFilters] = useState<Filters>({
    month: null,
    categories: undefined,
    page: 1,
  });

  const limit = 20;
  const offset = (filters.page - 1) * limit;
  const variables = {
    offset,
    limit,
    categoryFilter: filters.categories,
    earliestDate: filters.month?.clone().startOf("month").format("YYYY-MM-DD"),
    latestDate: filters.month?.clone().endOf("month").format("YYYY-MM-DD"),
  };

  const { loading, error, data } = useQuery<GetWorkouts>(GET_WORKOUTS, {
    variables,
  });
  const count = data?.workout_aggregate.aggregate?.count || 1000;

  if (error) return `Error! ${error.message}`;

  return (
    <div className={styles.container}>
      <Title level={4}>Available Workouts</Title>
      <Divider />
      <FiltersComponent filters={filters} setFilters={setFilters} />
      <TablePagination
        filters={filters}
        setFilters={setFilters}
        workoutCount={count}
        limit={limit}
        offset={offset}
      />
      <Table
        style={{ marginTop: 30 }}
        rowKey="id"
        columns={columns}
        dataSource={data?.workout}
        loading={loading}
        pagination={false}
        size="middle"
      />
      <TablePagination
        filters={filters}
        setFilters={setFilters}
        workoutCount={count}
        limit={limit}
        offset={offset}
      />
    </div>
  );
}
