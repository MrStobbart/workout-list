import React from "react";
import { PageHeader } from "antd";

export default function Header() {
  return (
    <PageHeader
      title="Technical Workouts"
      className="site-page-header"
      subTitle="Find your workout now!"
      style={{ background: "#EFFEF3" }}
    />
  );
}
