import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { baseUrl } from "../../services/api";

import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import Circle from "../../Components/jsx/circle";
import sapoImg from "../../assets/img/sapobone.png";

import "../css/senha.css"; // Reutiliza os estilos da tela de senha base

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Captura o token UUID da URL
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!newPassword || !confirmPassword) {
      setErrorMessage("Preencha todos os campos!");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("As senhas não coincidem!");
      return;
    }

    try {
      setLoading(true);

      // CORREÇÃO DA REQUISIÇÃO: Mudamos de Axios para o 'fetch' padrão que seu projeto usa!
      // Enviando a chave "newPassword" exatamente como o seu AuthController espera receber no Map
      const response = await fetch(
        `${baseUrl}/auth/reset-password?token=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newPassword: newPassword,
          }),
        },
      );

      // Como o fetch não joga o erro pro catch em respostas 400/500, tratamos manualmente:
      if (!response.ok) {
        // Tenta ler a mensagem de erro vinda do Spring Boot, se houver
        try {
          const errorData = await response.json();
          throw new Error(errorData.message || "Token inválido ou expirado.");
        } catch (jsonError) {
          throw new Error(
            "Token inválido ou expirado. Solicite uma nova recuperação.",
          );
        }
      }

      alert("Senha redefinida com sucesso!");
      navigate("/login"); // Redireciona o usuário para o login
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="PageWrapper">
      <div className="App login-container">
        <Header />

        {/* Efeitos de Fundo Neon */}
        <div className="recovery-circle">
          <Circle size={500} variant="cyan" className="recovery-circle-left" />
          <Circle size={400} variant="cyan" className="recovery-circle-right" />
        </div>

        <main className="login-main">
          <section className="login-card recovery-card">
            <div className="login-content">
              {/* Lado Esquerdo: Mascote */}
              <div className="login-mascot-container">
                <img
                  src={sapoImg}
                  alt="Mascote CodeplaC"
                  className="mascot-img"
                />
              </div>

              {/* Lado Direito: Formulário de Redefinição */}
              <div className="login-form-container">
                <h1 className="login-title uppercase">NOVA SENHA</h1>
                <div className="title-underline"></div>

                <p className="recovery-instruction">
                  DIGITE SUA NOVA SENHA DE ACESSO <br />E CONFIRME ABAIXO.
                </p>

                <form className="login-form" onSubmit={handleSubmit}>
                  <div className="login-input-group">
                    <label>NOVA SENHA</label>
                    <input
                      type="password"
                      name="newPassword"
                      placeholder="Digite sua nova senha"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>

                  <div
                    className="login-input-group"
                    style={{ marginTop: "15px" }}
                  >
                    <label>CONFIRMAR SENHA</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirme sua nova senha"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  {errorMessage && (
                    <div
                      style={{
                        color: "#ff4d4d",
                        fontSize: "14px",
                        marginTop: "15px",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn-login btn-send"
                    style={{ marginTop: "20px" }}
                    disabled={loading}
                  >
                    {loading ? "ALTERANDO..." : "REDEFINIR SENHA"}
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default ResetPassword;
