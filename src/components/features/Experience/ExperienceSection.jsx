// src/components/features/Experience/ExperienceSection.jsx
import React from 'react';
import { ExperienceItem } from '@features/Experience';
import circle from '@images/kruzhok_opyt_raboty.svg';
import buttonCircle from '@images/koltsa_fon1.svg';

const ExperienceSection = () => {
  const experienceData = [
    {
      year: '2023-2024',
      company: 'Центр Педагогического Мастерства',
      position: 'Графический дизайнер',
      duties: ['Фирменный стиль', 'SMM-дизайн (соцсети)', 'Презентации', 'Полиграфия'],
      circleImage: circle,
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
        <img src={buttonCircle} alt="" className="w-full h-full object-contain" />
      </div>

      {experienceData.map((item) => (
        <ExperienceItem key={item.year} experience={item} />
      ))}
    </section>
  );
};

export default ExperienceSection;