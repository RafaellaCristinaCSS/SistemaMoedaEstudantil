import {Divider, Card, Space, Button, Modal, DatePicker} from "antd";
import React, {useEffect, useState} from "react";
import type { DatePickerProps } from 'antd';

import axios from "axios";

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
    const [cars, setCars] = useState<CarDTO[]>([]);

    interface RentRequestDTO {
        id: string;
        start: string;
        end: string;
        car: CarDTO;
        total_value: number;
        status: string;
    }
    const [requestInfo, setRequestInfo] = useState<RentRequestDTO[]>([]);
    const [selectedCar, setSelectedCar] = useState<CarDTO | null>();

    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);


    const [isModalOpen, setIsModalOpen] = useState(false);

    const [reload, setReload] = useState(false);

    const onChangeDataPickerStart: DatePickerProps['onChange'] = (date, dateString) => {
        setStartDate(dateString);
    };

    const onChangeDataPickerEnd: DatePickerProps['onChange'] = (date, dateString) => {

        setEndDate(dateString);
    };

    function getStatusColor(status: string) {
        if (status === "approved") {
            return "green"; // Green background for approved
        } else if (status === "pending") {
            return "grey"; // Grey background for pending
        } else if (status === "denied") {
            return "red"; // Red background for denied
        } else {
            return "transparent"; // Default transparent background
        }
    }

    const showModal = (car: CarDTO) => {
        setIsModalOpen(true);
        setSelectedCar(car);
        console.log(car.model)
    };

    const handleOk =  async ()  => {
        setIsModalOpen(false);
        const headers = {
            "Content-Type": "application/json",
            Authorization:
                `Bearer ${localStorage.getItem('token')}`,
        };
        const response = await axios.get("http://localhost:5500/auth/info", {headers});
        const payload = {
            user_id: response.data.id,
            car_id: selectedCar?.id,
            start: startDate,
            end: endDate,
        }
        console.log(payload)
        await axios.post("http://localhost:5500/rent-request",payload, {headers});
        setReload(!reload);
    };

    const handleCancel = () => {
        setSelectedCar(null);
        setEndDate(null);
        setStartDate(null);
        setIsModalOpen(false);
    };

    useEffect(() => {
        async function fetchCars() {
            try {
                const headers = {
                    "Content-Type": "application/json",
                    Authorization:
                        `Bearer ${localStorage.getItem('token')}`,
                };
                const response = await axios.get("http://localhost:5500/car", {headers});
                setCars(response.data);
                console.log(response);
                const userInfo = await axios.get("http://localhost:5500/auth/info", {headers});
                const rentReq = await axios.get(`http://localhost:5500/rent-request/user/${userInfo.data.id}`, {headers})
                setRequestInfo(rentReq.data);
            } catch (error) {
                console.error("Erro ao buscar dados da API:", error);
            }
        }

        fetchCars();
    }, [reload]);

 return(
     <div className="cliente">
         <div className="cards-client">
             <h1 className="title">Veja novos alugeis:</h1>
             <Space direction="vertical" size={16}>
                 {cars.map((car) => (
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
                         <Button type="primary" onClick={() => showModal(car)}>Solicitar aluguel</Button>
                     </Card>
                 ))}

                 <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                     <p>Selecione a Data de Início</p>
                     <DatePicker onChange={onChangeDataPickerStart} />
                     <p>Selecione a Data de término</p>
                     <DatePicker onChange={onChangeDataPickerEnd} />
                 </Modal>
             </Space>
         </div>
         <Divider className="divider" type="vertical" />
         <div className="cards-client">
            <h1 className="title">Seus alugueis:</h1>
             <Space direction="vertical" size={16}>
                 {requestInfo.map((reqInfo) => (
                     <Card
                         key={reqInfo.id}
                         size="small"
                         title={`Pedido do carro: ${reqInfo.car.model}`}
                         extra={<a href="#">More</a>}
                         style={{ width: 300 }}
                     >
                         <p><strong>Início:</strong> {reqInfo.start}</p>
                         <p><strong>Fim:</strong> {reqInfo.end}</p>
                         <p><strong>Valor total:</strong> R$ {reqInfo.total_value}</p>
                         <p><strong>Carro escolhido:</strong> {reqInfo.car.model}</p>
                         <p><strong>Ano do carro:</strong> {reqInfo.car.year}</p>
                         <Button style={{ color: "white", backgroundColor: getStatusColor(reqInfo.status) }}>
                             Status: {reqInfo.status}
                         </Button>
                     </Card>
                 ))}

                 <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                     <p>Selecione a Data de Início</p>
                     <DatePicker onChange={onChangeDataPickerStart} />
                     <p>Selecione a Data de término</p>
                     <DatePicker onChange={onChangeDataPickerEnd} />
                 </Modal>
             </Space>
         </div>
    </div>
 )


};

export default App;
