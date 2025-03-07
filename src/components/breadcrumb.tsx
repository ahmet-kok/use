"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // Generate breadcrumb items
  const breadcrumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    return { href, label };
  });

  if (segments.length === 0) return null;

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link
              href="/"
              className="text-dark-500 hover:text-dark-900 transition-colors dark:text-gray-400 dark:hover:text-white"
            >
              <Home className="h-4 w-4" />
              <span className="sr-only">Home</span>
            </Link>
          </li>
          {breadcrumbs.map((item, index) => (
            <li key={item.href} className="flex items-center">
              <ChevronRight className="text-dark-300 h-4 w-4 dark:text-gray-600" />
              {index === breadcrumbs.length - 1 ? (
                <span className="text-dark-900 ml-2 font-medium dark:text-white">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-dark-500 hover:text-dark-900 ml-2 transition-colors dark:text-gray-400 dark:hover:text-white"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
