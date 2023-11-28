import Link from "next/link";
import FormCarros from "../components/FormCoins";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Select, Space, InputNumber, Form, Button, Input } from "antd";
const { TextArea } = Input;

import FormCoin from "../components/FormCoins";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const [coins, setCoins] = useState();
  const [studentsNames, setStudentsNames] = useState([]);

  useEffect(() => {
    const headers = { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    async function getUser() {
      try {
        const response = await axios.get(
          `http://localhost:5500/user/${localStorage.getItem("id")}`,
          {
            headers,
          }
        );
        console.log(response);
        // @ts-ignore
        setCoins(response.data.coins);
      } catch (e) {
        console.log(e);
      }
      try {
        const response = await axios.get(`http://localhost:5500/user`, {
          headers,
        });
        console.log(response);
        // @ts-ignore
        const userInfo = response.data.map((e) => {
          return {
            value: e.name,
            label: e.name,
          };
        });
        // @ts-ignore
        setStudentsNames(userInfo);
      } catch (e) {
        console.log(e);
      }
    }
    getUser();
  }, []);
  const OnFinish = async (values: any) => {
    console.log(values);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const studentInfo = await axios.get(
      `http://localhost:5500/user/name/${values.student}`,
      {
        headers,
      }
    );
    console.log(studentInfo);

    try {
      await axios.post(
        `http://localhost:5500/transfer`,
        {
          value: values.coin,
          student_id: studentInfo.data.id,
          teacher_id: localStorage.getItem("id"),
          reason: values.reason,
        },
        { headers }
      );
      await router.push(`/teacher`);
    } catch (e) {
      console.log(e);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex flex-col justify-between items-center gap-14 font-normal formsPage formsGeral">
      <Link href={"/teacher"}>
        <ArrowLeftOutlined /> Voltar
      </Link>
      <h1 className="title font-bold">Envio de moedas</h1>

      <div className="flex flex-row gap-5 text-2xl font-bold">
        <h1>Seu saldo:</h1>
        <span className="text-black">{coins}</span>
      </div>

      <div>
        <Form
          name="basic"
          labelCol={{ span: 16 }}
          wrapperCol={{ span: 38 }}
          style={{ maxWidth: 900 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          className="flex flex-col gap-1 "
          onFinish={OnFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Quantidade de moedas"
            name="coin"
            rules={[
              {
                required: true,
                message: "Digite o numero de moedas para o aluno!",
              },
            ]}
            className="flex gap-10"
          >
            <InputNumber min={1} max={10000} />
          </Form.Item>

          <Form.Item
            label="Aluno"
            name="student"
            rules={[{ required: true, message: "Selecione um aluno!" }]}
          >
            <Select
              style={{ width: 120, marginLeft: "-25%" }}
              options={studentsNames}
            />
          </Form.Item>

          <Form.Item
            label="Motivo"
            name="reason"
            rules={[{ required: true, message: "Selecione um motivo!" }]}
          >
            <TextArea rows={5} style={{ marginLeft: "-25%" }} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 10, span: 20 }}>
            <Button type="primary" htmlType="submit" className="bg-blue-600">
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
