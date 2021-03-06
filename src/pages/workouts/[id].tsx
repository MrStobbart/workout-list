import React from "react";
import { Spin, Divider, Row, Col, Button, Card } from "antd";
import Title from "antd/lib/typography/Title";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { container } from "../../styles/workout";
import { GetWorkout } from "../../../typings/generated/GetWorkout";
import { GET_WORKOUT } from "../../apollo/queries";

export default function Workout() {
  const { query } = useRouter();
  const workoutId = query.id;

  const { loading, error, data } = useQuery<GetWorkout>(GET_WORKOUT, {
    variables: { workoutId },
  });

  if (loading) return <Spin />;
  if (error) {
    return (
      <div style={container}>An Error occurred, try to reload the page</div>
    );
  }
  if (!data) {
    return (
      <div style={container}>Could not load workout with id {workoutId}</div>
    );
  }
  const { name, description, start_date, category } = data.workout[0];
  return (
    <div style={container}>
      <Title level={4}>Workout: {name}</Title>
      <Divider />
      <Row gutter={[16, 32]} justify="center">
        <Col>
          <Card
            size="small"
            title="Start date"
            style={{ width: 300, textAlign: "center" }}
          >
            <p>{start_date}</p>
          </Card>
        </Col>
        <Col>
          <Card
            size="small"
            title="Category"
            style={{ width: 300, textAlign: "center" }}
          >
            <p>{category}</p>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 32]}>
        <Card
          size="small"
          title="Description"
          style={{ width: 616, textAlign: "center" }}
        >
          <p>{description}</p>
        </Card>
      </Row>
      <Divider />
      <Link href="/workouts">
        <Button type="default">Back</Button>
      </Link>
    </div>
  );
}
