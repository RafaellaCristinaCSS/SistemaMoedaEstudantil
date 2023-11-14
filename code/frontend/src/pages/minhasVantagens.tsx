import React, {useEffect, useState} from "react";
import axios from "axios";
import {ArrowLeftOutlined, FileSearchOutlined} from "@ant-design/icons";
import Link from "next/link";
import {Button, Card} from "antd";

const App: React.FC = () => {
    const [requestInfo, setRequestInfo] = useState<any[]>([]);

    useEffect(() => {
        const getUserAdvantage = async () => {
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            };
            const response = await axios.get(
                `http://localhost:5500/user/${localStorage.getItem("id")}/advantage`,
                { headers }
            );

            console.log(response.data);
            setRequestInfo(response.data);
        };

        getUserAdvantage();
    }, []);

    return(
        <div className="">
            <Link href={"/student"} className="linksaida">
                <ArrowLeftOutlined /> Voltar
            </Link>
            <div className=" flex flex-col justify-between items-center gap-9">
                <h1 className="font-bold text-3xl">Minhas Vantagens Adquiridas</h1>
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
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}

export default App;
