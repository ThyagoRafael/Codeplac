import React from "react";
import { Link } from "react-router-dom";

// Componentes
import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import EquipeCard from "../../Components/jsx/EquipeCard";
import Circle from "../../Components/jsx/circle";

// Assets
import fotoPedro from "../../assets/img/profpedro.jpeg";
import fotoagatha from "../../assets/img/agatha.jpeg";
import fotothaline from "../../assets/img/fotothaline.jpeg";
import fotopedroj from "../../assets/img/fotopedro.jpeg";
import fotoarthur from "../../assets/img/arthurTavares.jpeg";
import fotoemerson from "../../assets/img/emerson.jpeg";
import fotomavi from "../../assets/img/mavi.jpeg";
import fotogiovanna from "../../assets/img/giovannafoto.jpeg";
import fotocoordenador from "../../assets/img/coordenador.jpeg";
import fotorhawan from "../../assets/img/rhawanfoto.jpeg";
import fotopablo from "../../assets/img/fotopablo.jpg";
import fotothiago from "../../assets/img/fotothiago.jpg";
import fotojulio from "../../assets/img/fotojulio.png";
import fotodiogo from "../../assets/img/diogofoto.png";
import fotogabriel from "../../assets/img/gabrielfoto.png";
import fotokimberly from "../../assets/img/kimberlyfoto.png";
import fotogidelmar from "../../assets/img/gidelmarfoto.jpeg";

// CSS
import "../css/equipe.css";

export function Equipe() {
  // Cores padronizadas da sua identidade visual
  const cores = {
    ciano: "#2bc4d9",
    roxo: "#a45ee5",
  };

  // Organização dos dados por seções para facilitar a renderização
  const dadosEquipe = {
    ceos: [
      {
        id: 1,
        nome: "Prof M.Sc Pedro Manoel",
        funcao: "CEO",
        foto: fotoPedro,
        cor: cores.ciano,
      },
      {
        id: 2,
        nome: "Washington Fábio de S. Ribeiro",
        funcao: "CEO",
        foto: fotocoordenador,
        cor: cores.ciano,
      },
    ],
    coFundadora: [
      {
        id: 3,
        nome: "Ágatha Ariell",
        funcao: "Co-Fundadora",
        foto: fotoagatha,
        cor: cores.roxo,
      },
    ],
    desenvolvedores: [
      {
        id: 4,
        nome: "Gabriel Haddad Soares Brandão",
        funcao: "Desenvolvedor backend",
        foto: fotogabriel,
        cor: cores.ciano,
      },
      {
        id: 5,
        nome: "Pedro Júlio Borges Barreto",
        funcao: "Desenvolvedor fullstack e Docker",
        foto: fotopedroj,
        cor: cores.ciano,
      },
      {
        id: 6,
        nome: "Julio César Soares de Lima",
        funcao: "Desenvolvedor backend ",
        foto: fotojulio,
        cor: cores.ciano,
      },
      {
        id: 7,
        nome: "Pablo Carvalho Silva",
        funcao: "Administrador de DBA",
        foto: fotopablo,
        cor: cores.ciano,
      },
      {
        id: 8,
        nome: "Thaline Thais Teles da Silva",
        funcao: "Desenvolvedora frontend",
        foto: fotothaline,
        cor: cores.roxo,
      },
      {
        id: 9,
        nome: "Maria Vitória Soares da Silva",
        funcao: "Documentação",
        foto: fotomavi,
        cor: cores.roxo,
      },
      {
        id: 10,
        nome: "Gidelmar Sousa Silva Júnior",
        funcao: "Desenvolvedor frontend",
        foto: fotogidelmar,
        cor: cores.roxo,
      },
      {
        id: 11,
        nome: "Thawan Campos",
        funcao: "DevOps e infraestrutura",
        foto: fotoPedro,
        cor: cores.roxo,
      },
      {
        id: 12,
        nome: "Rhawan Henrique de Jesus Moura",
        funcao: "Desenvolvedor frontend",
        foto: fotorhawan,
        cor: cores.ciano,
      },
      {
        id: 13,
        nome: "Geovanne Formiga Dantas Junior",
        funcao: "Designer e Artista",
        foto: fotoPedro,
        cor: cores.ciano,
      },
      {
        id: 14,
        nome: "Thyago Rafael de Carvalho",
        funcao: "Desenvolvedor backend",
        foto: fotothiago,
        cor: cores.ciano,
      },
      {
        id: 15,
        nome: "Arthur Tavares Mendonça",
        funcao: "Desenvolvedor backend",
        foto: fotoarthur,
        cor: cores.ciano,
      },
      {
        id: 16,
        nome: "Kimberly Campos de Faria Cruz",
        funcao: "Desenvolvedora frontend",
        foto: fotokimberly,
        cor: cores.roxo,
      },
      {
        id: 17,
        nome: "Diogo Lopes Gomes",
        funcao: "Administrador de DBA",
        foto: fotodiogo,
        cor: cores.roxo,
      },
      {
        id: 18,
        nome: "Emerson Gonçalves Grangeiro",
        funcao: "DevOps e Desenvolvedor Backend",
        foto: fotoemerson,
        cor: cores.roxo,
      },
      {
        id: 19,
        nome: "Lucas Henrique Gonçalves Souto",
        funcao: "Desenvolvedor backend",
        foto: fotoPedro,
        cor: cores.roxo,
      },
      {
        id: 20,
        nome: "Felipe Eduardo de Souza Araújo",
        funcao: "Desenvolvedor backend",
        foto: fotoPedro,
        cor: cores.roxo,
      },
    ],
    exColaboradores: [
      {
        id: 21,
        nome: "Giovanna Rocha",
        funcao: "Co-Fundadora",
        foto: fotogiovanna,
        cor: cores.ciano,
      },
    ],
  };

  const RenderSeção = (titulo, lista, corTitulo) => (
    <section className="equipe-secao">
      <h2 style={{ color: corTitulo }}>{titulo}</h2>
      <div className="equipe-grid">
        {lista.map((membro) => (
          <EquipeCard
            key={membro.id}
            nome={membro.nome}
            funcao={membro.funcao}
            foto={membro.foto}
            linkCurriculo="#"
            corBorda={membro.cor}
          />
        ))}
      </div>
    </section>
  );

  return (
    <div className="equipe-page-wrapper">
      <div className="equipe-circle">
        <Circle size={420} variant="purple" className="equipe-circle-1" />
        <Circle size={360} variant="cyan" className="equipe-circle-2" />
        <Circle size={360} variant="purple" className="equipe-circle-3" />
        <Circle size={420} variant="cyan" className="equipe-circle-4" />
      </div>

      <div className="glow purple 1"></div>
      <div className="glow cyan 1"></div>
      <div className="glow purple 2"></div>
      <div className="glow cyan 2"></div>

      <Header />

      <main className="equipe-content">
        <header className="equipe-header-text">
          <h1>Equipe</h1>
          <p>
            Administradores, gerenciadores, desenvolvedores e colaboradores do
            projeto!
          </p>
        </header>

        {RenderSeção("CEOS", dadosEquipe.ceos, cores.ciano)}
        {RenderSeção("CO-FUNDADORA", dadosEquipe.coFundadora, cores.roxo)}
        {RenderSeção(
          "DESENVOLVEDORES",
          dadosEquipe.desenvolvedores,
          cores.ciano,
        )}
        {RenderSeção(
          "EX-COLABORADORES",
          dadosEquipe.exColaboradores,
          cores.ciano,
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Equipe;
