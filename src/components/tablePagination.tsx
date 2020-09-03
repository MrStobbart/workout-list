import React from "react";
import { Pagination } from "antd";
import { Filters } from "./tableFilters";

interface Props {
  filters: Filters;
  setFilters: (newFilters: Filters) => void;
  workoutCount: number;
  limit: number;
  offset: number;
}

export default function TablePagination(props: Props) {
  const { filters, setFilters, workoutCount, limit, offset } = props;
  return (
    <Pagination
      style={{ marginTop: 30 }}
      disabled={workoutCount <= limit}
      current={filters.page}
      total={workoutCount}
      pageSize={20}
      onChange={(page) => setFilters({ ...filters, page })}
      showSizeChanger={false}
      showTotal={(total) => (
        <div>
          Workouts {offset + 1} - {Math.min(offset + limit, total)} from {total}
        </div>
      )}
    />
  );
}
