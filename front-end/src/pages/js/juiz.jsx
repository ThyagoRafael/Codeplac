import React, { useState } from "react";
import "../css/juiz.css";

import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import Circle from "../../Components/jsx/circle";
import enfeiteImg from "../../assets/img/enfeite.png";

// Importando ícones para usar dentro das dicas (estilo home)
import { Lightbulb, Terminal } from "lucide-react";

import image1 from "../../assets/img/image.png";
import image2 from "../../assets/img/img2.png";

export default function Juiz() {
  // Corrigido: variável de ambiente precisa ter prefixo REACT_APP_
  const urlfinal = `${process.env.REACT_APP_JUIZ}`.replace(
    /([^:]\/)\/+/g,
    "$1",
  );
  const [formData, setFormData] = useState({
    leader: "",
    team: "",
  });
  const [archive, setarchive] = useState([]);
  const [sended, setsended] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setarchive(files);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação unificada
    if (!formData.leader.trim() || !formData.team.trim()) {
      setMessage("Preencha o nome do líder e da equipe.");
      return;
    }
    if (archive.length === 0) {
      setMessage("Selecione pelo menos um arquivo para enviar.");
      return;
    }

    setsended(true);
    setMessage("");
    try {
      const formDataObj = new FormData();
      archive.forEach((file) => {
        formDataObj.append("files", file);
      });

      const url = `${urlfinal}/?Name=${encodeURIComponent(formData.leader)}&Team=${encodeURIComponent(formData.team)}`;

      const response = await fetch(url, {
        method: "POST",
        body: formDataObj,
      });

      // Verifica se a resposta é JSON
      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        // Se não for JSON, lê como texto (ex: mensagem de erro simples)
        const text = await response.text();
        throw new Error(text || "Erro desconhecido");
      }

      if (!response.ok) {
        throw new Error(data.message || "Erro no envio");
      }

      setMessage(`✅ ${data.message || "Arquivos enviados com sucesso!"}`);
      setarchive([]);
      setFormData({ leader: "", team: "" });
      // Limpa o input file
      const fileInput = document.getElementById("file-input");
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.error("Erro ao enviar:", error);
      setMessage(`❌ Erro: ${error.message}`);
    } finally {
      setsended(false);
    }
  };

  return (
    <div className="juiz-page-wrapper">
      <Header />

      <div className="juiz-glows">
        <div className="juiz-glow-purple" />
        <div className="juiz-glow-cyan" />
      </div>

      <div className="juiz-circles-bg">
        <Circle size={500} variant="purple" className="juiz-circle-left" />
        <Circle size={450} variant="cyan" className="juiz-circle-right" />
      </div>

      <main className="juiz-container">
        <h1 className="juiz-main-title">Juiz Online</h1>

        {/* Card de Instruções */}
        <section className="juiz-instructions-card">
          <div className="juiz-card">
            <div className="juiz-card-sidebar">
              <img
                src={enfeiteImg}
                alt="Enfeite"
                className="juiz-card-ornament"
              />
            </div>
            <div className="juiz-card-content">
              <h2 className="juiz-card-title">
                INSTRUÇÕES PARA O ENVIO DO{" "}
                <span className="juiz-highlight-alt">CÓDIGO</span> E{" "}
                <span className="juiz-highlight-alt">PARTICIPAÇÃO</span>
              </h2>
              <div className="juiz-card-text">
                <p>
                  1. Cada código deve ser enviado separadamente! em caso de
                  envio dos 2 códigos no mesmo campo, não irá valer.
                </p>
                <p>
                  2. Cada código irá valer até 1000 pontos, quanto mais próximo
                  e mais otimizado maior a pontuação porém cada erro ou parte
                  desnecessária no código irá descontar até 150 pontos totais
                </p>
                <p>
                  3. O uso de IA é proibido, no entanto se for visto pelos
                  monitores da competição os mesmos terão a equipe
                  desclassificada.
                </p>
                <p>
                  4. Não devem conter membros além dos da sua equipe para ajudar
                  no código caso contrário, serão desclassificados ou a pessoa
                  será retirada do laboratório.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Questão 1 */}
        <section className="juiz-question-section">
          <div className="juiz-question-header">
            <h2 className="juiz-question-level easy">
              NÍVEL FÁCIL - QUESTÃO Nº1
            </h2>
            <p className="juiz-question-description">
              Escreva um programa (em C ou Java) que realize os seguintes
              cálculos e imprima os resultados em duas linhas separadas, na
              ordem especificada: Cálculo A: Calcule a soma de P, Q e R, e
              subtraia 9 do resultado. Cálculo B: Calcule o resto da divisão
              inteira da variável Q pela variável R.
            </p>
          </div>

          <div className="juiz-question-layout">
            <div className="juiz-side-container">
              <img
                src={image1}
                alt="Icone Código"
                className="juiz-floating-img"
              />
            </div>

            <div className="juiz-hints-container">
              <div className="juiz-hint-card juiz-purple-theme">
                <div className="juiz-card-header">
                  <div className="juiz-icon-box">
                    <Terminal size={20} color="#a855f7" />
                  </div>
                </div>
                <h3>Dica:</h3>
                <p>
                  Considere as seguintes variáveis inteiras: <br /> int P = 10;{" "}
                  <br /> int Q = 7; <br /> int R = 3;
                </p>
              </div>
              <div className="juiz-hint-card juiz-cyan-theme">
                <div className="juiz-card-header">
                  <div className="juiz-icon-box">
                    <Lightbulb size={20} color="#00eaff" />
                  </div>
                </div>
                <h3>Saída:</h3>
                <p>
                  O código deve ter a seguinte saída exata: <br /> 11 <br /> 1
                </p>
              </div>
            </div>

            <div className="juiz-side-container"></div>
          </div>
        </section>

        {/* Questão 2 */}
        <section className="juiz-question-section">
          <div className="juiz-question-header">
            <h2 className="juiz-question-level medium">
              NÍVEL INTERMEDIÁRIO - QUESTÃO Nº2
            </h2>
            <p className="juiz-question-description">
              Escreva um programa (em C ou Java) que realize as seguintes
              operações e imprima os resultados em duas linhas separadas, na
              ordem especificada: Cálculo A (Inteiro): Calcule a soma total de
              todos os elementos do array numeros. Cálculo B (Ponto Flutuante):
              Calcule a soma do primeiro elemento (índice 0) e do quarto
              elemento (índice 3) do array. Em seguida, divida essa soma pelo
              valor da variável divisor. O resultado deve ser um número real
              (com casas decimais).
            </p>
          </div>

          <div className="juiz-question-layout">
            <div className="juiz-side-container"></div>

            <div className="juiz-hints-container">
              <div className="juiz-hint-card juiz-purple-theme">
                <div className="juiz-card-header">
                  <div className="juiz-icon-box">
                    <Terminal size={20} color="#a855f7" />
                  </div>
                </div>
                <h3>Dica:</h3>
                <p>
                  Considere o array: <br /> int[] numeros = &#123;5, 2, 8, 4,
                  2&#125;; <br /> double divisor = 6.0;
                </p>
              </div>
              <div className="juiz-hint-card juiz-cyan-theme">
                <div className="juiz-card-header">
                  <div className="juiz-icon-box">
                    <Lightbulb size={20} color="#00eaff" />
                  </div>
                </div>
                <h3>Saída:</h3>
                <p>
                  O código deve ter a seguinte saída exata: <br /> 21 <br /> 1.5
                </p>
              </div>
            </div>

            <div className="juiz-side-container">
              <img
                src={image2}
                alt="Linguagens"
                className="juiz-floating-img"
              />
            </div>
          </div>
        </section>

        {/* Formulário de Envio */}
        <section className="juiz-submission-section">
          <div className="juiz-form-card">
            <h2 className="juiz-form-title">ENVIO DO CÓDIGO</h2>

            <div className="juiz-form-divider-top">
              <div className="juiz-arrow-right"></div>
            </div>

            <form className="juiz-submission-form" onSubmit={handleSubmit}>
              <div className="juiz-input-row">
                <div className="juiz-input-group">
                  <label>Nome da equipe</label>
                  <input
                    type="text"
                    placeholder="Nome da equipe:"
                    name="team"
                    value={formData.team}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="juiz-input-group">
                  <label>Nome do líder</label>
                  <input
                    type="text"
                    placeholder="Nome da Lider:"
                    name="leader"
                    value={formData.leader}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="juiz-input-group full-width">
                <label>Linguagem escolhida</label>
                <input type="text" placeholder="Linguagem escolhida:" />
              </div>

              <div className="juiz-form-divider-bottom">
                <div className="juiz-arrow-left"></div>
              </div>

              <div className="juiz-form-actions">
                <label className="juiz-attach-btn">
                  ANEXAR ARQUIVOS <span className="juiz-upload-icon">↑</span>
                  <input
                    id="file-input"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    hidden
                  />
                </label>

                <button
                  type="submit"
                  className="juiz-submit-btn"
                  disabled={sended}
                >
                  {sended ? "ENVIANDO..." : "ENVIAR"}
                </button>
              </div>
            </form>

            {message && console.log(message)}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
