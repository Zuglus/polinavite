const Footer = () => {

    const telegram = "https://t.me/Migranovap";
    return (
        <footer className="relative mt-[12.375rem] md:mt-[8.25rem] pb-[30.9375rem] md:pb-[20.625rem]">
            <div className="mx-auto px-4 max-w-[75rem]">
                <a
                    href={telegram}
                    target="_blank"
                    rel="noreferrer"
                    className="flex justify-center items-center bg-white hover:bg-[#3624A6] text-[#3624A6] hover:text-white mx-auto md:ml-[25.375rem] rounded-[3.65625rem] md:rounded-[2.4375rem] w-[36.375rem] md:w-[24.25rem] h-[7.3125rem] md:h-[4.875rem] font-medium font-onest text-[3.75rem] md:text-[2.5rem] text-center leading-tight tracking-[0.01em] transition-colors duration-300"
                >
                    связаться
                </a>
            </div>
        </footer>
    );
}

export default Footer;