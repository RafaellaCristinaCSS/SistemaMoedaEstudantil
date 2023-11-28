import React from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

interface LoginFormValues {
  email: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
}

interface UserInfo {
  id: string;
  role: string;
}

const LoginForm: React.FC<{
  onFinish: (values: LoginFormValues) => Promise<AuthResponse | undefined>;
  onFinishFailed: (errorInfo: any) => void;
}> = ({ onFinish, onFinishFailed }) => {
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Please enter a valid email address!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const AuthPage: React.FC = () => {
  const router = useRouter();

  const handleAuth = async (values: LoginFormValues) => {
    try {
      const response = await axios.post("http://localhost:5500/auth", values);
      localStorage.setItem("token", response.data.access_token);

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      const userInfo: UserInfo = await axios.get(
        "http://localhost:5500/auth/info",
        { headers }
      );

      localStorage.setItem("id", userInfo.id);

      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onFinish = async (values: LoginFormValues) => {
    const authResponse = await handleAuth(values);

    if (authResponse) {
      const { role } = await handleAuth(values);

      if (role === "company") {
        router.push(`/company`);
      } else if (role === "student") {
        router.push(`/student`);
      } else if (role === "teacher") {
        router.push(`/teacher`);
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="forms formsGeral">
      <h1 className="title">Login:</h1>
      <LoginForm onFinish={onFinish} onFinishFailed={onFinishFailed} />
      <div>
        <Link href={"/cadastro"}>Não possui conta? Crie a sua.</Link>
      </div>
    </div>
  );
};

export default AuthPage;
