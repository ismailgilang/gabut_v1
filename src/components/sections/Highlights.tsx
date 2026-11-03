import { SectionTransition, AnimatedObject } from "@/components/motion/Transitions";

export function Highlights() {
  return (
    <SectionTransition className="bg-secondary text-neutral py-12 sm:py-16 lg:py-20" aria-label="Highlights">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">
        <ul className="list-none p-0 m-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          <li className="lg:px-6 xl:px-8 lg:border-l-0 border-neutral/30 sm:border-none">
            <AnimatedObject delay={0.1}>
              <strong className="block font-display font-bold text-5xl sm:text-6xl xl:text-7xl leading-none tracking-tight">
                5+
              </strong>
              <span className="block mt-2.5 font-medium max-w-[14rem] text-base leading-snug">
                years writing clean production code
              </span>
            </AnimatedObject>
          </li>
          <li className="lg:px-6 xl:px-8 lg:border-l-2 lg:border-neutral">
            <AnimatedObject delay={0.15}>
              <strong className="block font-display font-bold text-5xl sm:text-6xl xl:text-7xl leading-none tracking-tight">
                99.9%
              </strong>
              <span className="block mt-2.5 font-medium max-w-[14rem] text-base leading-snug">
                uptime maintained across production services
              </span>
            </AnimatedObject>
          </li>
          <li className="lg:px-6 xl:px-8 lg:border-l-2 lg:border-neutral">
            <AnimatedObject delay={0.2}>
              <strong className="block font-display font-bold text-5xl sm:text-6xl xl:text-7xl leading-none tracking-tight">
                40%
              </strong>
              <span className="block mt-2.5 font-medium max-w-[14rem] text-base leading-snug">
                average latency reduction through optimization
              </span>
            </AnimatedObject>
          </li>
          <li className="lg:px-6 xl:px-8 lg:border-l-2 lg:border-neutral">
            <AnimatedObject delay={0.25}>
              <strong className="block font-display font-bold text-5xl sm:text-6xl xl:text-7xl leading-none tracking-tight">
                20+
              </strong>
              <span className="block mt-2.5 font-medium max-w-[14rem] text-base leading-snug">
                shipped applications & microservices
              </span>
            </AnimatedObject>
          </li>
        </ul>
      </div>
    </SectionTransition>
  );
}
