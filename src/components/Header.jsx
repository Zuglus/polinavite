import logo from "../assets/images/logo.svg";

const Header = () => {
    return (
        <header className="relative mx-auto px-4 py-[3.75rem] max-w-[75rem]">
            <div className="flex justify-center items-center">
                <div className="flex items-center gap-[2rem]">
                    <div className="h-[12rem] md:h-[8rem]">
                        <img src={logo} alt="Logo" className="w-auto h-full object-contain" />
                    </div>
                    <div className="flex flex-col text-left whitespace-nowrap">
                        <div className="flex items-center gap-[1.5rem]">
                            <h1 className="font-mv-skifer text-[7.3125rem] md:text-[4.875rem] leading-none">Полина</h1>
                            <div className="font-light font-onest text-[2.25rem] md:text-[1.5rem] leading-tight tracking-wider">
                                графический<br />дизайнер
                            </div>
                        </div>
                        <h1 className="font-mv-skifer text-[7.3125rem] md:text-[4.875rem] leading-none">Мигранова</h1>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;