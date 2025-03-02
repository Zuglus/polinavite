import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

// Функция для очистки пробелов в ключах объекта
const cleanGlobals = (globalsObj) => {
  return Object.entries(globalsObj).reduce((acc, [key, value]) => {
    const cleanKey = key.trim();
    acc[cleanKey] = value;
    return acc;
  }, {});
};

// Очищаем глобальные объекты
const browserGlobals = cleanGlobals(globals.browser);
const nodeGlobals = cleanGlobals(globals.node);

export default [
  { ignores: ['dist', '*.config.js'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...browserGlobals,
        ...nodeGlobals
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module'
      }
    },
    settings: { 
      react: { 
        version: 'detect'
      }
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn'
    }
  }
]