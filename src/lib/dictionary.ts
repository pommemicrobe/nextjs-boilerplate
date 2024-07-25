import { LocalesType } from './locale';

type DictionariesType = {
  [key in LocalesType]: () => Promise<{ [key: string]: string}>;
};

const _DICTIONARIES: DictionariesType = {
  en: () => import('@/../dictionaries/en.json').then((module) => module.default),
  fr: () => import('@/../dictionaries/fr.json').then((module) => module.default),
};

const getDictionaries = async () => _DICTIONARIES;

const getDictionary = async (locale: LocalesType) => _DICTIONARIES[locale]();

const getDictionaryTermByKey = async (locale: LocalesType, key: string) => {
  const dictionary = await getDictionary(locale);

  return dictionary[key] ?? key;
};

export {
  getDictionaries,
  getDictionary,
  getDictionaryTermByKey,
};
