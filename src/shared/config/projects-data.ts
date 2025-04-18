import { Project } from '@shared/model/types';

import nitiSlide1 from "@app/assets/images/niti/niti1.png";
import nitiSlide2 from "@app/assets/images/niti/niti2.png";
import nitiSlide3 from "@app/assets/images/niti/niti3.png";
import nitiSlide4 from "@app/assets/images/niti/niti4.png";
import nitiSlide5 from "@app/assets/images/niti/niti5.png";
import codeEventDesign from "@app/assets/images/code/code1.png";
import codeBootcampMerch from "@app/assets/images/code/code2.png";
import codeSmmMaterials from "@app/assets/images/code/code3.png";
import codePlaceholder from "@app/assets/images/code/code4.png";
import fizicsPostcard from "@app/assets/images/fizics/fizics1.png";
import fizicsCards from "@app/assets/images/fizics/fizics2.png";
import fizicsPlaceholder from "@app/assets/images/fizics/fizics3.png";
import presentation0 from "@app/assets/images/presentations/0.png";
import presentation1 from "@app/assets/images/presentations/1.png";
import presentation2 from "@app/assets/images/presentations/2.png";
import presentation3 from "@app/assets/images/presentations/3.png";
import presentation4 from "@app/assets/images/presentations/4.png";
import presentation5 from "@app/assets/images/presentations/5.png";
import presentation6 from "@app/assets/images/presentations/6.png";
import presentation7 from "@app/assets/images/presentations/7.png";
import presentation8 from "@app/assets/images/presentations/8.png";

export const projects: Project[] = [
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
        solution: "цветовая палитра создает ощущение серьезного подхода к вызовам современного образования. Возраст целевой аудитории определяет использование цветов с более короткой длиной волны (выбран синий, использовался и ранее, но изменены оттенки и градиенты). Новые элементы айдентики подчеркивают глубину образовательного материала",
      },
      {
        image: nitiSlide2,
        task: "ребрендинг образовательного продукта, создание айдентики, гармонично сочетающей эстетику с глубоким смысловым содержанием. Основной акцент на женственность, лидерство и стремление к профессиональному росту",
        solution:
          "цветовая палитра создает ощущение серьезного подхода к вызовам современного образования. Возраст целевой аудитории определяет использование цветов с более короткой длиной волны (выбран синий, использовался и ранее, но изменены оттенки и градиенты). Новые элементы айдентики подчеркивают глубину образовательного материала",
      },
      {
        image: nitiSlide3,
        task: "разработка мерча для мероприятия",
        solution: "цветовая палитра создает ощущение серьезного подхода к вызовам современного образования. Возраст целевой аудитории определяет использование цветов с более короткой длиной волны (выбран синий, использовался и ранее, но изменены оттенки и градиенты). Новые элементы айдентики подчеркивают глубину образовательного материала",
      },
      {
        image: nitiSlide4,
        task: "создание smm-материалов (карточек)",
        solution: "разработка основных элементов фирменного стиля (сохранение общих моментов и введение разнообразия для привлечения внимания), расстановка акцентов для выделения существенной информации",
      },
      {
        image: nitiSlide5,
        task: "создание smm-материалов (карточек)",
        solution: "разработка основных элементов фирменного стиля (сохранение общих моментов и введение разнообразия для привлечения внимания), расстановка акцентов для выделения существенной информации",
      },
    ],
  },
  {
    id: "project2",
    title: "КОДИИМ",
    description:
      "Проект по искусственному интеллекту, обучению программированию и созданию нейронных сетей",
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
        task: "редизайн smm-материалов",
        solution: "разнообразие цветов, активное использование нейросетей для генерации иллюстраций и персонажей",
      },
    ],
  },
  {
    id: "project3",
    title: "День физики",
    description:
      "Мероприятие состоялось 17 сентября 2023 года в день рождения Циолковского на базе вузов в 22 городах страны",
    audience: "старшеклассники, интересующиеся наукой, выбирают будущую профессию",
    slides: [
      {
        image: fizicsPostcard,
        task: "разработать карточки для игры «Технообмен» в айдентике бренда, но с указанными новыми цветами. Участники получали карточки в обмен на выполнение заданий",
        solution:
          "изучить биографии российских и советских учёных. Было важно показать, что теоретические открытия не самоцель, наука призвана решать конкретные практические задачи. Так родилась идея написать тексты об открытиях на обороте и добавлять надпись «НАУКА=ТЕОРИЯ+ПРАКТИКА». Цитаты учёных были подобраны для трансляции ценностей об отношении к профессии, труду и обществу",
      },
      {
        image: fizicsCards,
        task: "разработать макет открыток с российскими физиками, используя айдентику мероприятия",
        solution: "изучить биографии российских и советских учёных. Было важно показать, что теоретические открытия не самоцель, наука призвана решать конкретные практические задачи. Так родилась идея написать тексты об открытиях на обороте и добавлять надпись «НАУКА=ТЕОРИЯ+ПРАКТИКА». Цитаты учёных были подобраны для трансляции ценностей об отношении к профессии, труду и обществу",
      },
      {
        image: fizicsPlaceholder,
        task: "разработать карточки для игры «Технообмен» в айдентике бренда, но с указанными новыми цветами. Участники получали карточки в обмен на выполнение заданий",
        solution: "создание легко читаемых макетов с указанием темы, года, ранжирования и категории по цвету",
      },
    ],
  },
  {
    id: "project4",
    title: "Презентации",
    description:
      "",
    audience: "",
    slides: [
      {
        image: presentation0,
      },
      {
        image: presentation1,
      },
      {
        image: presentation2,
      },
      {
        image: presentation3,
      },
      {
        image: presentation4,
      },
      {
        image: presentation5,
      },
      {
        image: presentation6,
      },
      {
        image: presentation7,
      },
      {
        image: presentation8,
      },
    ],
  },
];