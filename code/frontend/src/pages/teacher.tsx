import Link from "next/link";
import { Card } from "antd";
import {
  FileTextOutlined,
  DollarOutlined
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

      <h1 className="title">Seja bem-vindo Professor!</h1>

      <Link href={"/sendCoin"} className="link">
        <Card className="cards" hoverable>
        <DollarOutlined className="icons" />
          <br />
          Envie Moedas
        </Card>
      </Link>

      <Link href={"/extratoProfessor"} className="link">
        <Card className="cards" hoverable>
        <FileTextOutlined className="icons" />
          <br />
          Extrato
        </Card>
      </Link>
    </div>
  );
}
