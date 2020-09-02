/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { workout_category_enum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetWorkouts
// ====================================================

export interface GetWorkouts_workout {
  __typename: "workout";
  id: Hasurauuid;
  name: string;
  description: string;
  category: workout_category_enum;
  start_date: Hasuradate;
}

export interface GetWorkouts_workout_aggregate_aggregate {
  __typename: "workout_aggregate_fields";
  count: number | null;
}

export interface GetWorkouts_workout_aggregate {
  __typename: "workout_aggregate";
  aggregate: GetWorkouts_workout_aggregate_aggregate | null;
}

export interface GetWorkouts {
  /**
   * fetch data from the table: "workout"
   */
  workout: GetWorkouts_workout[];
  /**
   * fetch aggregated fields from the table: "workout"
   */
  workout_aggregate: GetWorkouts_workout_aggregate;
}

export interface GetWorkoutsVariables {
  offset?: number | null;
  limit?: number | null;
  categoryFilter?: workout_category_enum[] | null;
  earliestDate?: Hasuradate | null;
  latestDate?: Hasuradate | null;
}
