import { Card } from "antd";
import Link from "next/link";
import React from "react";
import {
    FileTextOutlined,
    DollarOutlined
  } from "@ant-design/icons";

const Student: React.FC = () => {
  return (
    <div className="forms">
      <Link
        className="linksaida"
        onClick={() => {
          localStorage.removeItem("token");
        }}
        href={"/login"}
      >
        Sair
      </Link>

      <h1 className="title">Seja bem-vindo Estudante!</h1>

      <Link href={"/extratoAluno"} className="link">
        <Card className="cards" hoverable>
          <FileTextOutlined className="icons" />
          <br />
          Extrato
        </Card>
      </Link>
    </div>
  );
};

export default Student;
