import React, { useState } from "react";
import "../css/juiz.css";

import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import Circle from "../../Components/jsx/circle";
import enfeiteImg from "../../assets/img/enfeite.png";

// Importando ícones para usar dentro das dicas (estilo home)
import { Lightbulb, Terminal } from "lucide-react";

import image2 from "../../assets/img/img2.png";

export default function Juiz() {
  // ESTADOS DO FORMULÁRIO
  const [nomeEquipe, setNomeEquipe] = useState("");
  const [nomeLider, setNomeLider] = useState("");
  const [linguagem, setLinguagem] = useState(""); // Mantido do design original
  const [numeroCodigo, setNumeroCodigo] = useState(1);
  const [codigoText, setCodigoText] = useState("");
  const [fileName, setFileName] = useState("");

  // LÓGICA DE LEITURA DO ARQUIVO
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setCodigoText(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  // ENVIO DOS DADOS AO BACKEND
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nomeEquipe || !nomeLider || !codigoText || !numeroCodigo) {
      alert(
        "Por favor, preencha todos os campos obrigatórios e anexe o arquivo.",
      );
      return;
    }

    const payload = {
      nomeEquipe: nomeEquipe,
      numeroCodigo: Number(numeroCodigo),
      nomeLider: nomeLider,
      codigo: codigoText,
      fileName: fileName,
      // O banco de dados exige esse hash. Mude depois para a lógica real da sua aplicação.
      teamHash: "hash-padrao-provisorio",
    };

    try {
      const response = await fetch("https://www.codeplac.com.br/juiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Código enviado com sucesso!");
        // Limpar form
        setNomeEquipe("");
        setNomeLider("");
        setLinguagem("");
        setNumeroCodigo(1);
        setFileName("");
        setCodigoText("");
      } else {
        alert("Erro ao enviar o código.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro de conexão com o servidor.");
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

            <div className="juiz-side-container">
              <img
                src={image2}
                alt="Linguagens"
                className="juiz-floating-img"
              />
            </div>

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
                    required
                    value={nomeEquipe}
                    onChange={(e) => setNomeEquipe(e.target.value)}
                  />
                </div>
                <div className="juiz-input-group">
                  <label>Nome do líder</label>
                  <input
                    type="text"
                    required
                    value={nomeLider}
                    onChange={(e) => setNomeLider(e.target.value)}
                  />
                </div>
              </div>

              {/* Mantive o formato dos inputs agrupados iguais aos seus */}
              <div className="juiz-input-row">
                <div className="juiz-input-group full-width">
                  <label>Linguagem escolhida</label>
                  <input
                    type="text"
                    placeholder="Ex: Java, C++"
                    value={linguagem}
                    onChange={(e) => setLinguagem(e.target.value)}
                  />
                </div>

                {/* Adicionado ao lado para capturar o numeroCodigo que o BD exige */}
                <div className="juiz-input-group full-width">
                  <label>Número do Código (1 a 4)</label>
                  <input
                    type="number"
                    min="1"
                    max="4"
                    required
                    value={numeroCodigo}
                    onChange={(e) => setNumeroCodigo(e.target.value)}
                  />
                </div>
              </div>

              <div className="juiz-form-divider-bottom">
                <div className="juiz-arrow-left"></div>
              </div>

              <div className="juiz-form-actions">
                <label className="juiz-attach-btn">
                  {fileName ? `ANEXADO: ${fileName}` : "ANEXAR ARQUIVOS"}{" "}
                  <span className="juiz-upload-icon">↑</span>
                  <input
                    type="file"
                    hidden
                    accept=".c,.cpp,.java,.txt"
                    onChange={handleFileUpload}
                  />
                </label>

                <button type="submit" className="juiz-submit-btn">
                  ENVIAR
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
