import Link from "next/link";
import FormCarros from "./components/FormCoins";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Select, Space, InputNumber, Form, Button, Input, Upload } from "antd";
const { TextArea } = Input;
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { InboxOutlined } from "@ant-design/icons";

export default function Home() {
  const router = useRouter();

  const [coins, setCoins] = useState();
  const [studentsNames, setStudentsNames] = useState([]);

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const OnFinish = async (values: any) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    try {
      await axios.post(
        `http://localhost:5500/advantage`,
        {
          value: values.value,
          name: values.name,
          description: values.description,
        },
        { headers }
      );
      await router.push(`/company`);
    } catch (e) {
      console.log(e);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex flex-col justify-between items-center gap-14 font-normal formsPage formsGeral">
      <Link href={"/company"}>
        <ArrowLeftOutlined /> Voltar
      </Link>
      <h1 className="title font-bold">Cadastre uma vantagem</h1>

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
            label="Nome"
            name="name"
            rules={[
              {
                required: true,
                message: "Digite o nome para a vantagem!",
              },
            ]}
            className="flex gap-10"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Valor"
            name="value"
            rules={[{ required: true, message: "Digite um valor!" }]}
          >
            <InputNumber min={0} />
          </Form.Item>

          <Form.Item
            label="Descrição"
            name="description"
            rules={[{ required: true, message: "Selecione um motivo!" }]}
          >
            <TextArea rows={5} />
          </Form.Item>

          {/*<Form.Item label="Dragger">*/}
          {/*  <Form.Item*/}
          {/*    name="dragger"*/}
          {/*    valuePropName="fileList"*/}
          {/*    getValueFromEvent={normFile}*/}
          {/*    noStyle*/}
          {/*  >*/}
          {/*    <Upload.Dragger name="files" action="/upload.do">*/}
          {/*      <p className="ant-upload-drag-icon">*/}
          {/*        <InboxOutlined />*/}
          {/*      </p>*/}
          {/*      <p className="ant-upload-text">*/}
          {/*        Click or drag file to this area to upload*/}
          {/*      </p>*/}
          {/*      <p className="ant-upload-hint">*/}
          {/*        Support for a single or bulk upload.*/}
          {/*      </p>*/}
          {/*    </Upload.Dragger>*/}
          {/*  </Form.Item>*/}
          {/*</Form.Item>*/}

          <Form.Item wrapperCol={{ offset: 10, span: 20 }}>
            <Button type="primary" htmlType="submit" className="bg-blue-600">
              Cadastrar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
