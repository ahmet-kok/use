import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
export { auth as authMiddleware } from "@/auth";

const intlMiddleware = createMiddleware({
    // A list of all locales that are supported
    locales: ['en', 'zh', 'tr'],

    // Used when no locale matches
    defaultLocale: 'en',
    
    // Don't add a prefix for the default locale
    localePrefix: 'as-needed'
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
    const isLocalePath = /^\/(zh|tr)(\/|$)/.test(pathname);
    // Don't redirect the root path or paths that already have non-English locale prefixes
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

export { createMiddleware };

export const config = {
    matcher: ["/((?!api|_static|_next|.*\\.png$|.*\\.jpg$).*)"],
};