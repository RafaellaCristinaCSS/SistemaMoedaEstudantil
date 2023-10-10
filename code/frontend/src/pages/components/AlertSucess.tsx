import React from "react";
import { Alert } from "antd";
const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  console.log(e, "I was closed.");
};
const ALertSucess: React.FC = () => (
  <Alert
    message="Cadastro feito com sucesso"
    type="success"
    closable
    onClose={onClose}
  />
);

export default ALertSucess;
