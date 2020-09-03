import React, { useState } from "react";
import Link from "next/link";
import { Table, Button } from "antd";
import { useQuery } from "@apollo/client";
import { ColumnsType } from "antd/lib/table";
import { container } from "../styles/workout";
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
        <Button type="link">Details</Button>
      </Link>
    ),
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

  if (error) return <div style={container}>Error! {error.message}</div>;

  return (
    <div style={container}>
      <FiltersComponent filters={filters} setFilters={setFilters} />
      <TablePagination
        filters={filters}
        setFilters={setFilters}
        workoutCount={count}
        offset={offset}
        limit={limit}
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
        offset={offset}
        limit={limit}
      />
    </div>
  );
}
