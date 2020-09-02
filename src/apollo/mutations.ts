import gql from "graphql-tag";

export const INSERT_WORKOUTS = gql`
  mutation InsertWorkouts($workouts: [workout_insert_input!]!) {
    insert_workout(objects: $workouts) {
      returning {
        id
      }
    }
  }
`;
