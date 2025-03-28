# Инструкции по обновлению контента

## Содержание
1. [Добавление нового проекта](#добавление-нового-проекта)
2. [Обновление существующего проекта](#обновление-существующего-проекта)
3. [Добавление раздела с опытом работы](#добавление-раздела-с-опытом-работы)
4. [Изменение личной информации](#изменение-личной-информации)
5. [Работа с изображениями](#работа-с-изображениями)

## Добавление нового проекта

### Шаг 1: Подготовка изображений

1. Подготовьте изображения для проекта:
   - Обложка проекта (рекомендуемый размер: 800×600px)
   - Слайды проекта (рекомендуемый размер: 1280×720px)
   
2. Сохраните изображения в формате png или jpg:
   - Обложка: `public/images/{project-name}.png`
   - Слайды: `public/images/{project-name}/{slide-number}.png`

### Шаг 2: Обновление данных проекта

1. Откройте файл `src/shared/config/projects-data.ts`

2. Добавьте новый проект в массив `projects`, соблюдая структуру:

```javascript
// Импортируйте изображения проекта
import newProjectCover from "@images/new-project.png";
import newProjectSlide1 from "@images/new-project/slide1.png";
import newProjectSlide2 from "@images/new-project/slide2.png";

// Добавьте новый проект в массив
export const projects = [
  // Существующие проекты...
  
  {
    id: "new-project", // Уникальный идентификатор
    title: "Название проекта",
    description: "Краткое описание проекта",
    audience: "Целевая аудитория",
    slides: [
      {
        image: newProjectSlide1,
        task: "Описание задачи для первого слайда",
        solution: "Описание решения для первого слайда"
      },
      {
        image: newProjectSlide2,
        task: "Описание задачи для второго слайда",
        solution: "Описание решения для второго слайда"
      }
    ]
  }
];
```

### Шаг 3: Обновление обложки в портфолио

1. Откройте файл `src/shared/config/portfolio-data.ts`

2. Добавьте обложку проекта в массив `portfolioData`:

```javascript
// Импорт изображения обложки
import newProjectImage from '@images/new-project.png';

export const portfolioData: PortfolioItem[] = [
  // Существующие проекты...
  
  { 
    id: 'new-project', // ID должен совпадать с ID в projects-data.ts
    image: newProjectImage, 
    alt: "Название проекта" 
  }
];
```

## Обновление существующего проекта

### Обновление информации о проекте

1. Откройте файл `src/shared/config/projects-data.ts`

2. Найдите проект по его `id` и обновите нужные поля:
   - `title` - название проекта
   - `description` - описание проекта
   - `audience` - целевая аудитория
   - `slides` - слайды проекта

### Обновление слайдов проекта

1. Если вы хотите заменить изображения, сохраните новые изображения в соответствующей директории

2. Обновите импорты и содержимое слайдов в `projects-data.ts`:

```javascript
// Обновление изображения слайда
import updatedSlide from "@images/project-name/updated-slide.png";

// В массиве projects найдите нужный проект и обновите слайды
slides: [
  {
    image: updatedSlide,
    task: "Обновленное описание задачи",
    solution: "Обновленное описание решения"
  },
  // Другие слайды...
]
```

## Добавление раздела с опытом работы

1. Откройте компонент `src/widgets/experience/ui/experience-section.tsx`

2. Добавьте новый опыт в массив `experienceData`:

```javascript
const experienceData = [
  // Существующий опыт...
  
  {
    year: '2024-2025',
    company: 'Название компании',
    position: 'Должность',
    duties: ['Обязанность 1', 'Обязанность 2', 'Обязанность 3'],
    circleImage: circle, // Опционально
  },
];
```

## Изменение личной информации

### Обновление резюме

1. Откройте компонент `src/widgets/resume/ui/resume-section.tsx`

2. Обновите информацию в разделах Hard skills и Soft skills:

```javascript
<div className="mb-[5.5rem] md:mb-[3rem]">
  <h3 className="mb-[0.84375rem] md:mb-[0.5625rem] font-medium font-onest text-[3.75rem] md:text-[2.5rem]">
    Hard skills
  </h3>
  <ul className="font-extralight text-[3.28125rem] md:text-[2.1875rem] list-none relative">
    <li className="mb-[0.75rem] md:mb-[0.1rem]"><span className="-left-[4.71rem] md:-left-[3.14rem] absolute font-onest font-thin">&rarr;</span> Новый навык</li>
    {/* Другие навыки... */}
  </ul>
</div>
```

### Обновление контактной информации

1. Откройте компонент `src/shared/ui/footer/footer.tsx`

2. Обновите ссылку на телеграм или другие контактные данные:

```javascript
const telegram = "https://t.me/NewUsername";
```

## Работа с изображениями

### Оптимизация изображений

Перед загрузкой новых изображений рекомендуется оптимизировать их:

1. Поместите исходные изображения в директорию `public/images/`

2. Запустите скрипт оптимизации:

```bash
npm run optimize-images
```

3. Оптимизированные изображения будут сохранены в `public/images/optimized/`

### Генерация WebP и AVIF версий

Для современных браузеров рекомендуется создавать WebP и AVIF версии изображений:

1. Запустите скрипт оптимизации с параметром форматов:

```bash
npm run optimize-images -- --formats=webp,avif
```

2. В директории `public/images/optimized/` будут созданы подпапки с версиями в разных форматах