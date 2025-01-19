import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PortfolioSection from './components/PortfolioSection';
import Header from './components/Header';
import ResumeSection from './components/ResumeSection';
import { projects } from './components/Modal/ProjectsData';
import ExperienceSection from './components/ExperienceSection';
import Footer from './components/Footer';
import ProjectModal from './components/Modal/ProjectModal';

const useLockBodyScroll = (isLocked) => {
  useEffect(() => {
    if (isLocked) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.overflowY = 'hidden';
    } else {
      const scrollY = parseInt(document.body.style.top || '0', 10);
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.body.style.overflowY = '';
      window.scrollTo(0, scrollY * -1);
    }
  }, [isLocked]);
};

const App = () => {
  const [openModalId, setOpenModalId] = useState(null);
  useLockBodyScroll(openModalId !== null);

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
            key="modal"
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