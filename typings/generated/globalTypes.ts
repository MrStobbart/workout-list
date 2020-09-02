/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum workout_category_enum {
  c1 = "c1",
  c2 = "c2",
  c3 = "c3",
  c4 = "c4",
  c5 = "c5",
  c6 = "c6",
  c7 = "c7",
}

/**
 * input type for inserting data into table "workout"
 */
export interface workout_insert_input {
  category?: workout_category_enum | null;
  created_at?: Hasuratimestamptz | null;
  description?: string | null;
  id?: Hasurauuid | null;
  name?: string | null;
  start_date?: Hasuradate | null;
  updated_at?: Hasuratimestamptz | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
