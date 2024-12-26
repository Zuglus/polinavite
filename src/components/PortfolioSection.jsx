import PortfolioCard from "./PortfolioCard";

import niti from "./../assets/images/threads.png";
import code from "./../assets/images/code.png";
import center from "./../assets/images/center.png";
import day from "./../assets/images/day.png";
import rings from "./../assets/images/rings_with_circle.svg";

const PortfolioSection = ({ onCardClick }) => {
    return (
        <section className="relative mx-auto px-4 py-[7.75rem] max-w-[75rem]">
            <div className="relative mb-[4.1875rem] text-center z-0">
                <div className="absolute top-[-2.875rem] md:top-[-1.875rem] left-[50%] w-[25.875rem] md:w-[17.25rem] h-[28.0125rem] md:h-[18.675rem] transform -translate-x-[20.6rem] md:-translate-x-[13.625rem] z-0">
                    <img src={rings} alt="Декоративные кольца" className="w-full h-full object-contain" />
                </div>
                <h2 className="font-mv-skifer text-[4.6875rem] md:text-[3.125rem] leading-[1.24] tracking-[0.01em] relative z-10">Портфолио</h2>
            </div>

            <div className="relative z-10 gap-[2.71875rem] md:gap-[1.8125rem] grid grid-cols-1 md:grid-cols-2 mx-auto max-w-[70.65625rem] md:max-w-full">
                <PortfolioCard image={niti} alt="НИТИ" onClick={() => onCardClick('project1')} />
                <PortfolioCard image={code} alt="КОДИИМ" onClick={() => onCardClick('project2')} />
                <PortfolioCard image={center} alt="В центре науки" onClick={() => onCardClick('project3')} />
                <PortfolioCard image={day} alt="День физики" onClick={() => onCardClick('project4')} />
            </div>
        </section>
    );
}

export default PortfolioSection;