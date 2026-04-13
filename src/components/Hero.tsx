'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/* ─── Constants ───────────────────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;
const EASE_SNAP = [0.34, 1.56, 0.64, 1] as const; // overshoot spring feel

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/*
 * Steps
 * 0  initial    — bg super-dark, frame image hidden, piece/arrow/card hidden
 * 1  text-in    — hero headline + subtext fade up (0.2s delay)
 * 2  image-in   — Frame 1.png slides up from below, fades in
 * 3  piece-fly  — jigsaw travels diagonally toward slot
 * 4  snap       — piece locks in with bounce
 * 5  glow       — slot glows, overlay brightens
 * 6  shift      — image container nudges left
 * 7  arrow-in   — arrow slides in
 * 8  card-in    — card fades in from right
 */

export default function Hero() {
  const [step, setStep] = useState(0);
  const overlayControls = useAnimation(); // bg overlay dimming
  const imageControls = useAnimation(); // image container (y + opacity, then x shift)
  const pieceControls = useAnimation(); // jigsaw piece
  const slotGlowControls = useAnimation(); // dashed slot glow

  useEffect(() => {
    const run = async () => {
      /* ── Initial frozen state ── */
      overlayControls.set({ backgroundColor: 'rgba(0,0,0,0.78)' });
      imageControls.set({ y: 52, opacity: 0, x: 0 });
      pieceControls.set({ x: 240, y: -210, rotate: 42, opacity: 0, scale: 1 });
      slotGlowControls.set({ opacity: 0 });

      /* ── 1: Text reveals (immediately, 0.2s css delay handles stagger) ── */
      setStep(1);

      /* ── 2: Frame image slides up from below ── */
      await wait(600);
      setStep(2);
      await imageControls.start({
        y: 0, opacity: 1,
        transition: { duration: 0.78, ease: EASE },
      });

      /* ── 3: Piece flies diagonally toward slot ── */
      await wait(280);
      setStep(3);
      await pieceControls.start({
        x: 20, y: -45, rotate: 8, opacity: 1,
        transition: { duration: 0.85, ease: EASE },
      });

      /* ── 4: Snap into slot ── */
      setStep(4);
      await pieceControls.start({
        x: 0, y: 0, rotate: 0,
        transition: { duration: 0.4, ease: EASE_SNAP },
      });
      /* Bounce pop — quick spring feel */
      await pieceControls.start({
        scale: [1, 1.16, 0.90, 1.05, 1],
        transition: { duration: 0.44, times: [0, 0.22, 0.55, 0.78, 1] },
      });

      /* ── 5: Slot glows + overlay brightens ── */
      await wait(100);
      setStep(5);
      overlayControls.start({                          // fire-and-forget
        backgroundColor: 'rgba(0,0,0,0.6)',
        transition: { duration: 1.15, ease: 'easeInOut' },
      });
      slotGlowControls.start({
        opacity: [0, 0.9, 0.5, 0.75, 0.5],
        transition: {
          duration: 1.6, times: [0, 0.12, 0.45, 0.65, 1],
          repeat: Infinity, ease: 'easeInOut',
        },
      });
      /* Piece resumes gentle idle float */
      pieceControls.start({
        x: [0, -3, -1.5, 0], y: [0, 4, 2, 0], rotate: [0, 1, 0.5, 0],
        transition: { duration: 3.6, repeat: Infinity, ease: 'easeInOut' },
      });

      /* ── 6: Image nudges left (image + piece shift together) ── */
      await wait(580);
      setStep(6);
      imageControls.start({                            // fire-and-forget
        x: -12,
        transition: { duration: 0.7, ease: EASE },
      });

      /* ── 7: Arrow slides in ── */
      await wait(320);
      setStep(7);

      /* ── 8: Card slides in from right ── */
      await wait(380);
      setStep(8);
    };

    run();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ─────────────────────────────────────────── RENDER ─ */
  return (
    <section
      aria-label="Hero"
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg.png"
          alt="Luxury property"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Animated overlay */}
        <motion.div className="absolute inset-0" animate={overlayControls} />
        {/* Static gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/85" />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pb-10 pt-20 sm:px-6 lg:px-8">

        {/* ══ HEADER — step 1 ══ */}
        <motion.div
          className="mb-10 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 28 }}
          animate={step >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.75, ease: EASE, delay: 0.2 }}
        >
          <h1 className="mb-4 max-w-3xl text-4xl font-extrabold leading-[1.07] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="block text-white">
              Discover{' '}
              <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                high-growth
              </span>
            </span>
            <span className="block text-white">property investments</span>
          </h1>

          <div className="mb-8 max-w rounded-xl border border-white/10 bg-white/5 backdrop-blur-md px-2 py-4 shadow-lg">
            <p className="text-base leading-relaxed text-white/70 sm:text-lg">
              Join the CEG Equity Token batch. Start building your portfolio
              <br className="hidden sm:block" />
              with fractional ownership of global assets.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <motion.a
              href="#signup"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(249,115,22,0.45)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 320, damping: 18 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 hover:from-orange-400 hover:to-orange-500 sm:w-auto"
            >
              Start Investing
              <ArrowRight size={16} />
            </motion.a>
            <motion.a
              href="#properties"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 320, damping: 18 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3 text-sm font-medium text-white/85 backdrop-blur-sm hover:border-white/40 hover:bg-white/10 hover:text-white sm:w-auto"
            >
              Browse Properties
            </motion.a>
          </div>
        </motion.div>

        {/* ══ VISUAL SECTION ══ */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-2">

          {/* ── LEFT: Puzzle image — step 2 ──
               Note: pieceControls inside this container inherit the container's
               x shift at step 6, so the piece moves left with the image ✓     */}
          <motion.div
            animate={imageControls}
            className="relative min-h-[220px] w-full flex-1 overflow-hidden rounded-xl sm:min-h-[280px]"
            style={{ willChange: 'transform, opacity' }}
          >
            <Image
              src="/Frame 1.png"
              alt="Luxury fractional property"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />

            {/* Slot glow — appears after snap (step 5) */}
            <motion.div
              className="absolute z-10"
              style={{ left: '48%', top: '33%', width: '14%', height: '40%' }}
              animate={slotGlowControls}
            >
              <div className="h-full w-full rounded-sm shadow-[inset_0_0_18px_rgba(249,115,22,0.35),0_0_22px_rgba(249,115,22,0.28)]" />
            </motion.div>

            {/* Jigsaw piece
                Base CSS position  = slot center (48%, 33%)
                Initial transform  = x:240 y:-210 (far top-right, off-screen)
                Mid-flight         = x:20  y:-45  (close approach, slight rotation)
                Snapped            = x:0   y:0    (exactly on slot)
                After snap         = idle float loop                              */}
            <motion.div
              animate={pieceControls}
              className="absolute z-20 w-[17%] cursor-pointer"
              style={{ left: '48%', top: '33%', willChange: 'transform' }}
              whileHover={
                step >= 5
                  ? {
                    scale: 1.09,
                    filter: 'drop-shadow(0 0 10px rgba(249,115,22,0.55))',
                    transition: { type: 'spring', stiffness: 300, damping: 16 },
                  }
                  : {}
              }
            >
              <Image
                src="/jigsaw.png"
                alt="Puzzle piece — own your fractional share"
                width={112}
                height={112}
                className="h-auto w-full drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>

          {/* ── CENTER: Arrow — step 7 ── */}
          <motion.div
            className="hidden shrink-0 items-center justify-center lg:flex"
            initial={{ opacity: 0, x: -20 }}
            animate={step >= 7 ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <motion.div
              animate={step >= 7 ? { x: [0, 7, 0] } : {}}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              className="relative z-50 -mx-6 h-14 w-36"
            >
              <Image
                src="/arrow.png"
                alt="Flow arrow"
                fill
                className="object-contain"
                sizes="144px"
              />
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Value card — step 8 ── */}
          <motion.div
            className="flex w-full flex-col justify-between gap-6 rounded-xl border border-white/10 bg-black/50 p-6 backdrop-blur-sm lg:w-64 xl:w-72"
            initial={{ opacity: 0, x: 56, scale: 0.95 }}
            animate={
              step >= 8
                ? { opacity: 1, x: 0, scale: 1 }
                : { opacity: 0, x: 56, scale: 0.95 }
            }
            transition={{ duration: 0.65, ease: EASE }}
          >
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

        </div>
      </div>
    </section>
  );
}
