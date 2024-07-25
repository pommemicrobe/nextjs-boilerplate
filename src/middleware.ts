import { NextRequest, NextResponse } from 'next/server';

import { DEFAULT_LOCALE, LOCALES } from './lib/locale';
 
function getLocale(request: NextRequest) {
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
}

function isDemandedLocaleExist(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
   
  if (pathnameHasLocale) return true;
   
  return false;
}

function redirectToPreferredLocal(request: NextRequest) {   
  const locale = getLocale(request);

  request.nextUrl.pathname = `/${locale}`;
   
  return NextResponse.redirect(request.nextUrl);
}

export function middleware(request: NextRequest) {
  if (
    process.env.IS_MULTI_LOCALE === 'true' &&
    !isDemandedLocaleExist(request)
  ) return redirectToPreferredLocal(request);

  return;
}
 
export const config = {
  matcher: [
    '/((?!_next).*)',
  ],
};
