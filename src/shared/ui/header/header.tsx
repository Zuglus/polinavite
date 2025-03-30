import React from 'react';
import logoImage from '@images/logo.svg';

/**
 * Компонент заголовка сайта
 */
const Header: React.FC = () => {

  // Вынесенные константы стилей
  const HEADER_STYLES = {
    CONTAINER: "relative mx-auto px-4 py-[3.75rem] max-w-[75rem]",
    LOGO: "h-[12rem] md:h-[8rem] w-auto object-contain",
    TITLE_PRIMARY: "font-mv-skifer text-[7.3125rem] md:text-[4.875rem] leading-none",
    TITLE_SECONDARY: "font-light font-onest text-[2.25rem] md:text-[1.5rem] leading-tight tracking-wider",
    LAYOUT: {
      WRAPPER: "flex justify-center items-center",
      INNER: "flex items-center gap-[2rem]",
      TEXT_CONTAINER: "flex flex-col text-left whitespace-nowrap",
      TITLE_ROW: "flex items-center gap-[1.5rem]"
    }
  };

  return (
    <header className={HEADER_STYLES.CONTAINER}>
      <div className={HEADER_STYLES.LAYOUT.WRAPPER}>
        <div className={HEADER_STYLES.LAYOUT.INNER}>
          {/* Логотип */}
          <div className={HEADER_STYLES.LOGO}>
            <img 
              src={logoImage} 
              alt="Логотип Полина Мигранова" 
              className="w-full h-full"
            />
          </div>

          {/* Текстовый блок */}
          <div className={HEADER_STYLES.LAYOUT.TEXT_CONTAINER}>
            <div className={HEADER_STYLES.LAYOUT.TITLE_ROW}>
              <h1 className={HEADER_STYLES.TITLE_PRIMARY}>
                Полина
              </h1>
              <div className={HEADER_STYLES.TITLE_SECONDARY}>
                графический<br />дизайнер
              </div>
            </div>
            
            <h1 className={HEADER_STYLES.TITLE_PRIMARY}>
              Мигранова
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);