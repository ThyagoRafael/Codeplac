import React, { useState, useEffect } from "react";
import "../css/desafios.css";

import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import Circle from "../../Components/jsx/circle";

export default function Regras() {
  const [liberado, setLiberado] = useState(false);
  const [tempoRestante, setTempoRestante] = useState("");

  useEffect(() => {
    // Data alvo: 26 de maio de 2026, 00:00
    const dataAlvo = new Date("2026-05-26T00:00:00");

    const timer = setInterval(() => {
      const agora = new Date();
      const diferenca = dataAlvo - agora;

      if (diferenca <= 0) {
        setLiberado(true);
        clearInterval(timer);
      } else {
        const horas = Math.floor(diferenca / (1000 * 60 * 60));
        const minutos = Math.floor(
          (diferenca % (1000 * 60 * 60)) / (1000 * 60),
        );
        const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);
        setTempoRestante(`${horas}h ${minutos}m ${segundos}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
          <h1 className="desafios-main-title">Regulamento da Competição</h1>
          <p className="desafios-description">
            Leia atentamente as diretrizes abaixo. O sucesso exige técnica,
            precisão e originalidade. Boa sorte a todos os competidores!
          </p>
        </section>

        <section className="desafio-card">
          <h2 className="desafio-header">
            <span className="dots">● ● ●</span> Cronograma e Envio
          </h2>
          <div className="desafio-content">
            <p>
              O tempo é um fator determinante. Vocês terão do início do evento
              até às <strong>11:40</strong> para concluir e submeter todos os
              seus códigos.
            </p>
            <p>
              As submissões devem ser realizadas exclusivamente através do campo
              disponível na plataforma durante a vigência do evento.
            </p>
          </div>
        </section>

        <section className="desafio-card">
          <h2 className="desafio-header">
            <span className="dots">● ● ●</span> Especificações Técnicas
          </h2>
          <div className="desafio-content">
            <p>
              Serão exigidos <strong>3 desafios</strong> de níveis progressivos:
              <strong> Fácil, Médio e Difícil</strong>.
            </p>
            <p>
              Os códigos deverão ser desenvolvidos obrigatoriamente em
              <strong> Java ou linguagem C</strong>. Busquem sempre a
              simplicidade e a clareza na lógica.
            </p>
            <div
              className="exemplo-box"
              style={{ borderColor: "rgba(239, 68, 68, 0.4)" }}
            >
              <h4 style={{ color: "#ef4444" }}>Aviso Importante:</h4>
              <p>
                Códigos que apresentarem indícios claros de uso excessivo de
                Inteligência Artificial serão automaticamente desclassificados.
              </p>
            </div>
          </div>
        </section>

        <section className="desafio-card">
          <h2 className="desafio-header">
            <span className="dots">● ● ●</span> Sistema de Pontuação
          </h2>
          <div className="desafio-content">
            <p>
              A competição totaliza <strong>1000 pontos</strong>. A avaliação
              considerará não apenas o funcionamento, mas a qualidade do código.
            </p>
            <p>
              Erros de sintaxe, falhas na lógica ou falta de otimização
              resultarão em penalidades que variam de{" "}
              <strong>50 a 100 pontos</strong> por ocorrência. Ao final, a
              equipe com a maior pontuação será declarada vencedora.
            </p>
          </div>
        </section>

        {/* Botão de Competição */}
        <div className="btn-competicao-wrapper">
          <a
            href={liberado ? "https://www.codeplac.com.br/desafios" : "#"}
            className={`btn-competicao ${liberado ? "btn-ativo" : "btn-desativado"}`}
            onClick={(e) => !liberado && e.preventDefault()}
          >
            {liberado ? "Competição" : `Inicia em: ${tempoRestante}`}
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
