import Link from "next/link";
import FormAluguel from "./components/FormAluguel";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function Home() {
  return (
    <div>
      <Link href={"/agente"}>
        <ArrowLeftOutlined /> Voltar
      </Link>
      <div className="forms">
        <FormAluguel />
      </div>
    </div>
  );
}
