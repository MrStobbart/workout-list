/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: WorkoutCount
// ====================================================

export interface WorkoutCount_workout_aggregate_aggregate {
  __typename: "workout_aggregate_fields";
  count: number | null;
}

export interface WorkoutCount_workout_aggregate {
  __typename: "workout_aggregate";
  aggregate: WorkoutCount_workout_aggregate_aggregate | null;
}

export interface WorkoutCount {
  /**
   * fetch aggregated fields from the table: "workout"
   */
  workout_aggregate: WorkoutCount_workout_aggregate;
}
