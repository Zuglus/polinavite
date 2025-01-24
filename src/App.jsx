import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PortfolioSection from './components/PortfolioSection';
import Header from './components/Header';
import { projects } from './components/Modal/ProjectsData';
import Footer from './components/Footer';
import ProjectModal from './components/Modal/ProjectModal';

// Вынесем стили блокировки скролла в константы
const SCROLL_LOCK_STYLES = {
  LOCKED: {
    position: 'fixed',
    width: '100%',
    overflowY: 'hidden'
  },
  UNLOCKED: {
    position: '',
    width: '',
    overflowY: ''
  }
};

const useLockBodyScroll = (isLocked) => {
  useEffect(() => {
    let scrollY = 0;

    if (isLocked) {
      scrollY = window.scrollY;
      Object.assign(document.body.style, SCROLL_LOCK_STYLES.LOCKED);
      document.body.style.top = `-${scrollY}px`;
    }

    return () => {
      Object.assign(document.body.style, SCROLL_LOCK_STYLES.UNLOCKED);
      window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
};

const App = () => {
  useEffect(() => {
    projects.forEach(project => {
      project.slides.slice(0, 3).forEach(slide => {
        const img = new Image();
        img.src = slide.image;
        img.loading = 'eager';
      });
    });
  }, []);
  const [openModalId, setOpenModalId] = useState(null);
  useLockBodyScroll(openModalId !== null);

  const handleCardClick = (id) => setOpenModalId(id);
  const handleCloseModal = () => setOpenModalId(null);

  const currentProject = projects.find(p => p.id === openModalId) || null;

  return (
    <div className="bg-primary text-white min-h-screen">
      <Header />
      <PortfolioSection onCardClick={handleCardClick} />
      <Footer />

      <AnimatePresence>
        {openModalId !== null && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
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