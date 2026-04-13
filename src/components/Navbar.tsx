"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

/* ─── Nav Links ─────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Properties", href: "#properties" },
  { label: "Assets", href: "#assets" },
  { label: "Earn", href: "#earn" },
];

/* ─── Animated underline link ────────────────────────────────────────────── */
function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="relative group text-zinc-400 hover:text-white text-base font-medium tracking-wide transition-colors duration-300"
    >
      {label}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-orange-500 transition-all duration-300 group-hover:w-full" />
    </a>
  );
}

/* ─── CTA Button (UPDATED) ───────────────────────────────────────────────── */
function CTAButton({
  children,
  variant = "primary",
  href = "#",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  href?: string;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2 text-base transition-all duration-300";

  if (variant === "ghost") {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className={`${base} font-medium text-white/70 hover:text-white border border-orange-500/30 shadow-[0_0_10px_rgba(249,115,22,0.2)] hover:shadow-[0_0_18px_rgba(249,115,22,0.45)] hover:border-orange-400 ${className}`}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.a
      href={href}
      whileHover={{
        scale: 1.06,
        boxShadow: "0 0 22px rgba(249,115,22,0.55)",
      }}
      whileTap={{ scale: 0.97 }}
      className={`${base} font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 shadow-lg shadow-orange-500/25 ${className}`}
    >
      {children}
    </motion.a>
  );
}

/* ─── Navbar ─────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Main Navbar ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-black/60 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.5)] shadow-orange-500/[0.04]"
            : "bg-transparent border-b border-transparent",
        ].join(" ")}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">

            {/* Logo */}
            <motion.a
              href="/"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="text-2xl font-extrabold tracking-[0.2em] uppercase text-orange-500 select-none"
            >
              STAKE
            </motion.a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.label} {...link} />
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <CTAButton variant="ghost" href="#login">
                Login
              </CTAButton>
              <CTAButton variant="primary" href="#signup">
                Sign Up
              </CTAButton>
            </div>

            {/* Mobile Menu */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Dropdown ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed top-16 left-0 right-0 z-40 bg-black/90 backdrop-blur-xl border-b border-white/[0.07] md:hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">

              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-white/70 hover:text-white py-2"
                >
                  {link.label}
                </a>
              ))}

              <div className="flex flex-col gap-3 mt-4">
                <CTAButton variant="ghost" href="#login">
                  Login
                </CTAButton>
                <CTAButton variant="primary" href="#signup">
                  Sign Up
                </CTAButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}