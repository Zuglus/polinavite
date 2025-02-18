// src/App.jsx
import React, { useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { observer } from '@legendapp/state/react';

// UI Components
import { Header, Footer } from '@/components/ui';

// Stores and Services
import { modalStore } from '@/stores';
import { imageService } from '@/services';

// Data
import { projects } from '@/constants/projectsData';

// Hooks
import { useLockBodyScroll } from '@/hooks';

// Ленивая загрузка компонентов
const PortfolioSection = React.lazy(() => 
  import('@/components/features/Portfolio').then(module => ({
    default: module.PortfolioSection
  }))
);

const ProjectModal = React.lazy(() => 
  import('@/components/features/Modal').then(module => ({
    default: module.ProjectModal
  }))
);

// Компонент для отображения во время загрузки
const ComponentLoader = () => (
  <div className="w-full h-32 animate-pulse bg-white/5 rounded-lg" />
);

const App = observer(() => {
  const isModalOpen = modalStore.useIsOpen();
  const currentProject = modalStore.useCurrentProject();

  useEffect(() => {
    // Предзагрузка только первых трех изображений для каждого проекта
    const imageUrls = projects
      .map(project => project.slides.slice(0, 3)
      .map(slide => slide.image))
      .flat();

    imageService.preloadImages(imageUrls);
  }, []);

  useLockBodyScroll(isModalOpen);

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
      
      <Suspense fallback={<ComponentLoader />}>
        <PortfolioSection onCardClick={handleCardClick} />
      </Suspense>
      
      <Footer />
      
      <AnimatePresence>
        {isModalOpen && currentProject && (
          <Suspense fallback={<ComponentLoader />}>
            <ProjectModal 
              project={currentProject} 
              onClose={handleCloseModal} 
            />
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
});

export default App;