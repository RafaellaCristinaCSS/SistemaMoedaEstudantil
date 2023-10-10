import React, { useEffect, useState } from "react";
import { Card, Space, Button } from "antd";
import axios from "axios";
import Link from "next/link";
import { ArrowLeftOutlined } from "@ant-design/icons";

const App: React.FC = () => {
  interface CarDTO {
    id: string;
    renavam: string;

    year: number;

    brand: string;

    model: string;

    license_plate: string;
    is_rented: boolean;
    daily_rate: number;
  }
  interface UserDTO {
    id: string;
    name: string;
    email: string;
    cpf: string;
    role: string;
  }
  interface RentRequestDTO {
    id: string;
    start: string;
    end: string;
    car: CarDTO;
    user: UserDTO;
    total_value: number;
    status: string;
  }
  const [requestInfo, setRequestInfo] = useState<RentRequestDTO[]>([]);
  const [reload, setReload] = useState<boolean>();

  useEffect(() => {
    async function fetchRequest() {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const response = await axios.get("http://localhost:5500/rent-request", {
        headers,
      });
      setRequestInfo(response.data);
    }

    fetchRequest();
  }, [reload]);

  const changeStatus = async (reqId: string, status: string) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    await axios.post(
      `http://localhost:5500/rent-request/status/${reqId}`,
      { status: status },
      { headers }
    );
    setReload(!reload);
  };

  return (
    <div className="cliente">
      <Link href={"/agente"} className="linksaida">
        <ArrowLeftOutlined /> Voltar
      </Link>
      <div className="cards-client">
        <h1>Pedidos de aluguel</h1>
        <Space direction="horizontal" size={16}>
          <div className="card-container">
            {requestInfo.map((r) => (
              <Card
                key={r.id}
                size="small"
                title={`Pedido de: ${r.user.name}`}
                extra={<a href="#">More</a>}
                style={{ width: 600 }}
                className="card"
              >
                <p>
                  <strong>Carro solicitado:</strong> {r.car.model}, Ano:{" "}
                  {r.car.year}
                </p>
                <p>
                  <strong>Nome do Cliente:</strong> {r.user.name}
                </p>
                <p>
                  <strong>Inicio:</strong> {r.start}
                </p>
                <p>
                  <strong>Fim:</strong> {r.end}
                </p>
                <p>
                  <strong>Valor a ser pago:</strong> R${r.total_value}
                </p>

                <div className="btn-app-dn">
                  <Button
                    style={{ backgroundColor: "green", color: "white" }}
                    onClick={() => changeStatus(r.id, "approved")}
                  >
                    Aprovar
                  </Button>
                  <Button
                    style={{ backgroundColor: "red", color: "white" }}
                    onClick={() => changeStatus(r.id, "denied")}
                  >
                    Negar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Space>
      </div>
    </div>
  );
};

export default App;
