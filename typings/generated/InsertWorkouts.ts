/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { workout_insert_input } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: InsertWorkouts
// ====================================================

export interface InsertWorkouts_insert_workout_returning {
  __typename: "workout";
  id: Hasurauuid;
}

export interface InsertWorkouts_insert_workout {
  __typename: "workout_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: InsertWorkouts_insert_workout_returning[];
}

export interface InsertWorkouts {
  /**
   * insert data into the table: "workout"
   */
  insert_workout: InsertWorkouts_insert_workout | null;
}

export interface InsertWorkoutsVariables {
  workouts: workout_insert_input[];
}
