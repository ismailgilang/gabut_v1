"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const timeline = [
  {
    period: "2023 – now",
    role: "Senior Fullstack Engineer",
    org: "Independent Software Consultant",
    note: "Architecting cloud-native web systems, high-concurrency microservices, and design-to-code implementations for tech startups.",
  },
  {
    period: "2021 – 2023",
    role: "Fullstack Developer",
    org: "Tech Innovations Lab",
    note: "Engineered scalable REST/GraphQL APIs with Node.js and Go, while leading frontend feature development with Next.js and TypeScript.",
  },
  {
    period: "2020 – 2021",
    role: "Backend Engineer",
    org: "DataSphere Systems",
    note: "Built high-throughput data ingestion pipelines, optimized PostgreSQL relational schemas, and integrated Redis pub/sub messaging.",
  },
  {
    period: "2019 – 2020",
    role: "Junior Web Developer",
    org: "Digital Studio Co.",
    note: "Developed responsive web interfaces, integrated third-party payment gateways, and maintained automated CI/CD deployment pipelines.",
  },
];

function TimelineContentItem({
  item,
  index,
  total,
  scrollYProgress,
}: {
  item: typeof timeline[0];
  index: number;
  total: number;
  scrollYProgress: any;
}) {
  const step = 1 / total;
  const enterStart = index * step;
  const enterEnd = enterStart + step * 0.35;
  const exitStart = (index + 1) * step - step * 0.3;
  const exitEnd = (index + 1) * step;
  const isLast = index === total - 1;

  const opacity = useTransform(
    scrollYProgress,
    isLast
      ? [enterStart, enterEnd, 1]
      : [enterStart, enterEnd, exitStart, exitEnd],
    isLast
      ? [0, 1, 1]
      : [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    isLast
      ? [enterStart, enterEnd, 1]
      : [enterStart, enterEnd, exitStart, exitEnd],
    isLast
      ? [45, 0, 0]
      : [45, 0, 0, -45]
  );

  const scale = useTransform(
    scrollYProgress,
    isLast
      ? [enterStart, enterEnd, 1]
      : [enterStart, enterEnd, exitStart, exitEnd],
    isLast
      ? [0.97, 1, 1]
      : [0.97, 1, 1, 0.97]
  );

  const filter = useTransform(
    scrollYProgress,
    isLast
      ? [enterStart, enterEnd, 1]
      : [enterStart, enterEnd, exitStart, exitEnd],
    isLast
      ? ["blur(4px)", "blur(0px)", "blur(0px)"]
      : ["blur(4px)", "blur(0px)", "blur(0px)", "blur(4px)"]
  );

  return (
    <motion.div
      style={{ opacity, y, scale, filter }}
      className="absolute inset-0 flex flex-col justify-center pointer-events-none"
    >
      <div className="pointer-events-auto">
        <h3 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.08] text-on-dark tracking-tight">
          {item.role}
        </h3>
        <p className="text-secondary text-xl sm:text-2xl font-semibold mt-3.5 mb-5 tracking-tight">
          {item.org}
        </p>
        <p className="text-dim-dark text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-[46rem]">
          {item.note}
        </p>
      </div>
    </motion.div>
  );
}

function TimelineBullet({
  item,
  index,
  total,
  scrollYProgress,
}: {
  item: typeof timeline[0];
  index: number;
  total: number;
  scrollYProgress: any;
}) {
  const step = 1 / total;
  const threshold = index * step;

  const textColor = useTransform(
    scrollYProgress,
    [threshold - 0.08, threshold],
    ["#7D756F", "#E59B34"]
  );

  const bulletBg = useTransform(
    scrollYProgress,
    [threshold - 0.08, threshold],
    ["#241F1C", "#E59B34"]
  );

  const bulletScale = useTransform(
    scrollYProgress,
    [threshold - 0.08, threshold, threshold + step * 0.5],
    [1, 1.45, 1.15]
  );

  return (
    <div className="flex items-center justify-between relative py-6">
      <motion.span
        style={{ color: textColor }}
        className="font-body font-semibold text-lg sm:text-xl transition-colors tracking-tight"
      >
        {item.period}
      </motion.span>

      {/* Bullet on the vertical line */}
      <motion.div
        style={{
          backgroundColor: bulletBg,
          scale: bulletScale,
        }}
        className="w-4 h-4 rounded-full border-[3px] border-secondary z-10 shrink-0"
      />
    </div>
  );
}

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const lineProgressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative bg-neutral text-on-dark h-[440vh]"
      aria-labelledby="exp-h"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-4 sm:gap-8 items-end mb-10 sm:mb-16">
            <h2 id="exp-h" className="font-display font-semibold text-3xl sm:text-4xl lg:text-5xl leading-tight">
              Engineering Journey
            </h2>
            <p className="max-w-[36rem] text-dim-dark text-base sm:text-lg">
              From web foundations to cloud-scale distributed systems and architecture.
            </p>
          </div>

          {/* Timeline Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-[13rem_1fr] lg:grid-cols-[16rem_1fr] gap-8 sm:gap-14 lg:gap-20 items-center">
            {/* Sisi Kiri */}
            <div className="relative pr-6 sm:pr-9">
              <div
                className="absolute right-[6px] top-6 bottom-6 w-[2px] bg-[#4A413B] rounded-full overflow-hidden"
                aria-hidden="true"
              >
                <motion.div
                  style={{ height: lineProgressHeight }}
                  className="w-full bg-secondary origin-top"
                />
              </div>

              <div className="flex flex-col justify-between min-h-[320px] sm:min-h-[360px]">
                {timeline.map((item, index) => (
                  <TimelineBullet
                    key={item.period}
                    item={item}
                    index={index}
                    total={timeline.length}
                    scrollYProgress={scrollYProgress}
                  />
                ))}
              </div>
            </div>

            {/* Sisi Kanan */}
            <div className="relative min-h-[320px] sm:min-h-[380px] w-full">
              {timeline.map((item, index) => (
                <TimelineContentItem
                  key={item.period}
                  item={item}
                  index={index}
                  total={timeline.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
