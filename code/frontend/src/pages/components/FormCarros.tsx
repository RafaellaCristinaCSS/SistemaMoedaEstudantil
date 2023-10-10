import { Button, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";

import AlertSucess from "./AlertSucess";
import { useRouter } from "next/router";

type FieldType = {
  renavam?: string;
  year?: number;
  license_plate?: string;
  brand?: string;
  model?: string;
  daily_rate?: number;
};

const postCar = async (dataCar: {
  renavam: string;
  year: string;
  license_plate: string;
  brand: string;
  model: string;
  daily_rate: string;
}) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const response = await axios.post(
    "http://localhost:5500/car",
    {
      ...dataCar,
      year: parseInt(JSON.parse(dataCar.year)),
      daily_rate: parseInt(JSON.parse(dataCar.daily_rate)),
    },
    {
      headers,
    },
  );

  return response.data;
};

const FormCarros: React.FC = () => {
  const [showAlert, setAlert] = useState<boolean>(false);

  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    console.log("Success:", values);

    try {
      const response = await postCar(values);
      router.reload();
      console.log("Response from server:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      {showAlert && <AlertSucess />}

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item<FieldType>
          label="Renavam"
          name="renavam"
          rules={[{ required: true, message: "Digite o renavam!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Ano"
          name="year"
          rules={[
            { required: true, message: "Digite o ano do carro!" },
            {
              type: "integer",
              message: "Por favor, insira um número inteiro para o ano!",
              transform: (value) => {
                if (!isNaN(Number(value))) {
                  return Number(value);
                }
                return value;
              },
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Marca"
          name="brand"
          rules={[{ required: true, message: "Digite a marca do carro!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Modelo"
          name="model"
          rules={[{ required: true, message: "Digite a modelo do carro!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Placa"
          name="license_plate"
          rules={[{ required: true, message: "Digite a placa!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Daily rate"
          name="daily_rate"
          rules={[
            { required: true, message: "Digite o Daily rate!" },
            {
              type: "integer",
              message: "Por favor, insira um número inteiro para o Daily rate!",
              transform: (value) => {
                if (!isNaN(Number(value))) {
                  return Number(value);
                }
                return value;
              },
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Cadastrar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormCarros;
