'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─── Types ────────────────────────────────────────────────────────────────── */
interface PriceBatch {
  id: number;
  label: string;
  price: string;
  status: 'sold-out' | 'active' | 'upcoming';
}

/* ─── Data ─────────────────────────────────────────────────────────────────── */
const BATCHES: PriceBatch[] = [
  { id: 1, label: 'Batch 1', price: '$100', status: 'sold-out' },
  { id: 2, label: 'Batch 2', price: '$120', status: 'sold-out' },
  { id: 3, label: 'Batch 3', price: '$135', status: 'sold-out' },
  { id: 4, label: 'Batch 4', price: '$150', status: 'active' },
  { id: 5, label: 'Batch 5', price: '$170', status: 'upcoming' },
  { id: 6, label: 'Batch 6', price: '$190', status: 'upcoming' },
  { id: 7, label: 'Batch 7', price: '$215', status: 'upcoming' },
  { id: 8, label: 'Batch 8', price: '$240', status: 'upcoming' },
];

/* ─── Animation constants ───────────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: EASE, delay: 0.08 + i * 0.07 },
  }),
};

/* ─── Batch Card ────────────────────────────────────────────────────────────── */
function BatchCard({ batch, index }: { batch: PriceBatch; index: number }) {
  const isActive = batch.status === 'active';
  const isSoldOut = batch.status === 'sold-out';

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      whileHover={{
        scale: 1.04,
        transition: { type: 'spring', stiffness: 340, damping: 22 },
      }}
      className={[
        /* base */
        'relative flex min-w-[90px] flex-col items-center gap-1.5 rounded-lg px-4 py-3 cursor-pointer select-none shrink-0',
        /* border + bg */
        isActive
          ? 'border border-orange-500/70 bg-orange-500/10'
          : 'border border-white/10 bg-white/[0.04]',
        /* transition */
        'transition-colors duration-200',
        /* hover border for non-active */
        !isActive && 'hover:border-white/25 hover:bg-white/[0.07]',
      ].join(' ')}
      style={
        isActive
          ? {
              boxShadow:
                '0 0 18px rgba(249,115,22,0.22), inset 0 0 14px rgba(249,115,22,0.06)',
            }
          : undefined
      }
    >
      {/* Active pulse ring */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-lg border border-orange-400/50"
          animate={{ opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <span
        className={[
          'text-[10px] font-semibold uppercase tracking-widest',
          isActive ? 'text-orange-400' : isSoldOut ? 'text-white/30' : 'text-white/40',
        ].join(' ')}
      >
        {batch.label}
      </span>

      <span
        className={[
          'text-base font-extrabold leading-none',
          isActive ? 'text-white' : isSoldOut ? 'text-white/35' : 'text-white/55',
        ].join(' ')}
      >
        {batch.price}
      </span>

      {isActive && (
        <span className="mt-0.5 rounded-full bg-orange-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
          Live
        </span>
      )}

      {isSoldOut && (
        <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/25 line-through">
          Sold
        </span>
      )}
    </motion.div>
  );
}

/* ─── Progress connector bar ────────────────────────────────────────────────── */
function ProgressBar() {
  const soldOutCount = BATCHES.filter((b) => b.status === 'sold-out').length;
  const activeIndex = BATCHES.findIndex((b) => b.status === 'active');
  const progressPct =
    activeIndex >= 0
      ? ((activeIndex + 0.5) / BATCHES.length) * 100
      : (soldOutCount / BATCHES.length) * 100;

  return (
    <div className="relative mb-4 h-1 w-full overflow-hidden rounded-full bg-white/10">
      <motion.div
        className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-400"
        initial={{ width: 0 }}
        whileInView={{ width: `${progressPct}%` }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
        style={{ boxShadow: '0 0 10px rgba(249,115,22,0.55)' }}
      />
    </div>
  );
}

/* ─── Main Export ───────────────────────────────────────────────────────────── */
export default function PriceProgression() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    /* Outer wrapper matches Hero's exact spacing + max-width */
    <div className="relative z-10 w-full bg-black px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-6 rounded-xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-lg"
        >
          {/* ── Header row ── */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-medium text-orange-400">
              Price Progression{' '}
              <span className="text-white/40 font-normal">(200 Tokens)</span>
            </p>

            <div className="flex items-center gap-2">
              {/* Sold-out badge */}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/40">
                <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                Sold Out 1–3
              </span>

              {/* Active badge */}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/40 bg-orange-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-orange-400">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-orange-400"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
                Active 4
              </span>
            </div>
          </div>

          {/* ── Progress bar ── */}
          <ProgressBar />

          {/* ── Batch cards ── */}
          <div className="overflow-x-auto pb-1 -mx-1">
            <motion.div
              className="flex min-w-max gap-2 px-1"
              variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              {BATCHES.map((batch, i) => (
                <BatchCard key={batch.id} batch={batch} index={i} />
              ))}
            </motion.div>
          </div>

          {/* ── Footer note ── */}
          <p className="mt-4 text-[11px] text-white/25 text-right">
            Token price increases with each batch. Early entry = maximum upside.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
