const ModalHeader = ({ project }) => {
  // Если project отсутствует или нет ни одного поля - не рендерим компонент
  if (!project || !(project.title || project.description || project.audience)) {
    return null;
  }

  return (
    <header className="space-y-[2.8125rem] md:space-y-[1.875rem] mb-8">
      <div>
        {project.title && (
          <h3 className="font-mv-skifer text-[4.6875rem] md:text-[3.125rem]">
            {project.title}
          </h3>
        )}

        {project.description && (
          <h4 className="mb-4 font-extralight text-[3.28125rem] md:text-2xl leading-normal">
            {project.description}
          </h4>
        )}

        {project.audience && (
          <p className="font-onest text-[3.28125rem] md:text-[1.25rem]">
            <span className="font-semibold">Целевая аудитория: </span>
            <span className="opacity-80">{project.audience}</span>
          </p>
        )}
      </div>
    </header>
  );
};

export default ModalHeader;