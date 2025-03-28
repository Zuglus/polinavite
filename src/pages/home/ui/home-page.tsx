// src/pages/home/ui/home-page.tsx
import React from 'react';
import { observer } from '@legendapp/state/react';
import { Header, Footer } from '@shared/ui';
import { PortfolioSection } from '@widgets/portfolio';
import { ResumeSection } from '@widgets/resume';
import { ExperienceSection } from '@widgets/experience';
import { ProjectModal } from '@features/project-modal';
import { useLockBodyScroll } from '@shared/lib/hooks';
import { modalStore } from '@shared/model/stores/modal-store';
import { projects } from '@shared-config/projects-data';
import { AnimatePresence } from 'framer-motion';

/**
 * Компонент домашней страницы
 * Объединяет все основные разделы портфолио
 */
const HomePage: React.FC = observer(() => {
  const isModalOpen = modalStore.useIsOpen();
  const currentProject = modalStore.useCurrentProject();

  useLockBodyScroll(isModalOpen);

  const handleCardClick = (id: string) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      modalStore.openModal(id, project);
    }
  };

  const handleCloseModal = () => {
    modalStore.closeModal();
  };

  return (
    <div className="bg-primary text-white min-h-screen">
      <Header />
      
      <PortfolioSection onCardClick={handleCardClick} />
      <ResumeSection />
      <ExperienceSection />
      
      <Footer />
      
      <AnimatePresence>
        {isModalOpen && currentProject && (
          <ProjectModal 
            project={currentProject} 
            onClose={handleCloseModal} 
          />
        )}
      </AnimatePresence>
    </div>
  );
});

export default HomePage;