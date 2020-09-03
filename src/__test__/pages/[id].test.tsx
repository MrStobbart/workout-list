import React from "react";
import renderer from "react-test-renderer";
import { useRouter } from "next/dist/client/router";
import { mocked } from "ts-jest/utils";
import { MockedProvider } from "@apollo/client/testing";
import Workout from "../../pages/workouts/[id]";
import { GET_WORKOUT } from "../../apollo/queries";
import { GetWorkout_workout } from "../../../typings/generated/GetWorkout";
import { workout_category_enum } from "../../../typings/generated/globalTypes";

const workout: GetWorkout_workout = {
  __typename: "workout",
  id: "yo",
  name: "Pull Ups",
  description: "Just lit",
  start_date: new Date(),
  category: workout_category_enum.c2,
};
const mocks = [
  {
    request: {
      query: GET_WORKOUT,
      variables: {
        workoutId: "123",
      },
    },
    result: {
      data: {
        workout,
      },
    },
  },
];

jest.mock("next/dist/client/router");

mocked(useRouter).mockReturnValue({
  query: { id: "123" },
} as any);

describe("tablePagination component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const component = renderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Workout />
      </MockedProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
