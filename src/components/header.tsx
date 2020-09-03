import React from "react";
import { PageHeader } from "antd";

export default function Header() {
  return (
    <PageHeader
      title="Technical Workouts"
      className="site-page-header"
      subTitle="Find your workout now!"
      style={{ background: "#EFFEF3" }}
      extra={[
        <img
          key="1"
          src="/logo.svg"
          style={{
            height: "52px",
            width: "auto",
            float: "right",
            margin: "-10px",
          }}
          alt="content"
          width="100%"
        />,
      ]}
    />
  );
}
