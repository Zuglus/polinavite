import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PortfolioSection from './components/PortfolioSection';
import Header from './components/Header';
import ResumeSection from './components/ResumeSection';
import { projects } from './components/ProjectsData';
import ExperienceSection from './components/ExperienceSection';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';

const useLockBodyScroll = (isLocked) => {
  useEffect(() => {
    if (!isLocked) return;
    
    const scrollY = window.scrollY;
    const originalStyles = {
      position: document.body.style.position,
      width: document.body.style.width,
      top: document.body.style.top,
      overflowY: document.body.style.overflowY
    };

    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.position = originalStyles.position;
      document.body.style.width = originalStyles.width;
      document.body.style.top = originalStyles.top;
      document.body.style.overflowY = originalStyles.overflowY;
      window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
};

const App = () => {
  const [openModalId, setOpenModalId] = useState(null);
  useLockBodyScroll(openModalId !== null);

  // Используем useEffect вместо useRef
  useEffect(() => {
    const handleScrollLock = () => {
      if (openModalId !== null) {
        // Блокируем скролл
        const scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.overflowY = 'hidden';
      } else {
        // Разблокируем скролл
        const scrollY = parseInt(document.body.style.top || '0');
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        document.body.style.overflowY = '';
        window.scrollTo(0, -scrollY);
      }
    };

    handleScrollLock();

    return () => {
      // Очистка при размонтировании компонента
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.body.style.overflowY = '';
    }
  }, [openModalId]); // Зависимость от openModalId

  return (
    <div className="bg-primary text-white min-h-screen">
      <Header />
      <PortfolioSection onCardClick={(id) => setOpenModalId(id)} />
      {/* <ResumeSection /> */}
      {/* <ExperienceSection /> */}
      <Footer />

      <AnimatePresence>
        {openModalId !== null && (
          <motion.div
            key={openModalId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectModal
              project={projects.find((p) => p.id === openModalId)}
              onClose={() => setOpenModalId(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;