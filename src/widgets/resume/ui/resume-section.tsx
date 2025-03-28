// src/components/features/Resume/ResumeSection.jsx
import React from 'react';
import bigrings from "@images/portfolio.svg";
import foto from "@images/foto.png";
import rings from "@images/rings_with_circle.svg";

const ResumeSection = () => {
    return (
        <section className="relative mx-auto px-4 py-[3.75rem] max-w-[75rem]">
            <div className="absolute left-1/2 top-[40.5rem] md:top-[27rem] w-[48.78125rem] overflow-hidden -translate-x-[16rem] md:-translate-x-[16rem]">
                <img src={bigrings} alt="" className="w-full h-full object-contain" />
            </div>
            <div className="relative mb-[1.25rem] text-center">
                <div
                    className="absolute top-[-2.875rem] md:top-[-1.875rem] left-[50%] w-[25.875rem] md:w-[17.25rem] h-[28.0125rem] md:h-[18.675rem] transform -translate-x-[14.7rem] md:-translate-x-[9.8rem]"
                >
                    <img src={rings} alt="Декоративные кольца" className="w-full h-full object-contain" />
                </div>
                <h2 className="font-mv-skifer text-[4.6875rem] md:text-[3.125rem] leading-[1.24] tracking-[0.01em] relative">
                    Резюме
                </h2>
            </div>

            <div className="flex justify-center items-center gap-[1.875rem] md:gap-[1.25rem] mb-[1.25rem]">
                <div className="rounded-full w-[16.6875rem] md:w-[11.125rem] h-[17.25rem] md:h-[11.55rem]">
                    <img src={foto} alt="Полина Мигранова" className="relative w-full h-full object-cover" />
                </div>
                <h3 className="font-mv-skifer text-[4.6875rem] md:text-[3.125rem] leading-[1.05] tracking-[0.01em]">
                    Полина<br />Мигранова
                </h3>
            </div>

            <div className="ml-[29.8125rem] md:ml-[31.875rem]">
                <div className="mb-[5.5rem] md:mb-[3rem]">
                    <h3 className="mb-[0.84375rem] md:mb-[0.5625rem] font-medium font-onest text-[3.75rem] md:text-[2.5rem]">
                        Hard skills
                    </h3>
                    <ul className="font-extralight text-[3.28125rem] md:text-[2.1875rem] list-none relative">
                        <li className="mb-[0.75rem] md:mb-[0.1rem]"><span className="-left-[4.71rem] md:-left-[3.14rem] absolute font-onest font-thin">&rarr;</span> PowerPoint</li>
                        <li className="mb-[0.75rem] md:mb-[0.1rem]"><span className="-left-[4.71rem] md:-left-[3.14rem] absolute font-onest font-thin">&rarr;</span> Figma</li>
                        <li><span className="-left-[4.71rem] md:-left-[3.14rem] absolute font-onest font-thin">&rarr;</span> Photoshop,<br />Illustrator, InDesign</li>
                    </ul>
                </div>

                <div>
                    <h3 className="mb-[0.84375rem] md:mb-[0.5625rem] font-medium font-onest text-[3.75rem] md:text-[2.5rem]">
                        Soft skills
                    </h3>
                    <ul className="font-extralight text-[3.28125rem] md:text-[2.1875rem] list-none relative">
                        <li className="mb-[0.75rem] md:mb-[0.1rem]"><span className="-left-[4.71rem] md:-left-[3.14rem] absolute font-onest font-thin">&rarr;</span> Системность</li>
                        <li className="mb-[0.75rem] md:mb-[0.1rem]"><span className="-left-[4.71rem] md:-left-[3.14rem] absolute font-onest font-thin">&rarr;</span> Креативность</li>
                        <li><span className="-left-[4.71rem] md:-left-[3.14rem] absolute font-onest font-thin">&rarr;</span> Ответственность</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default ResumeSection;