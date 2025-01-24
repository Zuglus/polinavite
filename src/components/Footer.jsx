import React from 'react';
import buttonCircle from '../assets/images/koltsa_fon1.svg';

const Footer = () => {
    const telegram = "https://t.me/Migranovap";
    return (
        <footer className="relative mt-[12.375rem] md:mt-[9.75rem] pb-[30.9375rem] md:pb-[20.625rem]">
            <div className="absolute -top-96 left-1/2 w-[56rem] md:w-[40rem] -translate-x-[36rem] md:-translate-x-[24.5rem] -translate-y-[13rem] md:-translate-y-[3rem] overflow-hidden">
                <img src={buttonCircle} alt="" className="w-full h-full object-contain" />
            </div>
            <div className="mx-auto px-4 max-w-[75rem] relative">
                <a
                    href={telegram}
                    target="_blank"
                    rel="noreferrer"
                    className="flex justify-center items-center bg-white text-[#3624A6] hover:text-white mx-auto md:ml-[25.375rem] rounded-[3.65625rem] md:rounded-[2.4375rem] w-[36.375rem] md:w-[24.25rem] h-[7.3125rem] md:h-[4.875rem] font-medium font-onest text-[3.75rem] md:text-[2.5rem] text-center leading-tight tracking-[0.01em] transition-[background,color] duration-700 ease-in-out hover:bg-gradient-to-t hover:from-[#1C1257] hover:to-[#312098]"
                >
                    <span className="relative">
                        связаться
                    </span>
                    <span className="sr-only">Связаться со мной в Telegram</span>
                </a>
            </div>
        </footer>
    );
}

export default Footer;