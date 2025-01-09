import nitiSlide1 from "./../assets/images/niti/niti1.png";
import nitiSlide2 from "./../assets/images/niti/niti2.png";
import nitiSlide3 from "./../assets/images/niti/niti3.png";
import nitiSlide4 from "./../assets/images/niti/niti4.png";
import nitiSlide5 from "./../assets/images/niti/niti5.png";
import codeEventDesign from "./../assets/images/code/code1.png";
import codeBootcampMerch from "./../assets/images/code/code2.png";
import codeSmmMaterials from "./../assets/images/code/code3.png";
import codePlaceholder from "./../assets/images/code/code4.png";
import scienceQuiz from "./../assets/images/science/science1.png";
import scienceCourses from "./../assets/images/science/science2.png";
import scienceLetters from "./../assets/images/science/science3.png";
import fizicsPostcard from "./../assets/images/fizics/fizics1.png";
import fizicsCards from "./../assets/images/fizics/fizics2.png";
import fizicsPlaceholder from "./../assets/images/fizics/fizics3.png";

const PLACEHOLDER_TEXT = "Находится в разработке";

export const projects = [
  {
    id: "project1",
    title: "НИТИ",
    description: "Кластер проектов по управлению современным образованием",
    audience:
      "менеджеры образования, управленцы, преимущественно женщины старше 40",
    slides: [
      {
        image: nitiSlide1,
        task: "ребрендинг образовательного продукта, создание айдентики, гармонично сочетающей эстетику с глубоким смысловым содержанием. Основной акцент на женственность, лидерство и стремление к профессиональному росту",
        solution:
          "цветовая палитра создает ощущение серьезного подхода к вызовам современного образования. Возраст целевой аудитории определяет использование цветов с более короткой длиной волны (выбран синий, использовался и ранее, но изменены оттенки и градиенты). Новые элементы айдентики подчеркивают глубину образовательного материала",
      },
      {
        image: nitiSlide2,
        task: PLACEHOLDER_TEXT,
        solution: PLACEHOLDER_TEXT,
      },
      {
        image: nitiSlide3,
        task: PLACEHOLDER_TEXT,
        solution: PLACEHOLDER_TEXT,
      },
      {
        image: nitiSlide4,
        task: PLACEHOLDER_TEXT,
        solution: PLACEHOLDER_TEXT,
      },
      {
        image: nitiSlide5,
        task: PLACEHOLDER_TEXT,
        solution: PLACEHOLDER_TEXT,
      },
    ],
  },
  {
    id: "project2",
    title: "КОДИИМ",
    description:
      "Проект по искусственному интеллекту для школьников по обучению программированию и созданию нейронных сетей",
    audience: "учащиеся 6-11 классов, интересующиеся программированием и ИИ",
    slides: [
      {
        image: codeEventDesign,
        task: "оформление ивента — Московского городского конкурса для школьников в области ИИ (мерча для подарков победителям и призерам)",
        solution:
          "современная подача, цветовые отличия в бейджах, палитра отражает технологичность бренда",
      },
      {
        image: codeBootcampMerch,
        task: "создать уникальный и запоминающийся мерч для буткемпа по ИИ",
        solution:
          "в разработке мерча реализован уникальный подход: смыслы мероприятия представлены как код в программировании",
      },
      {
        image: codeSmmMaterials,
        task: "редизайн smm-материалов",
        solution:
          "разнообразие цветов, активное использование нейросетей для генерации иллюстраций и персонажей",
      },
      {
        image: codePlaceholder,
        task: PLACEHOLDER_TEXT,
        solution: PLACEHOLDER_TEXT,
      },
    ],
  },
  {
    id: "project3",
    title: "В центре науки",
    description:
      "Проект направлен на популяризацию науки, формирование сообщества молодых ученых и педагогических работников в системе образования г. Москвы",
    audience: "ученики, учителя, учёные",
    slides: [
      {
        image: scienceQuiz,
        task: "разработать для квиза учёных и учителей карточку промопоста, бэйджи и сертификаты для участников",
        solution:
          "сделать бэйджи с разными цветами, исходя из целевой аудитории, добавить динамики в макеты, соответствующей атмосфере квиза",
      },
      {
        image: scienceCourses,
        task: "научным курсам для школьников разработать афишу для школ, добавить маскота, сделать карточку для промопоста с фото, создать уникальные стикеры для научных фестивалей",
        solution:
          "маскот дает дополнительный акцент на целевую аудиторию мероприятия, афиша отражает дизайн веб-страницы ивента.Стикеры соответствуют тематике научных фестивалей — химия, социо-гуманитарные науки, программирование. Цитата Аристотеля отсылает к истории научного знания, единства биологического и социального в человеке",
      },
      {
        image: scienceLetters,
        task: "сделать благодарственные письма для школ в официальном стиле",
        solution:
          "использовать минимализм и цветовую палитру по предметным областям аналогично личным сертификатов участников, форма подчеркивает тональность содержания — выражение благодарности за образовательные программы, раскрывающие потенциал каждого ученика",
      },
    ],
  },
  {
    id: "project4",
    title: "День физики",
    description:
      "Мероприятие состоялось 17 сентября 2023 года в день рождения Циолковского на базе вузов в 22 городах страны",
    audience: "старшеклассники, интересующиеся наукой, выбирают будущую профессию",
    slides: [
      {
        image: fizicsPostcard,
        task: "разработать макет открыток с российскими физиками, используя айдентику мероприятия",
        solution:
          "изучить биографии российских и советских учёных. Было важно показать, что теоретические открытия не самоцель, наука призвана решать конкретные практические задачи. Так родилась идея написать тексты об открытиях на обороте и добавлять надпись «НАУКА=ТЕОРИЯ+ПРАКТИКА». Цитаты учёных были подобраны для трансляции ценностей об отношении к профессии, труду и обществу",
      },
      {
        image: fizicsCards,
        task: "разработать карточки для игры «Технообмен» в айдентике бренда, но с указанными новыми цветами. Участники получали карточки в обмен на выполнение заданий",
        solution: PLACEHOLDER_TEXT,
      },
      {
        image: fizicsPlaceholder,
        task: PLACEHOLDER_TEXT,
        solution: PLACEHOLDER_TEXT,
      },
    ],
  },
];