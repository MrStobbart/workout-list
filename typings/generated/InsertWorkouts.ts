/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Workout_insert_input } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: InsertWorkouts
// ====================================================

export interface InsertWorkouts_insert_Workout_returning {
  __typename: "Workout";
  id: Hasurauuid;
}

export interface InsertWorkouts_insert_Workout {
  __typename: "Workout_mutation_response";
  /**
   * data of the affected rows by the mutation
   */
  returning: InsertWorkouts_insert_Workout_returning[];
}

export interface InsertWorkouts {
  /**
   * insert data into the table: "Workout"
   */
  insert_Workout: InsertWorkouts_insert_Workout | null;
}

export interface InsertWorkoutsVariables {
  workouts: Workout_insert_input[];
}
