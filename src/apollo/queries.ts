import gql from "graphql-tag";

export const WORKOUT_COUNT = gql`
  query WorkoutCount {
    workout_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_WORKOUTS = gql`
  query GetWorkouts(
    $offset: Int = 0
    $limit: Int = 20
    $categoryFilter: [workout_category_enum!]
    $earliestDate: date
    $latestDate: date
  ) {
    workout(
      limit: $limit
      offset: $offset
      where: {
        category: { _in: $categoryFilter }
        start_date: { _gte: $earliestDate, _lte: $latestDate }
      }
      order_by: { start_date: asc }
    ) {
      id
      name
      description
      category
      start_date
    }
    workout_aggregate(
      where: {
        category: { _in: $categoryFilter }
        start_date: { _gte: $earliestDate, _lte: $latestDate }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;
