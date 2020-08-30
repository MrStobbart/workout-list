/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WorkoutCategory_enum } from "./globalTypes";

// ====================================================
// GraphQL query operation: MyQuery
// ====================================================

export interface MyQuery_Workout {
  __typename: "Workout";
  description: string;
  startDate: Hasuradate;
  id: Hasurauuid;
  name: string;
  category: WorkoutCategory_enum;
}

export interface MyQuery {
  /**
   * fetch data from the table: "Workout"
   */
  Workout: MyQuery_Workout[];
}
