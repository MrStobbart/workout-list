/* eslint-disable no-console */
import gql from "graphql-tag";
import faker from "faker";
import client from "./apollo";
import {
  WorkoutCategory_enum,
  Workout_insert_input,
} from "../typings/generated/globalTypes";
import { GetWorkouts } from "../typings/generated/GetWorkouts";
import { InsertWorkouts } from "../typings/generated/InsertWorkouts";

const INSERT_WORKOUTS = gql`
  mutation InsertWorkouts($workouts: [Workout_insert_input!]!) {
    insert_Workout(objects: $workouts) {
      returning {
        id
      }
    }
  }
`;

const GET_WORKOUTS = gql`
  query GetWorkouts {
    Workout {
      id
    }
  }
`;

const getRandomCategory = (): WorkoutCategory_enum => {
  const categories = Object.keys(WorkoutCategory_enum);
  return categories[
    Math.floor(Math.random() * categories.length)
  ] as WorkoutCategory_enum;
};

const getRandomDescription = () =>
  faker.lorem.words(faker.random.number({ min: 20, max: 120 }));

const generateFakeData = (): Workout_insert_input[] => {
  return [...Array(1000).keys()].map(() => ({
    name: faker.company.catchPhrase(),
    description: getRandomDescription(),
    startDate: faker.date.future(),
    category: getRandomCategory(),
  }));
};

const saveFakeData = async () => {
  try {
    const { data } = await client.query<GetWorkouts>({
      query: GET_WORKOUTS,
    });

    if (data && data.Workout && data.Workout.length >= 1000) {
      console.log("Data was already seeded, skip execution");
      return;
    }

    const fakeData = generateFakeData();

    const response = await client.mutate<InsertWorkouts>({
      mutation: INSERT_WORKOUTS,
      variables: { workouts: fakeData },
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

saveFakeData();
