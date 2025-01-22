import { observer } from 'mobx-react-lite';
import { navigationStore } from '@stores/navigation.store';

const NavigationButtons = observer(() => {
  const buttonStyle = (isActive) => 
    `border transition-colors duration-300 rounded-full flex items-center justify-center
    text-8xl md:text-4xl w-[7rem] md:w-[2.5rem] h-[7rem] md:h-[2.5rem]
    ${isActive 
      ? 'border-white/10 hover:bg-white hover:text-[#3624A6]' 
      : 'border-gray-400/30 cursor-not-allowed'}`;

  return (
    <div className="flex justify-center space-x-6 mb-6 text-white font-onest font-thin text-[3.28125rem] md:text-[2.1875rem]">
      <button
        onClick={() => navigationStore.goPrev()}
        aria-label="Предыдущий слайд"
        className={buttonStyle(navigationStore.canGoPrev)}
        disabled={!navigationStore.canGoPrev}
      >
        &larr;
      </button>

      <button
        onClick={() => navigationStore.goNext()}
        aria-label="Следующий слайд"
        className={buttonStyle(navigationStore.canGoNext)}
        disabled={!navigationStore.canGoNext}
      >
        &rarr;
      </button>
    </div>
  );
});

export default NavigationButtons;