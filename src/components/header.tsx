import React from "react";
import { PageHeader, Button } from "antd";
import Link from "next/link";

export default function Header() {
  return (
    <PageHeader
      title="Technical Workouts"
      className="site-page-header"
      subTitle={
        <Link href="/workouts">
          <Button type="link">Find your workout now!</Button>
        </Link>
      }
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
