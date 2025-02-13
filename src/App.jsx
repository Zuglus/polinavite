import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from '@legendapp/state/react';

// Features
import { PortfolioSection } from '@/components/features/Portfolio';
import { ProjectModal } from '@/components/features/Modal';

// UI Components
import { Header, Footer } from '@/components/ui';

// Stores and Services
import { modalStore } from '@/stores';
import { imageService } from '@/services';

// Data
import { projects } from '@/constants/ProjectsData';

// Hooks
import { useLockBodyScroll } from '@/hooks';

const ANIMATION_CONFIG = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};

const App = () => {
  const modalId = useSelector(() => modalStore.modalId.get());
  const currentProject = useSelector(() => modalStore.currentProject.get());

  useEffect(() => {
    const imageUrls = projects
      .map(project => project.slides.slice(0, 3)
      .map(slide => slide.image))
      .flat();

    imageService.preloadImages(imageUrls);
  }, []);

  useLockBodyScroll(modalId !== null);

  const handleCardClick = (id) => {
    const project = projects.find(p => p.id === id);
    modalStore.openModal(id, project);
  };

  const handleCloseModal = () => {
    modalStore.closeModal();
  };

  return (
    <div className="bg-primary text-white min-h-screen">
      <Header />
      <PortfolioSection onCardClick={handleCardClick} />
      <Footer />
      <AnimatePresence>
        {modalId !== null && (
          <motion.div key="modal" {...ANIMATION_CONFIG}>
            <ProjectModal project={currentProject} onClose={handleCloseModal} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;