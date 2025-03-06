"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bars3Icon,
  WrenchScrewdriverIcon,
  PaintBrushIcon,
  CommandLineIcon,
  DevicePhoneMobileIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  BriefcaseIcon,
  HeartIcon,
  Cog6ToothIcon,
  BuildingOffice2Icon,
  BookOpenIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { ThemeToggle } from "./ThemeToggle";
import { MobileMenu } from "./MobileMenu";
import { ComplexDropdown } from "./ComplexDropdown";

const servicesDropdownContent = {
  sections: [
    {
      title: "Design Services",
      items: [
        {
          title: "UI/UX Design",
          description: "Create intuitive and beautiful user experiences",
          href: "/services/design",
          icon: PaintBrushIcon,
        },
        {
          title: "Brand Identity",
          description: "Develop a cohesive and memorable brand",
          href: "/services/brand",
          icon: WrenchScrewdriverIcon,
        },
      ],
    },
    {
      title: "Development",
      items: [
        {
          title: "Web Development",
          description: "Build fast, responsive, and accessible websites",
          href: "/services/development",
          icon: CommandLineIcon,
        },
        {
          title: "App Development",
          description: "Create native and cross-platform applications",
          href: "/services/apps",
          icon: DevicePhoneMobileIcon,
        },
      ],
    },
  ],
  featured: {
    title: "Design System Services",
    description:
      "Create scalable and consistent design systems that grow with your product",
    link: "/services/design-systems",
    image: "/images/featured/design-systems.jpg",
  },
};

const companyDropdownContent = {
  sections: [
    {
      title: "About Us",
      items: [
        {
          title: "Our Story",
          description: "Learn about our journey and values",
          href: "/about",
          icon: BuildingOfficeIcon,
        },
        {
          title: "Team",
          description: "Meet the people behind our work",
          href: "/team",
          icon: UserGroupIcon,
        },
      ],
    },
    {
      title: "Join Us",
      items: [
        {
          title: "Careers",
          description: "Explore opportunities to work with us",
          href: "/careers",
          icon: BriefcaseIcon,
        },
        {
          title: "Culture",
          description: "Experience our values and work environment",
          href: "/culture",
          icon: HeartIcon,
        },
      ],
    },
  ],
  featured: {
    title: "Design Philosophy",
    description:
      "Discover how we apply Dieter Rams' principles to create meaningful experiences",
    link: "/about#philosophy",
    image: "/images/featured/philosophy.jpg",
  },
};

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Portfolio",
    href: "/portfolio",
    icon: BriefcaseIcon,
  },
  {
    name: "Services",
    href: "/services",
    icon: Cog6ToothIcon,
    dropdownContent: servicesDropdownContent,
  },
  {
    name: "Blog",
    href: "/blog",
    icon: BookOpenIcon,
  },
  {
    name: "Company",
    href: "/about",
    icon: BuildingOffice2Icon,
    dropdownContent: companyDropdownContent,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: EnvelopeIcon,
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-dark-200 dark:border-gray-800">
        <div className="sm:container mx-auto px-4 sm:px-8">
          <div className="h-16 flex items-center justify-between max-w-4xl mx-auto">
            <Link prefetch={true} href="/" className="text-lg font-medium">
              <div className="relative text-nowrap">
                <span
                  className={`inline-block transition-[opacity,transform] duration-500 ${
                    scrolled
                      ? "translate-y-[-100%] opacity-0"
                      : "translate-y-0 opacity-100"
                  }`}
                >
                  UseEfficiently
                </span>
                <span
                  className={`absolute top-0 left-0 transition-[opacity,transform] duration-500 ${
                    scrolled
                      ? "translate-y-0 opacity-100"
                      : "translate-y-[100%] opacity-0"
                  }`}
                >
                  use technology efficiently
                </span>
              </div>
            </Link>
            <div className="flex items-center space-x-8">
              <div className="hidden lg:flex items-center space-x-8">
                {navigation.map((item) => (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() =>
                      item.dropdownContent && setActiveDropdown(item.name)
                    }
                    onMouseLeave={
                      () =>
                        /*                     setTimeout(() => {
                         */ setActiveDropdown(null)
                      /*                     }, 300)
                       */
                    }
                  >
                    <Link
                      prefetch={true}
                      href={item.href}
                      className={`${
                        pathname === item.href
                          ? "text-text-light dark:text-text-dark"
                          : "text-dark-500 "
                      } hover:text-dark-900 dark:hover:text-white transition-colors duration-200 py-2 flex items-center gap-2`}
                    >
                      {/* {item.icon && <item.icon className="w-5 h-5" />} */}
                      {item.name}
                    </Link>

                    {item.dropdownContent && (
                      <ComplexDropdown
                        isOpen={activeDropdown === item.name}
                        sections={item.dropdownContent.sections}
                        featuredTitle={item.dropdownContent.featured.title}
                        featuredDescription={
                          item.dropdownContent.featured.description
                        }
                        featuredLink={item.dropdownContent.featured.link}
                        featuredImage={item.dropdownContent.featured.image}
                        onClose={() => {
                          /* setTimeout(() => {
                          setActiveDropdown(null);
                        }, 300); */
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>

              <ThemeToggle />
              <button
                type="button"
                className="rounded-lg bg-background-light dark:bg-background-dark border border-dark-200 dark:border-gray-800
                 dark:hover:bg-dark-100 transition-colors duration-200 lg:hidden -mr-2 p-2 hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        navigation={navigation}
      />
    </>
  );
}
