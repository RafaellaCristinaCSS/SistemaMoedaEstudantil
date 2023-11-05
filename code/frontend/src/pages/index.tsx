import Link from "next/link";
import React from "react";
import {CarTwoTone, EuroOutlined} from "@ant-design/icons";

export default function LandingPage() {
  return (
    <div className="landing-page formsGeral forms">
      <div className="hero-section">
        <h1>Sistema de Moedas</h1>
        <p>Estimule o reconhecimento do mérito   estudantil através de uma moeda virtual!</p>
        <p>
          <EuroOutlined className="icons2"/>
          {/*<CarTwoTone  />*/}
        </p>
        <button className="btn btn-primary">
          <Link href={"/login"}>Login</Link>
        </button>
        <button className="btn btn-secondary">
          <Link href={"/cadastro"}>Cadastre-se</Link>
        </button>
      </div>
    </div>
  );
}
