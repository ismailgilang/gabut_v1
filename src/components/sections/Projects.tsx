"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { SectionTransition } from "@/components/motion/Transitions";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type Project = {
  id: string;
  label: string;
  year: string;
  description: string;
  tags: string[];
  image: string;
};

// Cukup isi proyek asli di sini. Slide tiruan untuk mengisi busur dibuat otomatis.
const projects: Project[] = [
  {
    id: "cloudscale-api-gateway",
    label: "CloudScale API Gateway",
    year: "2024",
    description:
      "A high-throughput distributed API gateway built with Golang and Redis. Handles rate-limiting, JWT authentication, and traffic routing with sub-millisecond overhead.",
    tags: ["Golang", "Redis", "Distributed Systems"],
    image: "images/projects/gateway.svg",
  },
  {
    id: "nexus-enterprise-erp",
    label: "Nexus Enterprise Suite",
    year: "2023",
    description:
      "A full-stack enterprise resource management platform with real-time financial tracking, automated reporting, and role-based permissions serving 50k+ daily operations.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Docker"],
    image: "images/projects/erp.svg",
  },
  {
    id: "eventpulse-streaming-engine",
    label: "EventPulse Stream Engine",
    year: "2023",
    description:
      "Real-time event streaming and telemetry platform processing millions of telemetry events per day with WebSocket feeds and automated alert triggers.",
    tags: ["Node.js", "WebSockets", "Kafka"],
    image: "images/projects/stream.svg",
  },
  {
    id: "quantum-ledger",
    label: "Quantum Ledger",
    year: "2022",
    description:
      "An immutable double-entry accounting ledger with event sourcing, multi-currency reconciliation, and audit-ready transaction history for fintech operations.",
    tags: ["Rust", "Event Sourcing", "PostgreSQL"],
    image: "images/projects/ledger.svg",
  },
  {
    id: "atlas-deploy",
    label: "Atlas Deploy",
    year: "2022",
    description:
      "A zero-downtime deployment orchestrator with canary releases, automated rollbacks, and real-time observability across distributed container clusters.",
    tags: ["Kubernetes", "Go", "Terraform"],
    image: "images/projects/atlas.svg",
  },
];

/* ------------------------------------------------------------------ */
/* Carousel math                                                       */
/* ------------------------------------------------------------------ */

// Busur butuh minimal 7 slide supaya tidak ada kartu yang "loncat" di tepi.
// Jumlah slide dibuat kelipatan jumlah proyek agar urutan ulangnya rapi.
const MIN_SLOTS = 7;
const N = projects.length * Math.ceil(MIN_SLOTS / projects.length);
const slides = Array.from({ length: N }, (_, i) => ({
  key: `${projects[i % projects.length].id}-${i}`,
  projectIndex: i % projects.length,
  isClone: i >= projects.length,
}));

const RS = [0, 7, 12, 24]; // rotasi Y (derajat) per langkah dari tengah
const BASE_W = 320;
const BASE_H = 300;
const PERSPECTIVE = 1200;
const AUTOPLAY_MS = 3500;
const K_MIN = 0.55; // skala kartu terkecil (layar sempit)
const K_MAX = 1.1; // skala kartu terbesar (layar lebar)
const EDGE_REACH = 1.5; // kartu ke-3 menjangkau 150% setengah lebar layar (terpotong tepi)
const STEP = 0.05; // resolusi tabel posisi
const PER = 1 / STEP; // jumlah sampel per 1 slide

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const mod = (n: number, m: number) => ((n % m) + m) % m;

function curve(a: number, arr: number[]) {
  if (a >= 3) return arr[3] + (a - 3) * (arr[3] - arr[2]);
  const i = Math.floor(a);
  return arr[i] + (a - i) * (arr[i + 1] - arr[i]);
}

/** Selisih terpendek slide i terhadap posisi p (bisa negatif), melingkar. */
function offset(i: number, p: number) {
  return mod(i - p + N / 2, N) - N / 2;
}

const cardScale = (a: number) => 0.72 + 0.08 * a * a; // tengah kecil, tepi besar
const halfW = (a: number, k: number) => (BASE_W * k * cardScale(a)) / 2;
const rad = (a: number) => (curve(a, RS) * Math.PI) / 180;

/**
 * Posisi X kartu berikutnya (a + 1) agar tepi dalamnya tepat berjarak `gap`
 * dari tepi luar kartu a. Rumusnya memperhitungkan perspektif (sisi dekat
 * membesar, sisi jauh mengecil), jadi kartu tidak pernah bertumpuk.
 */
function nextX(a: number, x: number, gap: number, k: number) {
  const P = PERSPECTIVE;
  const h = halfW(a, k);
  const r = rad(a);
  const outerEdge = ((x + h * Math.cos(r)) * P) / (P - h * Math.sin(r));
  const b = a + 1;
  const hb = halfW(b, k);
  const rb = rad(b);
  return ((outerEdge + gap) * (P + hb * Math.sin(rb))) / P + hb * Math.cos(rb);
}

type Layout = { k: number; step: number; table: Float64Array };

function makeTable(gap: number, k: number): Float64Array {
  const len = Math.ceil(Math.max(4.5, N / 2 + 1) / STEP) + 1;
  const t = new Float64Array(len);
  const x1 = nextX(0, 0, gap, k);
  for (let j = 0; j < len; j++) {
    t[j] = j <= PER ? j * STEP * x1 : nextX((j - PER) * STEP, t[j - PER], gap, k);
  }
  return t;
}

function outerEdgeOfThird(t: Float64Array, k: number) {
  const P = PERSPECTIVE;
  const x = t[Math.round(3 / STEP)];
  const h = halfW(3, k);
  const r = rad(3);
  return ((x + h * Math.cos(r)) * P) / (P - h * Math.sin(r));
}

/** Susun busur supaya mengisi seluruh lebar stage (W), tanpa kartu bertumpuk. */
function buildLayout(W: number): Layout {
  const want = (W / 2) * EDGE_REACH;
  const gapOf = (k: number) => 20 * k; // jarak minimum antar kartu
  const edgeAt = (k: number, gap = gapOf(k)) =>
    outerEdgeOfThird(makeTable(gap, k), k);

  // 1) cari skala kartu terbesar yang masih muat di lebar layar
  let k: number;
  if (edgeAt(K_MAX) <= want) k = K_MAX;
  else if (edgeAt(K_MIN) >= want) k = K_MIN;
  else {
    let lo = K_MIN;
    let hi = K_MAX;
    for (let i = 0; i < 24; i++) {
      const m = (lo + hi) / 2;
      if (edgeAt(m) < want) lo = m;
      else hi = m;
    }
    k = lo;
  }

  // 2) di layar sangat lebar kartu sudah mentok K_MAX: lebarkan jaraknya
  let gap = gapOf(k);
  if (edgeAt(k, gap) < want) {
    let lo = gap;
    let hi = gap + 1200;
    for (let i = 0; i < 24; i++) {
      const m = (lo + hi) / 2;
      if (edgeAt(k, m) < want) lo = m;
      else hi = m;
    }
    gap = hi;
  }

  const table = makeTable(gap, k);
  return { k, step: table[PER], table };
}

function xOf(a: number, L: Layout) {
  const t = L.table;
  const f = a / STEP;
  const i = Math.floor(f);
  if (i + 1 >= t.length) {
    const last = t.length - 1;
    return t[last] + (a - last * STEP) * ((t[last] - t[last - 1]) / STEP);
  }
  return t[i] + (f - i) * (t[i + 1] - t[i]);
}

const stageHeight = (k: number) =>
  Math.max(300, Math.round(BASE_H * k * cardScale(3) * 1.12));

const DEFAULT_LAYOUT = buildLayout(1440); // dipakai saat SSR sebelum lebar diukur

function slideStyle(d: number, L: Layout) {
  const a = Math.abs(d);
  const s = d < 0 ? -1 : 1;
  const x = s * xOf(a, L);
  const scale = L.k * cardScale(a);
  const rot = -s * curve(a, RS);
  const opacity = Math.max(0, Math.min(1, (3.5 - a) * 2));
  return {
    transform: `translateX(${x}px) rotateY(${rot}deg) scale(${scale})`,
    opacity,
    // kartu terbesar (paling dekat ke penonton) berada paling depan
    zIndex: Math.round(a * 10),
    // visibility:hidden mengeluarkan kartu tak terlihat dari urutan Tab
    visibility: (opacity <= 0 ? "hidden" : "visible") as "hidden" | "visible",
    pointerEvents: (opacity < 0.15 ? "none" : "auto") as "none" | "auto",
  } satisfies CSSProperties;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function Projects() {
  const stageRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const posRef = useRef(0);
  const targetRef = useRef(0);
  const layoutRef = useRef<Layout>(DEFAULT_LAYOUT);
  const lastActRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const dragRef = useRef<{ x: number; t: number } | null>(null);
  const movedRef = useRef(false);
  const holdRef = useRef(false);
  const visibleRef = useRef(true);
  const reduceRef = useRef(false);

  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  /* Terapkan posisi ke DOM langsung (tanpa re-render React per frame). */
  const applyLayout = useCallback(() => {
    const pos = posRef.current;
    const L = layoutRef.current;
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const st = slideStyle(offset(i, pos), L);
      el.style.transform = st.transform;
      el.style.opacity = String(st.opacity);
      el.style.zIndex = String(st.zIndex);
      el.style.visibility = st.visibility;
      el.style.pointerEvents = st.pointerEvents;
    });
    // State React hanya berubah saat slide aktif berganti, bukan tiap frame.
    const act = mod(Math.round(pos), N);
    if (act !== lastActRef.current) {
      lastActRef.current = act;
      setActiveSlide(act);
    }
  }, []);

  /* Loop animasi hanya jalan saat ada yang bergerak (tidak idle terus-menerus). */
  const step = useCallback(() => {
    const diff = targetRef.current - posRef.current;
    if (Math.abs(diff) < 0.001) {
      posRef.current = targetRef.current;
      applyLayout();
      rafRef.current = null;
      return;
    }
    posRef.current += reduceRef.current ? diff : diff * 0.12;
    applyLayout();
    rafRef.current = requestAnimationFrame(step);
  }, [applyLayout]);

  const kick = useCallback(() => {
    if (rafRef.current === null) rafRef.current = requestAnimationFrame(step);
  }, [step]);

  const go = useCallback(
    (k: number) => {
      targetRef.current = Math.round(targetRef.current) + k;
      kick();
    },
    [kick]
  );

  /* Ukuran stage + preferensi reduced-motion (sebelum paint, tanpa flash). */
  useIsoLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => {
      reduceRef.current = mq.matches;
      setReduced(mq.matches);
    };
    onMq();
    mq.addEventListener("change", onMq);

    const measure = () => {
      const L = buildLayout(stage.clientWidth || 1440);
      layoutRef.current = L;
      stage.style.height = `${stageHeight(L.k)}px`;
      applyLayout();
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);

    return () => {
      ro.disconnect();
      mq.removeEventListener("change", onMq);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [applyLayout]);

  /* Autoplay hanya saat section terlihat. */
  useEffect(() => {
    const el = stageRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([e]) => {
        visibleRef.current = e.isIntersecting;
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => {
      if (
        !holdRef.current &&
        !dragRef.current &&
        visibleRef.current &&
        !document.hidden
      ) {
        go(1);
      }
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduced, paused, go]);

  /* Handler (React props, jadi otomatis dibersihkan saat unmount / StrictMode). */
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      go(-1);
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
      go(1);
      e.preventDefault();
    }
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    dragRef.current = { x: e.clientX, t: targetRef.current };
    movedRef.current = false;
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (!movedRef.current && Math.abs(dx) > 6) {
      movedRef.current = true;
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    if (movedRef.current) {
      targetRef.current = d.t - dx / layoutRef.current.step;
      kick();
    }
  };

  const endDrag = () => {
    if (dragRef.current && movedRef.current) {
      targetRef.current = Math.round(targetRef.current);
      kick();
    }
    dragRef.current = null;
    setTimeout(() => {
      movedRef.current = false;
    }, 0);
  };

  const active = projects[slides[activeSlide].projectIndex];

  return (
    <SectionTransition
      id="projects"
      className="bg-[#E3E7E1] text-neutral overflow-hidden"
      aria-labelledby="proj-h"
    >
      {/* Intro */}
      <div className="pt-[clamp(56px,8vw,84px)] text-center max-w-[44rem] mx-auto px-5">
        <p className="text-tertiary text-[0.95rem] font-semibold tracking-[-0.01em]">
          Featured Work
        </p>
        <h2
          id="proj-h"
          className="font-display font-bold uppercase tracking-[-0.045em] leading-[0.9] text-balance text-neutral mt-[clamp(20px,3vw,32px)]"
          style={{ fontSize: "clamp(2.6rem, 7.4vw, 4.6rem)" }}
        >
          High-impact engineering projects
        </h2>
        <p className="mt-[18px] max-w-[23rem] mx-auto text-[0.9rem] leading-[1.45] font-medium tracking-[-0.005em] text-neutral">
          Distributed systems, fullstack platforms, and{" "}
          <em className="not-italic text-dim-light">
            real-time architectures built for scale.
          </em>
        </p>
        <a
          href="#contact"
          className="inline-block mt-6 bg-primary hover:-translate-y-0.5 transition-transform duration-150 motion-reduce:transition-none text-white font-semibold text-[0.9rem] px-6 py-3 rounded-full focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-neutral"
        >
          Work With Me
        </a>
      </div>

      {/* 3D carousel */}
      <div className="relative mt-[clamp(12px,2vw,24px)]">
        <div
          ref={stageRef}
          role="group"
          aria-roledescription="carousel"
          aria-label="Featured projects"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerEnter={(e) => {
            if (e.pointerType === "mouse") holdRef.current = true;
          }}
          onPointerLeave={(e) => {
            if (e.pointerType === "mouse") holdRef.current = false;
          }}
          onFocus={() => {
            holdRef.current = true;
          }}
          onBlur={() => {
            holdRef.current = false;
          }}
          className="relative w-full touch-pan-y cursor-grab active:cursor-grabbing select-none outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neutral"
          style={{
            height: stageHeight(DEFAULT_LAYOUT.k),
            perspective: `${PERSPECTIVE}px`,
          }}
        >
          <ul className="list-none p-0 m-0 absolute inset-0">
            {slides.map((slide, i) => {
              const project = projects[slide.projectIndex];
              return (
                <li
                  key={slide.key}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  className="absolute will-change-transform"
                  style={{
                    left: "50%",
                    top: "50%",
                    width: BASE_W,
                    height: BASE_H,
                    margin: `${-BASE_H / 2}px 0 0 ${-BASE_W / 2}px`,
                    // posisi awal sudah benar saat SSR/hydration, tidak ada kartu menumpuk
                    ...slideStyle(offset(i, 0), DEFAULT_LAYOUT),
                  }}
                >
                  <button
                    type="button"
                    // salinan hanya untuk mengisi busur; sembunyikan dari screen reader & Tab
                    aria-hidden={slide.isClone || undefined}
                    tabIndex={slide.isClone ? -1 : undefined}
                    aria-label={`${project.label}, ${slide.projectIndex + 1} of ${projects.length}`}
                    aria-current={i === activeSlide ? "true" : undefined}
                    onClick={() => {
                      if (movedRef.current) return;
                      go(Math.round(offset(i, targetRef.current)));
                    }}
                    className="block w-full h-full border-0 p-0 rounded-[18px] overflow-hidden relative cursor-[inherit] bg-[#cfd8da] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-neutral focus-visible:ring-offset-4 focus-visible:ring-offset-[#E3E7E1]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt=""
                      draggable={false}
                      decoding="async"
                      loading={i < 4 ? "eager" : "lazy"}
                      className="absolute inset-0 w-full h-full object-cover block pointer-events-none"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Info proyek aktif */}
      <div className="text-center px-5 pt-10 pb-[clamp(40px,6vw,72px)] max-w-[44rem] mx-auto">
        {/* Kontrol */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {!reduced && (
            <button
              type="button"
              onClick={() => setPaused((v) => !v)}
              aria-label={paused ? "Start autoplay" : "Pause autoplay"}
              className="ml-2 h-10 px-4 rounded-full text-[0.85rem] font-semibold text-neutral underline underline-offset-4 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-neutral"
            >
              {paused ? "Play" : "Pause"}
            </button>
          )}
        </div>

        {/* min-height mencegah halaman "melompat" saat panjang deskripsi berbeda.
            Diumumkan screen reader hanya jika autoplay dijeda. */}
        <div className="min-h-[14rem]" aria-live={paused || reduced ? "polite" : "off"}>
          <p className="text-[0.9rem] font-semibold text-tertiary mb-1">{active.year}</p>
          <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-neutral leading-tight">
            {active.label}
          </h3>
          <p className="mt-3 text-dim-light text-[0.9rem] leading-relaxed max-w-[28rem] mx-auto">
            {active.description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {active.tags.map((tag) => (
              <span
                key={tag}
                className="border border-tertiary text-tertiary rounded-full px-3 py-0.5 text-[0.82rem] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionTransition>
  );
}