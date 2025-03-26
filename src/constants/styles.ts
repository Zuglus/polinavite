// src/constants/styles.ts

export const CARD_STYLES = {
    CONTAINER: 'bg-white/5 hover:shadow-lg rounded-[1.875rem] md:rounded-[1.25rem] transition-all hover:-translate-y-2 duration-300 cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 group',
    IMAGE: 'group-hover:scale-105 w-full transition-transform duration-300 object-cover'
  } as const;
  
  export const SECTION_STYLES = {
    CONTAINER: 'relative mx-auto px-4 py-[7.75rem] max-w-[75rem]',
    HEADER_WRAPPER: 'relative mb-[4.1875rem] text-center z-0',
    DECORATION: 'absolute top-[-2.875rem] md:top-[-1.875rem] left-[50%] w-[25.875rem] md:w-[17.25rem] h-[28.0125rem] md:h-[18.675rem] transform -translate-x-[20.6rem] md:-translate-x-[13.625rem] z-0',
    DECORATION_IMAGE: 'w-full h-full object-contain',
    TITLE: 'font-mv-skifer text-[4.6875rem] md:text-[3.125rem] leading-[1.24] tracking-[0.01em] relative z-10',
    GRID: 'relative z-10 gap-[2.71875rem] md:gap-[1.8125rem] grid grid-cols-1 md:grid-cols-2 mx-auto max-w-[70.65625rem] md:max-w-full'
  } as const;
  
  export const IMAGE_STYLES = {
    CONTAINER: 'relative w-full',
    SKELETON: 'block inset-0 rounded-[1.25rem] bg-white w-full h-[400px]',
    ERROR: 'text-red-500 text-center',
    IMAGE: 'w-full object-contain'
  } as const;