import React, { useEffect, useState } from "react";
import { Card } from "antd";
import axios from "axios";
import Link from "next/link";
import { ArrowLeftOutlined } from "@ant-design/icons";

const App: React.FC = () => {

    return (
        <div className="">
          <Link href={"/student"} className="linksaida">
            <ArrowLeftOutlined /> Voltar
          </Link>
          <div className=" flex flex-col justify-between items-center gap-9">
            <h1 className="font-bold text-3xl">Extrato</h1>
    
            <div className="flex gap-4 font-bold text-2xl">
              <h3>Seu saldo:</h3> <span>30</span>
            </div>
    
            <Card title="+3 Moedas" bordered={false} style={{ width: 500 }}>
              <p>23/05/2023</p>
              <p>Motivos aqui</p>
              <p>Enviado por Professor Half</p>
            </Card>
          </div>
        </div>
      );
    };
    
    export default App;