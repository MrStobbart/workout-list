/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Spin } from "antd";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import styles from "../../styles/workout.module.css";
import { GetWorkout } from "../../../typings/generated/GetWorkout";
import { GET_WORKOUT } from "../../apollo/queries";

export default function Workout() {
  const { query } = useRouter();
  const workoutId = query.id;

  const { loading, error, data } = useQuery<GetWorkout>(GET_WORKOUT, {
    variables: { workoutId },
  });

  if (loading) return <Spin />;
  if (error) return <div>An Error occurred, try to reload the page</div>;
  if (!data) return <div>Could not load workout with id {workoutId}</div>;

  const { name, description, start_date, category } = data.workout[0];
  return (
    <div className={styles.container}>
      <Link href="/workouts">
        <a>Zurück</a>
      </Link>
      <div>Name: {name}</div>
      <div>Description: {description}</div>
      <div>Start date: {start_date}</div>
      <div>Category: {category}</div>
    </div>
  );
}
