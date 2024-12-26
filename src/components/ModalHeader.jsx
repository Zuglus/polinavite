const ModalHeader = ({ title, description, audience }) => {
    return (
      <div className="space-y-[2.8125rem] md:space-y-[1.875rem] mb-8">
        <div>
          <h3 className="font-mv-skifer text-[4.6875rem] md:text-[3.125rem] text-white">
            {title}
          </h3>
          <h4 className="mb-4 font-extralight text-[3.28125rem] md:text-[2.1875rem] text-white">
            {description}
          </h4>
          <p className="font-onest text-[2.875rem] md:text-[1.25rem] text-white/80">
            <span className="font-semibold text-white">Целевая аудитория:</span>{" "}
            {audience}
          </p>
        </div>
      </div>
    );
  }

  export default ModalHeader;