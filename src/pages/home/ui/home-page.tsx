import React from 'react';
import { observer } from '@legendapp/state/react';
import { Header, Footer } from '@shared/ui';
import { PortfolioSection } from '@widgets/portfolio';
import { ResumeSection } from '@widgets/resume';
import { ExperienceSection } from '@widgets/experience';
import { ProjectModal } from '@features/project-modal';
import { useLockBodyScroll } from '@shared/lib/hooks';
import { modalStore } from '@shared/model/stores/modal-store';
import { projects } from '@shared/config/projects-data';
import { AnimatePresence } from 'framer-motion';
import { Meta } from '@shared/ui/meta/meta';

/**
 * Компонент домашней страницы
 * Объединяет все основные разделы портфолио
 */
const HomePage: React.FC = observer(() => {
  // Получаем состояние модального окна
  const isModalOpen = modalStore.useIsOpen();
  const currentProject = modalStore.useCurrentProject();

  // Блокируем прокрутку при открытом модальном окне
  useLockBodyScroll(isModalOpen);

  // Обработчик клика по карточке проекта
  const handleCardClick = (id: string) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      modalStore.openModal(id, project);
    }
  };

  // Обработчик закрытия модального окна
  const handleCloseModal = () => {
    modalStore.closeModal();
  };

  return (
    <div className="bg-primary text-white min-h-screen">
      {/* Мета-теги для SEO */}
      <Meta
        title="Полина Мигранова | Графический дизайнер"
        description="Портфолио графического дизайнера Полины Миграновой. Создание современного дизайна, брендинг, иллюстрации и веб-дизайн."
      />
      
      {/* Шапка сайта */}
      <Header />
      
      {/* Основные разделы */}
      <PortfolioSection onCardClick={handleCardClick} />
      
      {/* Подвал сайта */}
      <Footer />
      
      {/* Модальное окно проекта */}
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