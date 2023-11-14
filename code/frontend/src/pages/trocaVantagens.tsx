import React, { useEffect, useState } from "react";
import { Card } from "antd";
import axios from "axios";
import Link from "next/link";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { FileSearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

import { Button } from "antd";

const App: React.FC = () => {

  const router = useRouter();

  // AQUII
  const onFinish = async (advantageId: string) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    try {
      await axios.post(
          `http://localhost:5500/user/add/advantage`,
          {
            user_id: localStorage.getItem('id'),
            advantage_id: advantageId
          },
          {headers});
        router.push(`/minhasVantagens`);
    } catch (e) {
      console.log(e);
    }
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
      const response = await axios.get(`http://localhost:5500/advantage`, {
        headers,
      });
      console.log("aqui");
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
              title={r.name}
              bordered={false}
              style={{ width: 500 }}
              className="gap-2 flex flex-col"
              key={r.id}
            >
              <p>Motivos: {r.description}</p>
              <p>Valor: {r.value}</p>
              <div className="flex">

                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-blue-600  self-end ml-auto"
                  onClick={() => onFinish(r.id)}
                >
                  Adquirir
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
