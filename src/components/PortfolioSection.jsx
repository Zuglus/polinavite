import PortfolioCard from "./PortfolioCard";
import rings from "./../assets/images/rings_with_circle.svg";

// Импортируй изображения с помощью import
import nitiImage from "./../assets/images/threads.png";
import codeImage from "./../assets/images/code.png";
import dayImage from "./../assets/images/day.png";
import presentationImage from "./../assets/images/presentation.png";

const projectsData = [
  { id: 'project1', image: nitiImage, alt: "НИТИ" },
  { id: 'project2', image: codeImage, alt: "КОДИИМ" },
  { id: 'project3', image: dayImage, alt: "День физики" },
  { id: 'project4', image: presentationImage, alt: "Дизайн презентаций" },
];

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
                {projectsData.map((project) => (
                    <PortfolioCard
                        key={project.id}
                        project={project}
                        onClick={() => onCardClick(project.id)}
                    />
                ))}
            </div>
        </section>
    );
}

export default PortfolioSection;