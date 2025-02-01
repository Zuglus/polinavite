import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { observable } from '@legendapp/state';
import { useSelector } from '@legendapp/state/react';

import PortfolioSection from '../PortfolioSection';
import Header from '../Header';
import Footer from '../Footer';
import ProjectModal from '../Modal/ProjectModal';
import { projects } from '../Modal/ProjectsData';

// Создаем глобальное состояние
const appState = observable({
  modalId: null,
  currentProject: null
});

const ANIMATION_CONFIG = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};

const useLockBodyScroll = (isLocked) => {
  useEffect(() => {
    if (!isLocked) return;

    const scrollY = window.scrollY;
    const originalStyle = {
      position: document.body.style.position,
      width: document.body.style.width,
      overflowY: document.body.style.overflowY,
      top: document.body.style.top
    };

    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.overflowY = 'hidden';
    document.body.style.top = `-${scrollY}px`;

    return () => {
      Object.assign(document.body.style, originalStyle);
      window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
};

const App = () => {
  // Используем селектор для получения значений
  const modalId = useSelector(() => appState.modalId.get());
  const currentProject = useSelector(() => appState.currentProject.get());

  useEffect(() => {
    projects.forEach(project => {
      project.slides.slice(0, 3).forEach(slide => {
        const img = new Image();
        img.src = slide.image;
        img.loading = 'eager';
      });
    });
  }, []);

  useLockBodyScroll(modalId !== null);

  const handleCardClick = (id) => {
    const project = projects.find(p => p.id === id);
    
    appState.modalId.set(id);
    appState.currentProject.set(project);
  };

  const handleCloseModal = () => {
    appState.modalId.set(null);
    appState.currentProject.set(null);
  };

  return (
    <div className="bg-primary text-white min-h-screen">
      <Header />
      <PortfolioSection onCardClick={handleCardClick} />
      <Footer />

      <AnimatePresence>
        {modalId !== null && (
          <motion.div
            key="modal"
            {...ANIMATION_CONFIG}
          >
            <ProjectModal
              project={currentProject}
              onClose={handleCloseModal}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;