import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { defaultLocale, localePrefix, locales } from './i18n';
export { auth as authMiddleware } from "@/auth";

// Create the internationalization middleware
const intlMiddleware = createMiddleware({
    locales,
    defaultLocale,
    localePrefix
});

export default async function middlewareHandler(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Exclude static resources and API paths
    const staticFilePattern = /^\/(_next\/|_static\/|static\/|favicon\.ico|site\.webmanifest)/;
    const apiPattern = /^\/api\//;
    if (staticFilePattern.test(pathname) || apiPattern.test(pathname)) {
        return NextResponse.next();
    }

    // If the path doesn't contain a locale prefix and isn't the root path,
    // check if it should be handled as a default locale (English) path
    const nonDefaultLocalePattern = new RegExp(`^\\/(${locales.filter(l => l !== defaultLocale).join('|')})(\\\/|$)`);
    const isLocalePath = nonDefaultLocalePattern.test(pathname);
    
    // Don't redirect the root path or paths that already have non-default locale prefixes
    if (!isLocalePath && pathname !== '/') {
        // Check if this is an internal Next.js path that should be left alone
        const isNextInternalPath = /^\/_next\//.test(pathname);
        if (isNextInternalPath) {
            return NextResponse.next();
        }
    }

    // Call the next-intl middleware which will handle the locale routing
    return intlMiddleware(req);
}

// Use a declarative API for configuring the middleware matcher
export const config = {
    matcher: [
        // Match all pathnames except those starting with:
        // - api (API routes)
        // - _static (static files)
        // - _next (Next.js internals)
        // - .*\\. (files with extension)
        "/((?!api|_static|_next|.*\\.[^/]*$).*)"
    ]
};