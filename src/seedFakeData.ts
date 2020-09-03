/* eslint-disable no-console */
import faker from "faker";
import client from "./apollo";
import {
  workout_category_enum,
  workout_insert_input,
} from "../typings/generated/globalTypes";
import { InsertWorkouts } from "../typings/generated/InsertWorkouts";
import { WORKOUT_COUNT } from "./apollo/queries";
import { INSERT_WORKOUTS } from "./apollo/mutations";
import { WorkoutCount } from "../typings/generated/WorkoutCount";

const getRandomCategory = (): workout_category_enum => {
  const categories = Object.keys(workout_category_enum);
  return categories[
    Math.floor(Math.random() * categories.length)
  ] as workout_category_enum;
};

const getRandomDescription = () =>
  faker.lorem.words(faker.random.number({ min: 20, max: 120 }));

const generateFakeData = (): workout_insert_input[] => {
  return [...Array(1000).keys()].map(() => ({
    name: faker.company.catchPhrase(),
    description: getRandomDescription(),
    start_date: faker.date.future(),
    category: getRandomCategory(),
  }));
};

const saveFakeData = async () => {
  console.log("Start seeding fake data");

  try {
    const { data } = await client.query<WorkoutCount>({
      query: WORKOUT_COUNT,
    });

    if (
      data?.workout_aggregate.aggregate?.count &&
      data?.workout_aggregate.aggregate?.count >= 1000
    ) {
      console.log("Data was already seeded, skip execution");
      return;
    }

    const fakeData = generateFakeData();

    const response = await client.mutate<InsertWorkouts>({
      mutation: INSERT_WORKOUTS,
      variables: { workouts: fakeData },
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

saveFakeData();
