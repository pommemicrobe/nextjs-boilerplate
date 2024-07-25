import { NextRequest } from 'next/server';

import { isDemandedLocaleExist, redirectToPreferredLocale } from './lib/locale';

export async function middleware(request: NextRequest) {
  if (
    process.env.IS_MULTI_LOCALE === 'true' &&
    !await isDemandedLocaleExist(request)
  ) return redirectToPreferredLocale(request);

  return;
}

export const config = {
  matcher: [
    '/((?!_next).*)',
  ],
};
