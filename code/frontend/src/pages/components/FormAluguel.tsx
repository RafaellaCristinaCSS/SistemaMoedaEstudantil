import { Button, Form, Input, Select } from "antd";

const Option = Select;

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  renavam?: string;
  dias?: number;
  valor?: number;
};

const FormCarros: React.FC = () => (
  <Form
    name="basic"
    labelCol={{ span: 13 }}
    wrapperCol={{ span: 118 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Perído em Dias"
      name="dias"
      rules={[{ required: true, message: "Digite o renavam!" }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Valor /período"
      name="valor"
      rules={[{ required: true, message: "Digite o ano do carro!" }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name="carros"
      label="Selecione um carro"
      rules={[{ required: true }]}
    >
      <Select allowClear defaultValue="">
        <Option value="">Selecione o carro</Option>
        <Option value="male">male</Option>
        <Option value="female">female</Option>
        <Option value="other">other</Option>
      </Select>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Cadastrar
      </Button>
    </Form.Item>
  </Form>
);

export default FormCarros;
