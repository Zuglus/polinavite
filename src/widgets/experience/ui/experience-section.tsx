import React from 'react';
import { ExperienceItem } from '@entities/experience';
import { Experience } from '@shared/model/types';
import circleImage from '@app/assets/images/kruzhok_opyt_raboty.svg';

/**
 * Компонент секции с опытом работы
 */
const ExperienceSection: React.FC = () => {

  // Данные об опыте работы
  const experienceData: Experience[] = [
    {
      year: '2023-2024',
      company: 'Центр Педагогического Мастерства',
      position: 'Графический дизайнер',
      duties: ['Фирменный стиль', 'SMM-дизайн (соцсети)', 'Презентации', 'Полиграфия'],
      circleImage: circleImage,
    },
    {
      year: '2021-2022',
      company: 'Банк УБРиР',
      position: 'Ведущий дизайнер отдела коммуникаций',
      duties: ['Презентации', 'Коммуникационный дизайн', 'Полиграфия'],
    },
  ];

  return (
    <section className="relative mx-auto px-4 py-[0.75rem] max-w-[75rem]">
      <div className="absolute top-3/4 left-1/2 w-[56rem] md:w-auto -translate-x-[35.7rem] md:-translate-x-[23rem] overflow-hidden">
      </div>

      {experienceData.map((item) => (
        <ExperienceItem key={item.year} experience={item} />
      ))}
    </section>
  );
};

export default ExperienceSection;