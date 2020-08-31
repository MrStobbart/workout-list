/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetWorkouts
// ====================================================

export interface GetWorkouts_Workout {
  __typename: "Workout";
  id: Hasurauuid;
}

export interface GetWorkouts {
  /**
   * fetch data from the table: "Workout"
   */
  Workout: GetWorkouts_Workout[];
}
