import Link from "next/link";
import { Card } from "antd";
import {
  CarOutlined,
  CreditCardOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
// import "../styles/agente_style.css"; // Importe o arquivo CSS aqui

export default function Home() {
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

      <h1 className="title">Seja bem-vindo Agente!</h1>

      <Link href={"/carros"} className="link">
        <Card className="cards" hoverable>
          <CarOutlined className="icons" />
          <br />
          Cadastre um carro
        </Card>
      </Link>

      <Link href={"/request"} className="link">
        <Card className="cards" hoverable>
          <IdcardOutlined className="icons" />
          <br />
          Aprovar pedidos
        </Card>
      </Link>
    </div>
  );
}
