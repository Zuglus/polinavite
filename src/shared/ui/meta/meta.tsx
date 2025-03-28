// src/shared/ui/meta/meta.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

export interface MetaProps {
  /** Заголовок страницы */
  title?: string;
  /** Описание страницы */
  description?: string;
  /** Ключевые слова */
  keywords?: string;
  /** URL канонического адреса */
  canonical?: string;
  /** URL для Open Graph изображения */
  ogImage?: string;
  /** Локаль для Open Graph */
  ogLocale?: string;
  /** Тип для Open Graph */
  ogType?: 'website' | 'article' | 'profile';
  /** Имя автора */
  author?: string;
  /** Дополнительные мета-теги */
  additionalTags?: React.ReactNode;
}

/**
 * Компонент для управления SEO метаданными
 */
const Meta: React.FC<MetaProps> = ({
  title = 'Полина Мигранова | Графический дизайнер',
  description = 'Портфолио графического дизайнера Полины Миграновой. Создание современного дизайна, брендинг, иллюстрации и веб-дизайн.',
  keywords = 'графический дизайнер, дизайн, брендинг, логотипы, веб-дизайн, Полина Мигранова',
  canonical = 'https://example.com',
  ogImage = 'https://example.com/og-image.jpg',
  ogLocale = 'ru_RU',
  ogType = 'website',
  author = 'Полина Мигранова',
  additionalTags,
}) => {
  return (
    <Helmet>
      {/* Основные мета-теги */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph для социальных сетей */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={ogLocale} />
      
      {/* Дополнительные индивидуальные мета-теги */}
      {additionalTags}
    </Helmet>
  );
};

export default Meta;