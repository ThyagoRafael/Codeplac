import React from "react";
import { Link } from "react-router-dom";
import "../css/desafios.css";

import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import Circle from "../../Components/jsx/circle";

export default function Desafios() {
  return (
    <div className="desafios-page-wrapper">
      <Header />

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

        <div className="desafios-cards-container">
          {/* Card Desafio 1 - FÁCIL */}
          <div className="desafio-card desafio-card-purple">
            <div className="desafio-header">
              <h3>QUESTÃO Nº1 - NÍVEL FÁCIL</h3>
              <div className="desafio-pontos">Até 1000 pontos</div>
            </div>

            <p className="desafio-texto">
              Escreva um programa que realize iterações básicas e condicionais.
              O programa deve calcular a soma de todos os números pares dentro
              de um intervalo fechado de A até B.
            </p>
            <ul className="desafio-lista">
              <li>Verifique cada número entre A e B (inclusive).</li>
              <li>Se o número for par, adicione-o a uma soma total.</li>
              <li>Imprima o valor final da soma.</li>
            </ul>

            <div className="desafio-code-wrapper">
              <div className="desafio-code-box">
                <h4>Considere as variáveis:</h4>
                <pre>
                  <code>int A = 1; int B = 10;</code>
                </pre>
              </div>
              <div className="desafio-code-box">
                <h4>Saída exata esperada:</h4>
                <pre>
                  <code>30</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Card Desafio 2 - MÉDIO */}
          <div className="desafio-card desafio-card-cyan">
            <div className="desafio-header">
              <h3>QUESTÃO Nº2 - NÍVEL INTERMEDIÁRIO</h3>
              <div className="desafio-pontos">Até 1000 pontos</div>
            </div>

            <p className="desafio-texto">
              Escreva um programa que manipule posições de um array. O programa
              deve realizar duas operações distintas e imprimir os resultados em
              linhas separadas:
            </p>
            <ul className="desafio-lista">
              <li>
                <strong>Linha 1:</strong> Encontre e imprima o MAIOR número
                presente no array.
              </li>
              <li>
                <strong>Linha 2:</strong> Imprima todos os elementos do array em
                ordem inversa, separados por vírgula e um espaço.
              </li>
            </ul>

            <div className="desafio-code-wrapper">
              <div className="desafio-code-box">
                <h4>Considere as variáveis:</h4>
                <pre>
                  <code>int[] numeros = &#123;15, 8, 42, 4, 16&#125;;</code>
                </pre>
              </div>
              <div className="desafio-code-box">
                <h4>Saída exata esperada:</h4>
                <pre>
                  <code>42 16, 4, 42, 8, 15</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Card Desafio 3 - DIFÍCIL */}
          <div className="desafio-card desafio-card-purple">
            <div className="desafio-header">
              <h3>QUESTÃO Nº3 - NÍVEL DIFÍCIL</h3>
              <div className="desafio-pontos">Até 1000 pontos</div>
            </div>

            <p className="desafio-texto">
              Escreva um programa que manipule uma Matriz 3x3 (bidimensional). O
              programa deve realizar cálculos específicos cruzando os dados da
              matriz e imprimir os resultados em linhas separadas:
            </p>
            <ul className="desafio-lista">
              <li>
                <strong>Cálculo A:</strong> Calcule a soma de todos os números
                que compõem a Diagonal Principal da matriz e imprima o
                resultado.
              </li>
              <li>
                <strong>Cálculo B:</strong> Pegue o resultado da soma obtida no
                Cálculo A e multiplique-o pelo elemento central da matriz (o
                elemento no índice linha 1, coluna 1). Imprima este novo
                resultado na linha seguinte.
              </li>
            </ul>

            <div className="desafio-code-wrapper">
              <div className="desafio-code-box">
                <h4>Considere as variáveis:</h4>
                <pre>
                  <code>
                    int[][] matriz = &#123; &#123;1, 2, 3&#125;, &#123;4, 5,
                    6&#125;, &#123;7, 8, 9&#125; &#125;;
                  </code>
                </pre>
              </div>
              <div className="desafio-code-box">
                <h4>Saída exata esperada:</h4>
                <pre>
                  <code>15 75</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

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
