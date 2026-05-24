import React from "react";
import "../css/desafios.css";

import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import Circle from "../../Components/jsx/circle";

export default function Desafios() {
  return (
    <div className="desafios-page-wrapper">
      <div className="desafio-circle">
        <Circle size={420} variant="cyan" className="circle-1" />
        <Circle size={420} variant="purple" className="circle-2" />
      </div>
      <Header />

      <div className="desafios-glows">
        <div className="desafios-glow-purple" />
        <div className="desafios-glow-cyan" />
      </div>

      <main className="desafios-container">
        <section className="desafios-intro">
          <h1 className="desafios-main-title">Painel de Desafios</h1>
          <p className="desafios-description">
            O Painel de Desafios é a nossa bússola para a excelência. Cada item
            é um convite à inovação e à persistência, traçando a jornada que
            eleva o nível de ambição e a performance de toda a organização.
          </p>
        </section>

        {/* --- DESAFIO 1 (FÁCIL) --- */}
        <section className="desafio-card">
          <h2 className="desafio-header">
            <span className="dots">● ● ●</span> DESAFIO 1: DETETIVE DE VOGAIS
          </h2>
          <div className="desafio-content">
            <p>
              O sistema de uma biblioteca escolar precisa organizar os livros
              pelo número de vogais presentes no título.
            </p>
            <h3 className="sub-header-cyan">Sua Tarefa:</h3>
            <p>
              Receba uma palavra (string) e conte o total de vogais (a, e, i, o,
              u), ignorando maiúsculas ou minúsculas.
            </p>
            <div className="exemplo-box">
              <h4>Exemplo Prático:</h4>
              <pre>Entrada: Programacao | Saída: 5</pre>
            </div>
          </div>
        </section>

        {/* --- DESAFIO 2 (MÉDIA) --- */}
        <section className="desafio-card">
          <h2 className="desafio-header">
            <span className="dots">● ● ●</span> DESAFIO 2: ÁRBITRO DE JOGO DA
            VELHA
          </h2>
          <div className="desafio-content">
            <p>
              Uma plataforma de jogos online precisa de um componente que valide
              se um jogador venceu uma partida de Jogo da Velha.
            </p>
            <h3 className="sub-header-cyan">Sua Tarefa:</h3>
            <p>
              Receba uma matriz 3x3 (0 para vazio, 1 para X, 2 para O) e
              verifique se existe um vencedor em linha, coluna ou diagonal.
            </p>
            <div className="exemplo-box">
              <pre>Saída: VENCEDOR: X</pre>
            </div>
          </div>
        </section>

        {/* --- DESAFIO 3 (MÉDIA) --- */}
        <section className="desafio-card">
          <h2 className="desafio-header">
            <span className="dots">● ● ●</span> DESAFIO 3: O TRADUTOR BINÁRIO
          </h2>
          <div className="desafio-content">
            <p>
              Sistemas embarcados frequentemente operam apenas em base binária.
              Crie um conversor que transforme um decimal em binário.
            </p>
            <h3 className="sub-header-cyan">Sua Tarefa:</h3>
            <p>
              Converta um número decimal (base 10) para binário (base 2) usando
              divisões sucessivas.
            </p>
            <div className="exemplo-box">
              <pre>Entrada: 13 | Saída: 1101</pre>
            </div>
            <h3 className="sub-header-cyan">Dica:</h3>
            <p className="dica-text">
              Em C, use um vetor para armazenar os restos e imprima de trás para
              frente. Em Java, use StringBuilder.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
