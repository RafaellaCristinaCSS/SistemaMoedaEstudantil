import Link from "next/link";
import FormCarros from "./components/FormCoins";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Select, Space, InputNumber } from "antd";
import FormCoin from "./components/FormCoins";


export default function Home() {
  return (
    <div className="flex flex-col justify-between items-center gap-14 font-normal">
      <Link href={"/teacher"}>
        <ArrowLeftOutlined /> Voltar
      </Link>
      <h1 className="title font-bold">Envio de moedas</h1>
      
      <div className="flex flex-row gap-5 text-2xl font-bold">
        <h1>Seu saldo:</h1> 
        <span>0</span>
      </div>

      <div>
        <FormCoin />
      </div>
    </div>
  );
}
