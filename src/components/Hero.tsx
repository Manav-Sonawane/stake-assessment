'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/* ─── Animation constants ─────────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay },
});

/* ─── Hero ────────────────────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section
      aria-label="Hero"
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      {/* ── Full-bleed background image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg.png"
          alt="Luxury property"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pb-10 pt-20 sm:px-6 lg:px-8">

        {/* ══ HEADER — centered ══ */}
        <div className="mb-10 flex flex-col items-center text-center">

          {/* Headline */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.13 } } }}
            className="mb-4 max-w-3xl text-4xl font-extrabold leading-[1.07] tracking-tight sm:text-5xl lg:text-6xl"
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
              }}
              className="block text-white"
            >
              Discover{' '}
              <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                high-growth
              </span>
            </motion.span>
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
              }}
              className="block text-white"
            >
              property investments
            </motion.span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            {...fadeUp(0.32)}
            className="mb-8 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg"
          >
            Join the CEG Equity Token batch. Start building your portfolio
            <br className="hidden sm:block" />
            with fractional ownership of global assets.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.44)}
            className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <motion.a
              href="#signup"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(249,115,22,0.45)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 380, damping: 18 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-colors duration-300 hover:from-orange-400 hover:to-orange-500 sm:w-auto"
            >
              Start Investing
              <ArrowRight size={16} />
            </motion.a>
            <motion.a
              href="#properties"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 380, damping: 18 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3 text-sm font-medium text-white/85 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:text-white sm:w-auto"
            >
              Browse Properties
            </motion.a>
          </motion.div>
        </div>

        {/* ══ VISUAL SECTION ══ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
          /* Relative so arrow can be absolutely centred inside */
          className="relative flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-2"
        >

          {/* ── LEFT: Property image ── */}
          <div className="relative min-h-[220px] w-full flex-1 overflow-hidden rounded-xl sm:min-h-[280px]">
            <Image
              src="/Frame 1.png"
              alt="Luxury fractional property"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />

            {/* Slot glow — marks where the piece belongs */}
            <motion.div
              className="absolute z-10"
              style={{ left: '46%', top: '28%', width: '14%', height: '44%' }}
              animate={{ opacity: [0.35, 0.75, 0.35] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="h-full w-full rounded-sm border border-dashed border-orange-400/70 shadow-[inset_0_0_14px_rgba(249,115,22,0.25),0_0_18px_rgba(249,115,22,0.2)]" />
            </motion.div>

            {/* Jigsaw piece — hovers above slot, drifts toward it */}
            <motion.div
              className="absolute z-20 w-[17%] cursor-pointer"
              style={{ left: '52%', top: '28%' }}
              animate={{
                y:      [0, 6, 3, 0],
                x:      [0, -4, -2, 0],
                rotate: [3, 1, 2, 3],
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{
                y: 30,
                x: -12,
                rotate: 0,
                scale: 1.1,
                transition: { type: 'spring', stiffness: 180, damping: 14 },
              }}
            >
              <Image
                src="/jigsaw.png"
                alt="Puzzle piece — own your fractional share"
                width={112}
                height={112}
                className="h-auto w-full drop-shadow-2xl"
              />
            </motion.div>
          </div>

          {/* ── CENTER: Arrow — absolute, vertically centred, overlaps both sides ── */}
          <div className="hidden lg:flex lg:shrink-0 lg:items-center lg:justify-center">
            <motion.div
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-50 h-14 w-36 -mx-6"
            >
              <Image
                src="/arrow.png"
                alt="Flow indicator"
                fill
                className="object-contain"
                sizes="144px"
              />
            </motion.div>
          </div>

          {/* ── RIGHT: Value card ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.75 }}
            className="flex w-full flex-col justify-between gap-6 rounded-xl border border-white/10 bg-black/50 p-6 backdrop-blur-sm lg:w-64 xl:w-72"
          >
            {/* Value proposition */}
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-widest text-white/40">
                Your entry point
              </p>
              <h2 className="text-2xl font-extrabold leading-snug tracking-tight text-white sm:text-3xl">
                Access premium
                <br />
                property ownership
                <br />
                for{' '}
                <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                  $150
                </span>
              </h2>
            </div>

            {/* Stat card */}
            <div className="rounded-lg border border-white/[0.08] bg-white/[0.04] p-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-white/40">
                All Time Returns
              </p>
              <div className="flex items-end justify-between gap-2">
                <span className="text-xl font-extrabold text-white sm:text-2xl">
                  AED 165,000
                </span>
                <span className="mb-0.5 rounded-full bg-orange-500/15 px-2.5 py-0.5 text-sm font-bold text-orange-400">
                  +111%
                </span>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
