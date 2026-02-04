"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Navbar from "./NavBar";


export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isDashboard = pathname.startsWith("/dashboard");
  const isLogin = pathname.startsWith("/login");

  const [showQuote, setShowQuote] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar + Footer hidden on dashboard*/}
      {!isDashboard && (
        <Navbar openQuotePopup={() => setShowQuote(true)} />
      )}

      <main className="flex-1">{children}</main>

      
    </div>
  );
}
