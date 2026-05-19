import { useEffect, useState } from "react";
import {
  User,
  Edit3,
  Save,
  Camera,
  History,
  FileText,
  LogOut,
} from "lucide-react";
import "../css/perfil.css";
import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import Circle from "../../Components/jsx/circle";
import { useNavigate } from "react-router-dom";
import { getUserByCpf, updateUser } from "../../services/userService";
import { capitalize } from "../../utils/capitalize";
import { getChangedFields } from "../../utils/getChangedFields";

function Perfil() {
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState({});
  const [userData, setUserData] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    fotoPerfil: "",
  });
  const [userAvatar, setUserAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const savedUserString = localStorage.getItem("user");
  const savedUser = savedUserString ? JSON.parse(savedUserString) : null;

  useEffect(() => {
    const loadUserData = async () => {
      if (!savedUser || !savedUser.cpf || !savedUser.token) {
        return navigate("/login");
      }

      try {
        const data = await getUserByCpf(savedUser.cpf, savedUser.token);
        setUserData(data);
        setOriginalData({ ...data });
        if (data.fotoPerfil) setUserAvatar(data.fotoPerfil);
      } catch (error) {
        alert("Erro ao carregar informações. Faça o login novamente!");
        navigate("/login");
      }
    };
    loadUserData();
  }, [navigate, savedUser, savedUser.cpf, savedUser.token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserAvatar(reader.result);
        setUserData((prev) => ({ ...prev, fotoPerfil: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const changedFields = getChangedFields(originalData, userData);
    if (Object.keys(changedFields).length === 0) {
      alert("Não há mudanças!");
      setIsEditing(false);
      return;
    }

    try {
      setLoading(true);
      const data = await updateUser(
        savedUser.cpf,
        savedUser.token,
        changedFields,
      );
      setOriginalData(data);
      setIsEditing(false);
      alert("Salvo com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar o usuário!");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Deseja realmente sair da sua conta?")) {
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("storage"));
      navigate("/");
    }
  };

  return (
    <div className="profile-page-wrapper">
      <div className="profile-container">
        <Header />
        <div className="profile-bg-effects">
          <Circle
            size={400}
            variant="purple"
            className="profile-circle-top-l"
          />
          <Circle size={450} variant="cyan" className="profile-circle-mid-r" />
        </div>

        <main className="profile-main-content">
          <section className="profile-card-box">
            <div className="profile-user-header">
              <div className="profile-avatar-container">
                <div className="profile-avatar-placeholder">
                  {userAvatar ? (
                    <img
                      src={userAvatar}
                      alt="Avatar"
                      className="profile-avatar-img"
                    />
                  ) : (
                    <User size={60} color="#00EAFF" />
                  )}
                  {isEditing && (
                    <label className="profile-upload-label">
                      <Camera size={20} />
                      <input
                        type="file"
                        hidden
                        onChange={handleImageUpload}
                        accept="image/*"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="profile-user-info">
                <div className="profile-info-top">
                  {isEditing ? (
                    <input
                      type="text"
                      name="nome"
                      value={capitalize(userData.nome || "")}
                      onChange={handleInputChange}
                      className="profile-input-name"
                    />
                  ) : (
                    <h1 className="profile-username">
                      {capitalize(userData.nome || "")}
                    </h1>
                  )}
                  <button
                    className={`profile-btn-edit ${isEditing ? "save" : ""}`}
                    onClick={isEditing ? handleSave : () => setIsEditing(true)}
                    disabled={loading}
                  >
                    {isEditing ? (
                      <>
                        <Save size={14} /> SALVAR
                      </>
                    ) : (
                      <>
                        <Edit3 size={14} /> EDIT
                      </>
                    )}
                  </button>
                </div>

                <div className="profile-details-grid">
                  <div className="profile-detail-item">
                    <strong>E-MAIL: </strong>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={userData.email || ""}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <span>{userData.email}</span>
                    )}
                  </div>
                  <div className="profile-detail-item">
                    <strong>CPF: </strong> <span>{userData.cpf}</span>
                  </div>
                  <div className="profile-detail-item">
                    <strong>TELEFONE: </strong>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="telefone"
                        value={userData.telefone || ""}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <span>{userData.telefone}</span>
                    )}
                  </div>
                </div>

                {/* BOTÃO DE LOGOUT ADICIONADO */}
                <button onClick={handleLogout} className="btn-logout">
                  <LogOut size={16} /> SAIR DA CONTA
                </button>
              </div>
            </div>

            <div className="profile-divider"></div>

            <div className="profile-events-grid">
              <div className="profile-event-card">
                <div className="profile-event-title">
                  <History size={20} color="#00EAFF" /> <h3>HISTÓRICO</h3>
                </div>
                <div className="profile-event-content">
                  <p>Sucesso na Era da IA</p>
                </div>
              </div>
              <div className="profile-event-card">
                <div className="profile-event-title">
                  <FileText size={20} color="#00EAFF" /> <h3>INSCRIÇÕES</h3>
                </div>
                <div className="profile-event-content">
                  <p>Sucesso na Era da IA</p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Perfil;
