const PortfolioCard = ({ project, onClick }) => {
    return (
        <button
            type="button"
            className="portfolio-card bg-white/5 hover:shadow-lg rounded-[1.875rem] md:rounded-[1.25rem] transition-all hover:-translate-y-2 duration-300 cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 group"
            onClick={onClick}
        >
            <img src={project.image} alt={project.alt} className="group-hover:scale-105 w-full transition-transform duration-300 object-cover" />
        </button>
    );
}

export default PortfolioCard;