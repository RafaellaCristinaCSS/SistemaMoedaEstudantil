import { Button, Form, Input, InputNumber, Select } from "antd";
import axios from "axios";
import { useState } from "react";
import AlertSucess from "./AlertSucess";
import { useRouter } from "next/router";

const { TextArea } = Input;

type FieldType = {
  student?: string;
  coin?: number;
  reason?: string;
};

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
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
    }
  );

  return response.data;
};

const FormCoin: React.FC = () => {
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
        labelCol={{ span: 16 }}
        wrapperCol={{ span: 38 }}
        style={{ maxWidth: 900 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form} 
        className="flex flex-col gap-1 "
      >
        <Form.Item<FieldType>
          label="Quantidade de moedas"
          name="coin"
          rules={[{ required: true, message: "Digite o numero de moedas para o aluno!" }]}
          className="flex gap-10"
        >
          <InputNumber min={1} max={10} defaultValue={3} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Aluno"
          name="student"
          rules={[{ required: true, message: "Selecione um aluno!" }]}
        >
          <Select
            defaultValue="lucy"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
              { value: "disabled", label: "Disabled", disabled: true },
            ]}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Motivo"
          name="reason"
          rules={[{ required: true, message: "Selecione um motivo!" }]}
        >
          <TextArea rows={5} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 10, span: 20 }}>
          <Button type="primary" htmlType="submit" className="bg-blue-600">
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormCoin;
