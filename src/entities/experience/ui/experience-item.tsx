import React from 'react';
import { Experience } from '@shared/model/types';

interface ExperienceItemProps {
  experience: Experience;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ experience }) => {
  const { year, company, position, duties, circleImage } = experience;
  return (
    <div className="ml-[30.1025rem] md:ml-[31.875rem] mb-[7.21875rem] md:mb-[4.8125rem]">
      <div className="relative">
        {circleImage && (
          <div className="absolute -top-[1.40625rem] md:-top-[0.9375rem] -left-[12.375rem] md:-left-[8.25rem] w-[7.875rem] md:w-[5.25rem] h-[7.875rem] md:h-[5.25rem]">
            <img src={circleImage} alt="" className="w-full h-full object-contain" />
          </div>
        )}
        <div>
          <p className="mb-[0.1875rem] md:mb-[0.125rem] font-extralight font-onest text-[3.28125rem] md:text-[2.1875rem] leading-[1.33] tracking-[0.01em]">
            {year}
          </p>
          <h3 className="mb-[0.65625rem] md:mb-[0.4375rem] font-medium font-onest text-[3.28125rem] md:text-[2.1875rem] leading-[1.25] tracking-[0.01em]">
            {company}
          </h3>
          <h3 className="mb-[0.65625rem] md:mb-[0.4375rem] font-medium font-onest text-[3.28125rem] md:text-[2.1875rem] leading-[1.33] tracking-[0.01em]">
            {position}
          </h3>
          <ul className="font-extralight text-[3.28125rem] md:text-[2.1875rem] list-none relative">
            {duties.map((duty: string, index: number) => (
              <li key={index} className="mb-[0.75rem] md:mb-[0.5rem]">
                <span className="-left-[4.71rem] md:-left-[3.14rem] absolute font-onest font-thin">
                  &rarr;
                </span>
                {duty}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExperienceItem;