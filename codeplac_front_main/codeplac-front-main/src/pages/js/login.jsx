import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import Circle from "../../Components/jsx/circle";
import sapoImg from "../../assets/img/sapobone.png";
import { loginUser } from "../../services/authService";

function Login() {
  const [formData, setFormData] = useState({
    cpf: "",
    password: "",
    tipo: "PARTICIPANT", // Valor inicial padrão
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.cpf || !formData.password) {
      setErrorMessage("Preencha todos os campos!");
      return;
    }

    try {
      setLoading(true);
      const data = await loginUser(formData);

      localStorage.setItem(
        "user",
        JSON.stringify({
          cpf: data.cpf,
          token: data.token,
          role: data.role,
        }),
      );

      window.dispatchEvent(new Event("storage"));
      alert("Login realizado com sucesso!");

      if (data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/perfil");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || "CPF ou senha inválidos!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="PageWrapper">
      <div className="App login-container">
        <Header />
        <div className="login-background-effects">
          <Circle size={500} variant="cyan" className="login-circle-left" />
          <Circle size={400} variant="cyan" className="login-circle-right" />
        </div>
        <main className="login-main">
          <section className="login-card">
            <div className="login-content">
              <div className="login-mascot-container">
                <img
                  src={sapoImg}
                  alt="Mascote CodeplaC"
                  className="mascot-img"
                />
              </div>
              <div className="login-form-container">
                <h1 className="login-title">ACESSE SUA CONTA</h1>
                <div className="title-underline"></div>
                <form className="login-form" onSubmit={handleSubmit}>
                  <div className="login-input-group">
                    <label>TIPO DE CONTA</label>
                    <select
                      name="tipo"
                      value={formData.tipo}
                      onChange={handleInputChange}
                    >
                      <option value="PARTICIPANT">USUÁRIO</option>
                      <option value="ADMIN">ADMINISTRADOR</option>
                    </select>
                  </div>
                  <div className="login-input-group">
                    <label>CPF</label>
                    <input
                      type="text"
                      name="cpf"
                      placeholder="000.000.000-00"
                      value={formData.cpf}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="login-input-group">
                    <label>SENHA</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="********"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  {errorMessage && (
                    <div
                      style={{
                        color: "#ff4d4d",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {errorMessage}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="btn-login"
                    disabled={loading}
                  >
                    {loading ? "ENTRANDO..." : "LOGIN"}
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

export default Login;
