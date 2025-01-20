const NavigationButtons = ({ onPrev, onNext }) => (
    <div className="flex justify-center space-x-6 mb-6 text-white font-onest font-thin text-[3.28125rem] md:text-[2.1875rem]">
      <button
        onClick={onPrev}
        aria-label="Предыдущий слайд"
        className="border border-white/10 text-8xl md:text-4xl hover:bg-white hover:text-[#3624A6] hover:font-normal rounded-full w-[7rem] md:w-[2.5rem] h-[7rem] md:h-[2.5rem] flex items-center justify-center transition-colors duration-300"
      >
        &larr;
      </button>
      <button
        onClick={onNext}
        aria-label="Следующий слайд"
        className="border border-white/10 text-8xl md:text-4xl hover:bg-white hover:text-[#3624A6] hover:font-normal rounded-full w-[7rem] md:w-[2.5rem] h-[7rem] md:h-[2.5rem] flex items-center justify-center transition-colors duration-300"
      >
        &rarr;
      </button>
    </div>
  );

  export default NavigationButtons;