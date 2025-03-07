"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import { Career } from "@/lib/airtable";

export function CareerSkeleton() {
  const t = useTranslations("CareerPage.careerList");

  return (
    <div className=" overflow-hidden rounded-lg border ">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="  border-b ">
            <th scope="col">{t("position")}</th>
            <th scope="col" className="hiddensm:table-cell">
              {t("type")}
            </th>
            <th scope="col" className="hidden sm:table-cell">
              {t("location")}
            </th>
            <th scope="col" className="text-right">
              {t("actions")}
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(3)].map((_, i) => (
            <tr key={i} className="animate-pulse">
              <td className="max-w-full p-4 sm:px-6">
                <div className="mb-2 h-5 w-48 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="mt-1 h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
                <div className="mt-2 h-4 w-32 rounded bg-gray-200 dark:bg-gray-700 sm:hidden" />
              </td>
              <td className="hidden w-24 p-4 sm:table-cell sm:px-6">
                <div className="h-4 rounded bg-gray-200 dark:bg-gray-700" />
              </td>
              <td className="hidden w-24 p-4 sm:table-cell sm:px-6">
                <div className="h-4 rounded bg-gray-200 dark:bg-gray-700" />
              </td>
              <td className="w-12 p-4 text-right sm:px-6">
                <div className="ml-auto h-4 rounded bg-gray-200 dark:bg-gray-700" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CareerList({ career }: { career: Career[] }) {
  const t = useTranslations("CareerPage.careerList");

  return (
    <div className=" overflow-hidden rounded-lg border ">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="  border-b ">
            <th scope="col">{t("position")}</th>
            <th scope="col" className="hidden sm:table-cell">
              {t("type")}
            </th>
            <th scope="col" className="hidden sm:table-cell">
              {t("location")}
            </th>
            <th scope="col" className="text-right">
              {t("actions")}
            </th>
          </tr>
        </thead>
        <tbody>
          {career.map((position) => (
            <tr
              key={position.id}
              className="hover:bg-dark-50 dark:hover:bg-gray-300 transition-colors"
            >
              <td className="p-4 sm:px-6">
                <h4 className="font-medium">{position.title}</h4>
                <p className="mt-1 line-clamp-2">{position.description}</p>
                <p className="mt-2 whitespace-nowrap sm:hidden">
                  {position.type} • {position.location}
                </p>
              </td>
              <td className="hidden whitespace-nowrap p-4 sm:table-cell sm:px-6">
                {position.type}
              </td>
              <td className="hidden p-4 sm:table-cell sm:px-6">
                {position.location}
              </td>
              <td className="p-4 text-right sm:px-6">
                <Link
                  prefetch={true}
                  href={position.url}
                  className="text-dark-900 text-sm transition-opacity hover:opacity-70"
                >
                  {t("apply")}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
