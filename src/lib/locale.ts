type DictionariesType = {
  [key in LocalesType]: () => Promise<{ [key: string]: string}>;
};

type LocalesType = 'en' | 'fr';

const _DICTIONARIES: DictionariesType = {
  en: () => import('@/../dictionaries/en.json').then((module) => module.default),
  fr: () => import('@/../dictionaries/fr.json').then((module) => module.default),
};

const DEFAULT_LOCALE = 'en';
const LOCALES = ['en', 'fr'];

const getDictionaries = () => _DICTIONARIES;

const getDictionary = (locale: LocalesType) => _DICTIONARIES[locale]();

const getDictionaryTermByKey = async (locale: LocalesType, key: string) => {
  const dictionary = await getDictionary(locale);

  return dictionary[key] ?? key;
};

export {
  DEFAULT_LOCALE,
  LOCALES,
};

export {
  getDictionaries,
  getDictionary,
  getDictionaryTermByKey,
};
