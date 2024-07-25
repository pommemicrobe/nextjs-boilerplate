import { NextRequest, NextResponse } from 'next/server';

type LocalesType = 'en' | 'fr';

const DEFAULT_LOCALE = 'en';
const LOCALES = ['en', 'fr'];

const _detectLocale = (request: NextRequest) => {
  const acceptedLanguages = request.headers.get('accept-language');

  if (!acceptedLanguages) return DEFAULT_LOCALE;

  const preferredLanguages = acceptedLanguages
    .split(',')
    .join(';')
    .split(';')
    .filter((acceptedLanguage) => !acceptedLanguage.startsWith('q='));
  const preferredLanguage = preferredLanguages.find((preferredLanguage) =>
    LOCALES.includes(preferredLanguage)
  );

  return preferredLanguage ? preferredLanguage : DEFAULT_LOCALE;
};

const isDemandedLocaleExist = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return true;

  return false;
};

const redirectToPreferredLocale = async (request: NextRequest) => {
  const locale = _detectLocale(request);

  request.nextUrl.pathname = `/${locale}`;

  return NextResponse.redirect(request.nextUrl);
};

export type {
  LocalesType,
};

export {
  DEFAULT_LOCALE,
  LOCALES,
};

export {
  isDemandedLocaleExist,
  redirectToPreferredLocale,
};
