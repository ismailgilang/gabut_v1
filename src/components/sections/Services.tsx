import { services } from "@/data/services";
import { SectionTransition, AnimatedObject } from "@/components/motion/Transitions";

export function Services() {
  return (
    <SectionTransition id="services" className="bg-light text-neutral py-16 sm:py-24 lg:py-30" aria-labelledby="svc-h">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 items-end mb-8 sm:mb-12 lg:mb-16">
          <h2 id="svc-h" className="font-display font-semibold text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Services
          </h2>
          <p className="max-w-[36rem] text-dim-light text-base sm:text-lg">
            Four ways to work together, from a short audit to a full engagement.
          </p>
        </div>
        <ul className="list-none p-0 m-0 border-t-2 border-neutral">
          {services.map((item, idx) => (
            <li
              key={item.title}
              className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr_0.8fr] gap-4 sm:gap-6 lg:gap-14 py-8 border-b border-light-line items-start"
            >
              <AnimatedObject delay={0.1 * (idx + 1)}>
                <h3 className="font-display font-semibold text-2xl sm:text-[1.7rem] leading-snug">
                  {item.title}
                </h3>
              </AnimatedObject>
              <AnimatedObject delay={0.15 * (idx + 1)}>
                <p className="text-dim-light text-base leading-relaxed">
                  {item.description}
                </p>
              </AnimatedObject>
              <AnimatedObject delay={0.2 * (idx + 1)}>
                <div className="text-[0.92rem] border-l-3 border-secondary pl-3.5">
                  <b className="block font-semibold text-neutral">Best for</b>
                  <span className="text-dim-light block mt-0.5">{item.bestFor}</span>
                </div>
              </AnimatedObject>
            </li>
          ))}
        </ul>
      </div>
    </SectionTransition>
  );
}
