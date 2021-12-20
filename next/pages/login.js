import Link from "next/link";
import React from "react";
import Card from "../components/Card/Card";

const login = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card classNameProp="loginCard"></Card>
    </div>
  );
};

export default login;
