"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { serviceSlugMap } from "@/data/serviceSlugs";
import { hireDeveloperSlugMap } from "@/data/hireDeveloperSlugs";

type NavKey = "services" | "hire" | "company" | null;

// DROPDOWN ITEMS
const servicesItems = [
  { name: "React Web Application Development" },
  { name: "React Native Mobile App Development" },
  { name: "Next.js SSR Applications Development" },
  { name: "Node.js Backend & API Development" },
  { name: "Full-Stack Development Services" },
  { name: "SaaS Application Development" },
  { name: "Startup MVP Development Services" },
  { name: "Frontend Development Services" },
  { name: "App Maintenance & Support Services" },
  { name: "Progressive Web App Development" },
  { name: "UI/UX Design for Web & Mobile Apps" },
  { name: "E-commerce Web & Mobile Apps" },
  { name: "Headless CMS Development Services" },
  { name: "Application Modernization Services" },
];

const companyItems = [
  { name: "About Us", href: "/about-us" },
  { name: "Careers", href: "/careers" },
  { name: "Contact Us", href: "/contact-us" },
];

const hireDeveloperItems = [
  { name: "Hire React JS Developers" },
  { name: "Hire Node JS Developers" },
  { name: "Hire Next JS Developers" },
  { name: "Hire React Native Developers" },
  { name: "Hire MERN Stack Developers" },
];

type NavbarProps = {
  openQuotePopup: () => void;
};

export default function Navbar({ openQuotePopup }: NavbarProps) {
  const [desktopDropdown, setDesktopDropdown] = useState<NavKey>(null);
  const [mobileDropdown, setMobileDropdown] = useState<NavKey>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const desktopMenuRef = useRef<HTMLUListElement | null>(null);

  const router = useRouter();

  // Desktop toggle
  const toggleDesktopDropdown = (key: NavKey) =>
    setDesktopDropdown((prev) => (prev === key ? null : key));

  // Mobile toggle
  const toggleMobileDropdown = (key: NavKey) =>
    setMobileDropdown((prev) => (prev === key ? null : key));

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        desktopMenuRef.current &&
        !desktopMenuRef.current.contains(e.target as Node)
      ) {
        setDesktopDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="w-full z-50 bg-gradient-to-r from-[#014175] to-[#0089F8] bg-blend-overlay">
        <nav className="mx-auto max-w-[1440px] px-6 py-4">
          {/* --------------------- Desktop --------------------- */}
          <div className="hidden lg:flex items-center justify-between text-white">
            {/* Logo */}
            <div>
              <Link href="/">
                <Image
                  src="https://imagedelivery.net/kMEsfkjghv3Z0VNZGz9zFw/c3714f2b-aa05-4374-2044-be269a058700/public"
                  alt="ReactMinds Web Development Company in Chennai"
                  width={200}
                  height={30}
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <ul
              className="flex items-center gap-6 text-base font-medium"
              ref={desktopMenuRef}
            >
              <li>
                <Link href="/" className="hover:text-[#FFC933]">
                  Home
                </Link>
              </li>

              {/* SERVICES DROPDOWN */}
              <li className="relative">
                <button
                  onClick={() => toggleDesktopDropdown("services")}
                  className="flex items-center hover:text-[#FFC933]"
                >
                  Services
                  <ChevronDown size={16} className="ml-1" />
                </button>

                {desktopDropdown === "services" && (
                  <div className="absolute left-0 mt-2 z-50">
                    {/* 🔺 TRIANGLE */}
                    <div
                      className="w-0 h-0 ml-8 border-l-[8px] border-r-[8px] border-b-[10px]
        border-l-transparent border-r-transparent border-[#F3D80E]"
                    />

                    {/* Dropdown Box */}
                    <ul className="bg-white text-black rounded shadow-lg grid grid-cols-2 gap-x-2 gap-y-0  min-w-[580px] p-2">
                      {servicesItems.map((item) => {
                        const slug = serviceSlugMap[item.name];

                        if (!slug) return null;

                        return (
                          <li key={item.name}>
                            <Link
                              href={`/${slug}`}
                              className="
    block w-full text-left
    px-3 py-1.5 text-sm rounded
    hover:text-[#008DFF]
    hover:bg-[#008DFF]/10
    transition-colors duration-200
  "
                              onClick={() => setDesktopDropdown(null)}
                            >
                              {item.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </li>

              {/* HIRE DROPDOWN */}
              <li className="relative">
                <button
                  onClick={() => toggleDesktopDropdown("hire")}
                  className="flex items-center hover:text-[#FFC933]"
                >
                  Hire Developer
                  <ChevronDown size={16} className="ml-1" />
                </button>

                {desktopDropdown === "hire" && (
                  <div className="absolute left-0 mt-2 z-50">
                    {/* 🔺 TRIANGLE */}
                    <div
                      className="w-0 h-0 ml-8 border-l-[8px] border-r-[8px] border-b-[10px]
        border-l-transparent border-r-transparent border-[#F3D80E]"
                    />

                    {/* Dropdown Box */}
                    <ul className="bg-white text-black rounded shadow-lg grid grid-cols-1 gap-x-1 min-w-[230px] p-1">
                      {hireDeveloperItems.map((item) => {
                        const slug = hireDeveloperSlugMap[item.name];

                        if (!slug) return null;

                        return (
                          <li key={item.name}>
                            <button
                              onClick={() => {
                                router.push(`/${slug}`);
                                setDesktopDropdown(null);
                              }}
                              className="
    block w-full text-left
    px-3 py-1.5 text-sm rounded
    hover:text-[#008DFF]
    hover:bg-[#008DFF]/10
    transition-colors duration-200
  "
                            >
                              {item.name}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </li>

              {/* ✅ NORMAL LINKS (NO DROPDOWN) */}
              <li>
                <Link href="/portfolio" className="hover:text-[#FFC933]">
                  Portfolio
                </Link>
              </li>

              <li>
                <Link href="/pricing" className="hover:text-[#FFC933]">
                  Pricing
                </Link>
              </li>

              {/* COMPANY DROPDOWN */}
              <li className="relative">
                <button
                  onClick={() => toggleDesktopDropdown("company")}
                  className="flex items-center hover:text-[#FFC933]"
                >
                  Company
                  <ChevronDown size={16} className="ml-1" />
                </button>

                {desktopDropdown === "company" && (
                  <div className="absolute left-0 mt-2 z-50">
                    {/* 🔺 Triangle */}
                    <div
                      className="w-0 h-0 ml-8 border-l-[8px] border-r-[8px] border-b-[10px]
        border-l-transparent border-r-transparent border-[#F3D80E]"
                    />

                    {/* Dropdown Box */}
                    <ul className="bg-white text-black rounded shadow-lg min-w-[200px] p-2">
                      {companyItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className="
    block w-full text-left
    px-3 py-1.5 text-sm rounded
    hover:text-[#008DFF]
    hover:bg-[#008DFF]/10
    transition-colors duration-200
  "
                            onClick={() => setDesktopDropdown(null)}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            </ul>

            {/* Desktop Get In Touch */}
            <button
              onClick={openQuotePopup}
              className="rounded-md bg-[#F3D80E] px-4 py-2 text-base font-semibold text-[#00152DCC]"
            >
              Get In Touch
            </button>
          </div>

          {/* --------------------- Mobile --------------------- */}
          {/* ================= MOBILE HEADER ================= */}
          <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-[#014175] to-[#0089F8] lg:hidden">
            <div className="flex items-center justify-between text-white px-6 py-4">
              {/* Logo */}
              <Link href="/">
                <Image
                  src="/images/landing-page/logo.png"
                  alt="Logo"
                  width={150}
                  height={35}
                />
              </Link>

              {/* Right side */}
              <div className="flex items-center gap-4">
                <button
                  onClick={openQuotePopup}
                  className="rounded-md bg-[#F3D80E] px-2 py-1 text-sm font-semibold text-[#00152DCC]"
                >
                  Get In Touch
                </button>

                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-white"
                >
                  {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* --------------------- Mobile Menu Dropdown --------------------- */}
        <div
          className={`fixed left-0 right-0 top-[50px]  z-50 bg-white text-black
  shadow-lg transition-transform duration-300 ease-out lg:hidden
  ${mobileMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
        >
          <ul className="flex flex-col gap-2 px-6 py-8 text-[16px] font-semibold">
            <li>
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
            </li>

            {[
              { key: "services", label: "Services", items: servicesItems },
              {
                key: "hire",
                label: "Hire Developer",
                items: hireDeveloperItems,
              },
            ].map((menu) => (
              <li key={menu.key}>
                <button
                  className="w-full flex justify-between items-center py-2"
                  onClick={() => toggleMobileDropdown(menu.key as NavKey)}
                >
                  {menu.label}
                  <ChevronDown
                    size={16}
                    className={`transition ${
                      mobileDropdown === menu.key ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Services  Dropdown */}
                {mobileDropdown === menu.key && (
                  <>
                    {/* ===== SERVICES (mobile) ===== */}
                    {menu.key === "services" && (
                      <ul className="grid grid-cols-1 gap-y-2 pl-2">
                        {(menu.items as { name: string }[]).map((item) => {
                          const slug = serviceSlugMap[item.name];
                          if (!slug) return null;

                          return (
                            <li key={item.name}>
                              <button
                                onClick={() => {
                                  router.push(`/${slug}`);
                                  setMobileMenuOpen(false);
                                  setMobileDropdown(null);
                                }}
                                className="text-left text-xs hover:text-[#014175] w-full"
                              >
                                {item.name}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}

                    {/* ===== HIRE (mobile – SAME AS SERVICES) ===== */}
                    {menu.key === "hire" && (
                      <ul className="grid grid-cols-1 gap-y-2 pl-2">
                        {(menu.items as { name: string }[]).map((item) => {
                          const slug = hireDeveloperSlugMap[item.name];
                          if (!slug) return null;

                          return (
                            <li key={item.name}>
                              <button
                                onClick={() => {
                                  router.push(`/${slug}`);
                                  setMobileMenuOpen(false);
                                  setMobileDropdown(null);
                                }}
                                className="text-left text-xs hover:text-[#014175] w-full"
                              >
                                {item.name}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
            <li>
              <Link href="/portfolio" onClick={() => setMobileMenuOpen(false)}>
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}>
                Pricing
              </Link>
            </li>

            <li>
              <button
                className="w-full flex justify-between items-center py-2"
                onClick={() => toggleMobileDropdown("company")}
              >
                Company
                <ChevronDown
                  size={16}
                  className={`transition ${
                    mobileDropdown === "company" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileDropdown === "company" && (
                <ul className="flex flex-col gap-2 pl-4 text-sm">
                  {companyItems.map((item) => (
                    <li key={item.name}>
                      <button
                        onClick={() => {
                          router.push(item.href);
                          setMobileMenuOpen(false);
                          setMobileDropdown(null);
                        }}
                        className="text-left hover:text-[#014175]"
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li className="pt-2">
              <button
                onClick={() => {
                  openQuotePopup();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-[#F3D80E] px-4 py-2 text-sm font-semibold text-[#00152DCC]"
              >
                Get In Touch
              </button>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
