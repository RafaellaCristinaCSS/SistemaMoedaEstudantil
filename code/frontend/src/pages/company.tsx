import { Card } from "antd";
import Link from "next/link";
import React from "react";
import { FileAddOutlined } from "@ant-design/icons";

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

      <h1 className="title">Seja bem-vindo Empresa!</h1>

      <Link href={"/cadastraVantagens"} className="link">
        <Card className="cards" hoverable>
          <FileAddOutlined className="icons" />
          <br />
          Cadastrar Vantagem
        </Card>
      </Link>
    </div>
  );
};

export default Student;
