import { Card } from "antd";
import Link from "next/link";
import React from "react";
import { FileTextOutlined, AppstoreAddOutlined, CheckOutlined } from "@ant-design/icons";

const Student: React.FC = () => {
  return (
    <div className="formsPage formsGeral">
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

      <Link href={"/trocaVantagens"} className="link">
        <Card className="cards" hoverable>
          <AppstoreAddOutlined className="icons" />
          <br />
          Adquira Vantagens
        </Card>
      </Link>

      <Link href={"/extratoAluno"} className="link">
        <Card className="cards" hoverable>
          <FileTextOutlined className="icons" />
          <br />
          Extrato
        </Card>
      </Link>

      <Link href={"/minhasVantagens"} className="link">
         <Card className="cards" hoverable>
            <CheckOutlined className="icons" />
             <br />
             Minhas Vantagens
         </Card>
      </Link>

    </div>
  );
};

export default Student;
