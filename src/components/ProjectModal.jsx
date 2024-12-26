import { useState } from "react";
import ModalSlider from "./ModalSlider";
import ModalHeader from "./ModalHeader";

function ProjectModal({ project, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClose = () => {
    onClose();
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + project.slides.length) % project.slides.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % project.slides.length);
  };

  const currentSlide = project.slides[currentIndex];

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-[#04061B]/90
      "
      onClick={handleClose}
    >
      <div
        className={`
          relative inline-block w-full max-w-[93.75rem] md:max-w-[62.5rem]
          my-4 bg-[#04061B] border border-white/10
          rounded-[1.875rem] md:rounded-[1.25rem] shadow-xl
          transform transition-all duration-300
          h-[90vh]
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закрытия (островок) */}
        <div
          className="
            absolute top-[1.875rem] md:top-[1.25rem]
            right-[1.875rem] md:right-[1.25rem]
            z-50 flex justify-center items-center
          "
        >
          <div className="bg-white/2 backdrop-blur-md rounded-full p-1">
            <button
              tabIndex={-1}
              onClick={handleClose}
              className="
                flex justify-center items-center
                border border-white/10 hover:border-white/20
                rounded-full w-[10rem] md:w-[2.5rem]
                h-[10rem] md:h-[2.5rem]
                transition-all hover:rotate-90
                duration-300 outline-none
              "
            >
              <svg
                width="21" height="21"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="scale-125 md:scale-100"
              >
                <path
                  d="M1 1L13 13M1 13L13 1"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Контейнер со скроллом */}
        <div
          className="
            h-full overflow-y-auto
            p-[3.75rem] md:p-[2.5rem]
          "
        >
          <ModalHeader
            title={project.title}
            description={project.description}
            audience={project.audience}
          />

          <ModalSlider
            slides={project.slides}
            currentIndex={currentIndex}
            onPrev={prevSlide}
            onNext={nextSlide}
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
