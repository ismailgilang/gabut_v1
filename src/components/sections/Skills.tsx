"use client";

import { skillCategories } from "@/data/skills";
import { SectionTransition } from "@/components/motion/Transitions";

export function Skills() {
  // Ambil semua skills menjadi 2 baris terpisah untuk variasi arah marquee
  const allSkills = skillCategories.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, category: cat.label }))
  );

  const half = Math.ceil(allSkills.length / 2);
  const row1 = allSkills.slice(0, half);
  const row2 = allSkills.slice(half);

  // Gandakan item untuk seamless infinite loop
  const duplicatedRow1 = [...row1, ...row1, ...row1, ...row1];
  const duplicatedRow2 = [...row2, ...row2, ...row2, ...row2];

  return (
    <SectionTransition id="skills" className="bg-light text-neutral py-16 sm:py-24 lg:py-30 overflow-hidden" aria-labelledby="skills-h">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 mb-10 sm:mb-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 items-end">
          <h2 id="skills-h" className="font-display font-semibold text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Tech stack and skills
          </h2>
          <p className="max-w-[36rem] text-dim-light text-base sm:text-lg">
            The tools I use every week, grouped by what they help me do.
          </p>
        </div>
      </div>

      {/* Marquee Container dengan Masking Gradient Opacity to 0 di kedua sisi */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        {/* Row 1 - Gerak ke kiri */}
        <div className="flex gap-4 w-max animate-[marquee_80s_linear_infinite] hover:[animation-play-state:paused] py-2">
          {duplicatedRow1.map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className="flex items-center gap-3.5 bg-neutral/[0.04] border border-light-line px-5 py-3.5 rounded-full shrink-0 select-none transition-colors hover:border-tertiary"
            >
              <span className="font-body font-semibold text-neutral text-base tracking-tight">
                {item.label}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary" aria-hidden="true" />
              <span className="text-dim-light text-sm font-medium">
                {item.note}
              </span>
            </div>
          ))}
        </div>

        {/* Row 2 - Gerak ke kanan (reverse) */}
        <div className="flex gap-4 w-max animate-[marquee-reverse_88s_linear_infinite] hover:[animation-play-state:paused] py-2 mt-4">
          {duplicatedRow2.map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className="flex items-center gap-3.5 bg-neutral/[0.04] border border-light-line px-5 py-3.5 rounded-full shrink-0 select-none transition-colors hover:border-secondary"
            >
              <span className="font-body font-semibold text-neutral text-base tracking-tight">
                {item.label}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" aria-hidden="true" />
              <span className="text-dim-light text-sm font-medium">
                {item.note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionTransition>
  );
}
