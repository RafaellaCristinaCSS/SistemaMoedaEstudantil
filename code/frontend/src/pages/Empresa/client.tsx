import { Divider, Card, Space, Button, Modal, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import type { DatePickerProps } from "antd";

import axios from "axios";
import Link from "next/link";

// Crie componentes reutilizáveis para os Cards de Carros e de Solicitações.
// Separe a lógica de solicitação e manipulação de dados em funções separadas.
// Utilize funções assíncronas para melhorar a legibilidade e tratamento de erros.

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

interface RentRequestDTO {
  id: string;
  start: string;
  end: string;
  car: CarDTO;
  total_value: number;
  status: string;
}

const CarCard: React.FC<{ car: CarDTO; onRentClick: (car: CarDTO) => void }> = ({ car, onRentClick }) => (
  <Card
    key={car.id}
    size="small"
    title={`Carro: ${car.model}`}
    extra={<a href="#">More</a>}
    style={{ width: 300 }}
  >
    <p>Ano: {car.year}</p>
    <p>Marca: {car.brand}</p>
    <p>Valor: R${car.daily_rate}</p>
    <Button type="primary" onClick={() => onRentClick(car)}>
      Solicitar aluguel
    </Button>
  </Card>
);

const RequestCard: React.FC<{ requestInfo: RentRequestDTO; getStatusColor: (status: string) => string }> = ({ requestInfo, getStatusColor }) => (
  <Card
    key={requestInfo.id}
    size="small"
    title={`Pedido do carro: ${requestInfo.car.model}`}
    extra={<a href="#">More</a>}
    style={{ width: 300 }}
  >
    <p>
      <strong>Início:</strong> {requestInfo.start}
    </p>
    <p>
      <strong>Fim:</strong> {requestInfo.end}
    </p>
    <p>
      <strong>Valor total:</strong> R$ {requestInfo.total_value}
    </p>
    <p>
      <strong>Carro escolhido:</strong> {requestInfo.car.model}
    </p>
    <p>
      <strong>Ano do carro:</strong> {requestInfo.car.year}
    </p>
    <Button
      style={{
        color: "white",
        backgroundColor: getStatusColor(requestInfo.status),
      }}
    >
      Status: {requestInfo.status}
    </Button>
  </Card>
);

const App: React.FC = () => {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [requestInfo, setRequestInfo] = useState<RentRequestDTO[]>([]);
  const [selectedCar, setSelectedCar] = useState<CarDTO | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reload, setReload] = useState(false);

  const onChangeDataPickerStart: DatePickerProps["onChange"] = (date: String | null, dateString: string) => {
    setStartDate(dateString);
  };

  const onChangeDataPickerEnd: DatePickerProps["onChange"] = (date: String | null, dateString: string) => {
    setEndDate(dateString);
  };

  const showModal = (car: CarDTO) => {
    setIsModalOpen(true);
    setSelectedCar(car);
    console.log(car.model);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      const response = await axios.get("http://localhost:5500/auth/info", {
        headers,
      });

      const payload = {
        user_id: (response.data as { id: string }).id,
        car_id: selectedCar?.id,
        start: startDate,
        end: endDate,
      };

      console.log(payload);

      const request = await axios.post(
        "http://localhost:5500/rent-request",
        payload,
        { headers }
      );

      setReload(!reload);
    } catch (error) {
      console.error("Erro ao processar a solicitação:", error);
    }
  };

  const handleCancel = () => {
    setSelectedCar(null);
    setEndDate(null);
    setStartDate(null);
    setIsModalOpen(false);
  };

  const getStatusColor = (status: string) => {
    if (status === "approved") {
      return "green";
    } else if (status === "pending") {
      return "grey";
    } else if (status === "denied") {
      return "red";
    } else {
      return "transparent";
    }
  };

  useEffect(() => {
    async function fetchCars() {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };

        const response = await axios.get<CarDTO[]>("http://localhost:5500/car", {
          headers,
        });

        setCars(response.data);

        const userInfo = await axios.get("http://localhost:5500/auth/info", {
          headers,
        });

        const rentReq = await axios.get(
          `http://localhost:5500/rent-request/user/${userInfo.data.id}`,
          { headers }
        );

        setRequestInfo(rentReq.data);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    }

    fetchCars();
  }, [reload]);

  return (
    <div className="cliente formsPage formsGeral">
      <Link
        className="linksaida"
        onClick={() => {
          localStorage.removeItem("token");
        }}
        href={"/login"}
      >
        Sair
      </Link>
      <div className="cards-client">
        <h1 className="title">Carros para alugar:</h1>
        <Space direction="vertical" size={16}>
          {cars.map((car) => (
            <CarCard key={car.id} car={car} onRentClick={showModal} />
          ))}
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Selecione a Data de Início</p>
            <DatePicker onChange={onChangeDataPickerStart} />
            <p>Selecione a Data de término</p>
            <DatePicker onChange={onChangeDataPickerEnd} />
          </Modal>
        </Space>
      </div>
      <Divider className="divider" type="vertical" />
      <div className="cards-client">
        <h1 className="title">Minhas Solicitações:</h1>
        <Space direction="vertical" size={16}>
          {requestInfo.map((reqInfo) => (
            <RequestCard
              key={reqInfo.id}
              requestInfo={reqInfo}
              getStatusColor={getStatusColor}
            />
          ))}
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Selecione a Data de Início</p>
            <DatePicker onChange={onChangeDataPickerStart} />
            <p>Selecione a Data de término</p>
            <DatePicker onChange={onChangeDataPickerEnd} />
          </Modal>
        </Space>
      </div>
    </div>
  );
};

export default App;