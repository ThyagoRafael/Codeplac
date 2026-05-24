import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import Circle from "../../Components/jsx/circle";
import GaleriaCarrosel from "../../Components/jsx/GaleriaCarrosel";

import "../css/galeria.css";

import imgC1 from "../../assets/img/fotopalestra.png";
import imgC2 from "../../assets/img/fotodopovofotopalestrante.png";
import imgP1 from "../../assets/img/Auditoriocheio.png";
import imgP2 from "../../assets/img/palestraNBDSAaskdASDkas.png";
import imgP3 from "../../assets/img/fotoprofessorcompalestrante.png";
import imgCM1 from "../../assets/img/fotoequipe2024.png";
import imgCM2 from "../../assets/img/fotoequipe20242.png";
import imgCM3 from "../../assets/img/fotocompeticao1.jpeg";
import imgCM4 from "../../assets/img/fotocompeticao2.jpeg";
import imgCM5 from "../../assets/img/fotocompeticao3.jpeg";



export default function Galeria() {
  const [modalContext, setModalContext] = useState({
    isOpen: false,
    list: [],
    startIndex: 0,
  });

  // 2. DEFINA A LISTA DE IMAGENS AQUI
  const fotosCompeticao = [imgCM1, imgCM2, imgCM3, imgCM4, imgCM5];
  const fotosPalestras = [imgC1, imgC2, imgP1, imgP2, imgP3];

  const openModal = (list, index) => {
    setModalContext({ isOpen: true, list, startIndex: index });
  };

  const closeModal = () => {
    setModalContext({ ...modalContext, isOpen: false });
  };

  return (
    <div className="gal-page-wrapper">
      <div className="galeria-circle">
        <Circle size={420} variant="purple" className="galeria-circle-1" />
        <Circle size={360} variant="cyan" className="galeria-circle-2" />
      </div>

      <Header />
      <main className="gal-main">
        <section className="gal-hero">
          <h1 className="gal-title">Galeria</h1>
          <p className="gal-subtitle">
            DEIXE-SE INSPIRAR E REVIVA A MAGIA QUE TRAZ VIDA À NOSSA PLATAFORMA.
          </p>
        </section>

        <section className="gal-glass-box">
          <div className="gal-content">
            <h2 className="gal-event-title">CODEPLAC DE 2024 à 2026</h2>

            <GaleriaCarrosel
              carouselId="competicao"
              title="COMPETIÇÃO"
              imagens={fotosCompeticao}
              variant="cyan"
              onSelectImage={(img) =>
                openModal(fotosCompeticao, fotosCompeticao.indexOf(img))
              }
            />

            <GaleriaCarrosel
              carouselId="palestras"
              title="PALESTRAS"
              imagens={fotosPalestras}
              variant="purple"
              onSelectImage={(img) =>
                openModal(fotosPalestras, fotosPalestras.indexOf(img))
              }
            />
          </div>
        </section>
      </main>

      <Footer />

      <AnimatePresence>
        {modalContext.isOpen && (
          <motion.div
            className="gal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <button className="gal-modal-x" onClick={closeModal}>
              <X size={40} strokeWidth={1.5} />
            </button>

            <motion.div
              className="gal-modal-view"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="gal-modal-arrow prev">
                <ChevronLeft size={48} />
              </button>
              <button className="gal-modal-arrow next">
                <ChevronRight size={48} />
              </button>

              <Swiper
                modules={[Navigation]}
                navigation={{
                  prevEl: ".gal-modal-arrow.prev",
                  nextEl: ".gal-modal-arrow.next",
                }}
                initialSlide={modalContext.startIndex}
                className="gal-modal-swiper"
              >
                {modalContext.list.map((src, idx) => (
                  <SwiperSlide key={idx} className="gal-slide-item">
                    <img src={src} alt={`Slide ${idx}`} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
