import React from "react";
import { Link } from "react-router-dom"; // Importante para o botão funcionar
import "../css/desafios.css"; // Arquivo de estilos que vamos ajustar abaixo

import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import Circle from "../../Components/jsx/circle";

export default function Desafios() {
  return (
    <div className="desafios-page-wrapper">
      <Header />

      {/* Efeitos de fundo (Glows e Círculos) */}
      <div className="desafios-glows">
        <div className="desafios-glow-purple" />
        <div className="desafios-glow-cyan" />
      </div>

      <div className="desafios-circles-bg">
        <Circle size={450} variant="purple" className="desafios-circle-left" />
        <Circle size={400} variant="cyan" className="desafios-circle-right" />
      </div>

      <main className="desafios-container">
        <h1 className="desafios-main-title">DESAFIOS DA COMPETIÇÃO</h1>

        <div className="desafios-title-divider"></div>

        <p className="desafios-description">
          Aqui você encontra a lista de problemas que sua equipe precisa
          resolver. Leia atentamente as instruções de cada desafio, desenvolva
          sua lógica (C, C++ ou Java) e, quando estiverem prontos, enviem o
          código para o nosso Juiz Online para avaliação.
        </p>

        {/* Lista de Desafios (Cards) */}
        <div className="desafios-cards-container">
          {/* Card Desafio 1 */}
          <div className="desafio-card desafio-card-purple">
            <h3>Desafio 1: Nível Fácil</h3>
            <p>
              Resolução de cálculos matemáticos básicos, lógica de variáveis e
              operações com inteiros.
            </p>
            <div className="desafio-pontos">Valor: Até 1000 pontos</div>
          </div>

          {/* Card Desafio 2 */}
          <div className="desafio-card desafio-card-cyan">
            <h3>Desafio 2: Nível Intermediário</h3>
            <p>
              Manipulação de posições em arrays, iteração e operações
              matemáticas com ponto flutuante.
            </p>
            <div className="desafio-pontos">Valor: Até 1000 pontos</div>
          </div>
        </div>

        {/* ========================================== */}
        {/* BOTÃO PARA REDIRECIONAR PARA O JUIZ ONLINE */}
        {/* ========================================== */}
        <div className="desafios-action-area">
          <Link to="/juiz" className="codeplac-btn-juiz">
            IR PARA O JUIZ ONLINE
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
