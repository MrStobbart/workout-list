/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { workout_category_enum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetWorkout
// ====================================================

export interface GetWorkout_workout {
  __typename: "workout";
  id: Hasurauuid;
  name: string;
  description: string;
  start_date: Hasuradate;
  category: workout_category_enum;
}

export interface GetWorkout {
  /**
   * fetch data from the table: "workout"
   */
  workout: GetWorkout_workout[];
}

export interface GetWorkoutVariables {
  workoutId: Hasurauuid;
}
