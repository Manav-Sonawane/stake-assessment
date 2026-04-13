'use client';

import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react';

/* ─── Fade-up animation helper ──────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const, delay },
});

/* ─── Stats ──────────────────────────────────────────────────────────────── */
const STATS = [
  { value: '$2.4B+', label: 'Assets Tokenized' },
  { value: '18.7%',  label: 'Avg. Annual Yield' },
  { value: '94K+',   label: 'Active Investors' },
];

/* ─── Feature pills ──────────────────────────────────────────────────────── */
const FEATURES = [
  { icon: Shield, text: 'Fully Regulated' },
  { icon: Zap,    text: 'Instant Liquidity' },
  { icon: TrendingUp, text: 'Real Yield' },
];

/* ─── Asset cards ────────────────────────────────────────────────────────── */
const CARDS = [
  { tag: 'Property', name: 'Dubai Marina Tower', apy: '14.2%', raise: '$4.8M', img: '🏙️' },
  { tag: 'Assets',   name: 'Gold Reserve Fund',  apy: '9.4%',  raise: '$2.1M', img: '🪙' },
  { tag: 'Earn',     name: 'STAKE Yield Vault',  apy: '22.1%', raise: '$8.3M', img: '⚡' },
];

export default function Home() {
  return (
    <main className="relative flex flex-col items-center overflow-hidden bg-black text-white">

      {/* ── Radial glow backdrop ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(249,115,22,0.18) 0%, transparent 70%)',
        }}
      />

      {/* ── Hero ── */}
      <section className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-36 pb-24 flex flex-col items-center text-center gap-8">

        {/* Badge */}
        <motion.div {...fadeUp(0.1)}>
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-orange-400">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
            Now live · Tokenized Real-World Assets
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.2)}
          className="max-w-4xl text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.07] tracking-tight"
        >
          Invest in the{' '}
          <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            Real World,
          </span>
          <br />
          On-Chain.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          {...fadeUp(0.3)}
          className="max-w-xl text-lg text-white/55 leading-relaxed"
        >
          STAKE lets you own fractional shares of premium properties, gold reserves,
          and yield-generating vaults — all tokenized, regulated, and liquid.
        </motion.p>

        {/* Feature pills */}
        <motion.div {...fadeUp(0.35)} className="flex flex-wrap justify-center gap-3">
          {FEATURES.map(({ icon: Icon, text }) => (
            <span
              key={text}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/70"
            >
              <Icon size={13} className="text-orange-400" />
              {text}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div {...fadeUp(0.42)} className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <motion.a
            href="#signup"
            whileHover={{ scale: 1.05, boxShadow: '0 0 28px rgba(249,115,22,0.5)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all duration-300"
          >
            Start Investing
            <ArrowRight size={16} />
          </motion.a>
          <motion.a
            href="#properties"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            Browse Properties
          </motion.a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          {...fadeUp(0.52)}
          className="mt-4 flex flex-wrap justify-center gap-8 sm:gap-16"
        >
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">{value}</span>
              <span className="text-xs text-white/40 tracking-wide uppercase">{label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Asset cards ── */}
      <section
        id="properties"
        className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-28"
        aria-label="Featured assets"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {CARDS.map(({ tag, name, apy, raise, img }) => (
            <motion.article
              key={name}
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
              }}
              whileHover={{ y: -6, boxShadow: '0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(249,115,22,0.15)' }}
              className="group relative flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-orange-500/25 hover:bg-white/[0.05] cursor-pointer"
            >
              {/* Icon + tag */}
              <div className="flex items-center justify-between">
                <span className="text-3xl">{img}</span>
                <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-orange-400">
                  {tag}
                </span>
              </div>

              {/* Name */}
              <h2 className="text-base font-semibold text-white leading-snug">{name}</h2>

              {/* Metrics */}
              <div className="flex items-center justify-between border-t border-white/[0.06] pt-4 mt-auto">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] text-white/40 uppercase tracking-wide">APY</span>
                  <span className="text-lg font-bold text-orange-400">{apy}</span>
                </div>
                <div className="flex flex-col gap-0.5 text-right">
                  <span className="text-[11px] text-white/40 uppercase tracking-wide">Total Raise</span>
                  <span className="text-lg font-bold text-white">{raise}</span>
                </div>
              </div>

              {/* Hover CTA */}
              <div className="absolute inset-x-6 bottom-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* ── Bottom gradient fade ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 z-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}
      />
    </main>
  );
}
