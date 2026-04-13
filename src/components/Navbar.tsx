'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

/* ─── Nav Links ─────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Properties', href: '#properties' },
  { label: 'Assets', href: '#assets' },
  { label: 'Earn', href: '#earn' },
];

/* ─── Animated underline link ────────────────────────────────────────────── */
function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="relative group text-zinc-400 hover:text-white text-base font-medium tracking-wide transition-colors duration-300"
    >
      {label}
      {/* Underline that slides left → right */}
      <span
        className="absolute -bottom-0.5 left-0 h-px w-0 bg-orange-500 transition-all duration-300 group-hover:w-full"
      />
    </a>
  );
}

/* ─── CTA Button ─────────────────────────────────────────────────────────── */
function CTAButton({ children, variant = 'primary', href = '#' }: {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
  href?: string;
}) {
  if (variant === 'ghost') {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center justify-center rounded-full px-5 py-2 text-base font-medium text-white/70 hover:text-white border border-white/10 hover:border-white/30 transition-all duration-300"
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
        boxShadow: '0 0 22px rgba(249,115,22,0.55)',
      }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex items-center justify-center rounded-full px-5 py-2 text-base font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 transition-all duration-300 shadow-lg shadow-orange-500/25"
    >
      {children}
    </motion.a>
  );
}

/* ─── Navbar ─────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Main bar ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-black/60 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.5)] shadow-orange-500/[0.04]'
            : 'bg-transparent border-b border-transparent',
        ].join(' ')}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">

            {/* ── Logo ── */}
            <motion.a
              href="/"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="text-2xl font-extrabold tracking-[0.2em] uppercase text-orange-500 select-none"
              aria-label="STAKE home"
            >
              STAKE
            </motion.a>

            {/* ── Desktop nav links (center) ── */}
            <nav
              aria-label="Desktop navigation"
              className="hidden md:flex items-center gap-8"
            >
              {NAV_LINKS.map(({ href, label }) => (
                <NavLink key={label} href={href} label={label} />
              ))}
            </nav>

            {/* ── Desktop CTAs ── */}
            <div className="hidden md:flex items-center gap-3">
              <CTAButton variant="ghost" href="#login">Login</CTAButton>
              <CTAButton variant="primary" href="#signup">Sign Up</CTAButton>
            </div>

            {/* ── Mobile hamburger ── */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-300"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X size={20} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

          </div>
        </div>
      </motion.header>

      {/* ── Mobile dropdown menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-16 left-0 right-0 z-40 bg-black/90 backdrop-blur-2xl border-b border-white/[0.07] md:hidden"
            role="dialog"
            aria-label="Mobile navigation menu"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-col gap-5">

              {/* Nav links */}
              <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
                {NAV_LINKS.map(({ href, label }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.07, duration: 0.25 }}
                    onClick={() => setMobileOpen(false)}
                    className="text-white/75 hover:text-white text-base font-medium py-2.5 px-3 rounded-lg hover:bg-white/5 transition-all duration-200 tracking-wide"
                  >
                    {label}
                  </motion.a>
                ))}
              </nav>

              {/* Divider */}
              <div className="h-px bg-white/[0.07]" role="separator" />

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.25 }}
                className="flex flex-col gap-3"
              >
                <a
                  href="#login"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center rounded-full py-2.5 text-base font-medium text-white/70 hover:text-white border border-white/10 hover:border-white/30 transition-all duration-300"
                >
                  Login
                </a>
                <a
                  href="#signup"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center rounded-full py-2.5 text-base font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 shadow-lg shadow-orange-500/25 transition-all duration-300"
                >
                  Sign Up
                </a>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
