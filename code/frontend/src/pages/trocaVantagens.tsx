import React, { useEffect, useState } from "react";
import { Card } from "antd";
import axios from "axios";
import Link from "next/link";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { FileSearchOutlined } from "@ant-design/icons";

import { Button } from "antd";

const App: React.FC = () => {
  interface RentRequestDTO {
    coins: number;
    id: string;
  }

  interface RentRequestDTO2 {
    coins: number;
  }

  const [requestInfo, setRequestInfo] = useState<any[]>([]);
  const [coinsValue, setCoins] = useState();

  useEffect(() => {
    const getInfos = async () => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const response = await axios.get(
        `http://localhost:5500/user/${localStorage.getItem("id")}`,

        //trocar as rotas aqui
        { headers }
      );

      console.log(response.data);

      setCoins(response.data.coins);
    };

    getInfos();
  }, []);

  useEffect(() => {
    async function fetchRequest() {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const response = await axios.get(
        `http://localhost:5500/transfer/teacher/${localStorage.getItem("id")}`,
        {
          headers,
        }
      );

      console.log(response.data);
      setRequestInfo(response.data);
    }

    fetchRequest();
  }, []);

  return (
    <div className="">
      <Link href={"/student"} className="linksaida">
        <ArrowLeftOutlined /> Voltar
      </Link>
      <div className=" flex flex-col justify-between items-center gap-9">
        <h1 className="font-bold text-3xl">Vantagens</h1>

        <div className="flex gap-4 font-bold text-2xl">
          <h3>Seu saldo:</h3> <span>{coinsValue}</span>
        </div>

        {requestInfo.length === 0 ? (
          <div>
            <p className=" font-bold text-lg ">Sem vantagens por enquanto.</p>
            <FileSearchOutlined className="icons3" />
          </div>
        ) : (
          requestInfo.map((r) => (
            <Card
              title={" Moedas " + r.value}
              bordered={false}
              style={{ width: 500 }}
              key={r.value}
            >
              <p>Moedas enviadas: {r.value}</p>
              {/* <p>Motivos aqui</p> */}
              <p>Para o aluno {r.student.name}</p>
            </Card>
          ))
        )}

        <Card
          title="Desconto Udemy"
          bordered={false}
          style={{ width: 500 }}
          className="gap-2 flex flex-col"
        >
          <p>ganha desconto de 30% na udemy</p>
          {/* <p>Motivos aqui</p> */}
          <p>Valor 30 moedas</p>
          <div className="flex">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-600  self-end ml-auto"
            >
              Adquirir
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default App;
