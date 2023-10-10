import Link from "next/link";
import FormCarros from "./components/FormCarros";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function Home() {
  return (
    <div>
      <Link href={"/agente"}>
        <ArrowLeftOutlined /> Voltar
      </Link>
      <div className="forms">
        <h1 className="title">Cadastre o Carro</h1>
        <FormCarros />
      </div>
    </div>
  );
}
