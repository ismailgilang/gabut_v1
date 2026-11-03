import { SectionTransition, AnimatedObject } from "@/components/motion/Transitions";

export function Introduction() {
  return (
    <SectionTransition id="about" className="bg-light text-neutral py-16 sm:py-24 lg:py-30" aria-labelledby="about-h">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 items-end mb-8 sm:mb-12 lg:mb-16">
          <h2 id="about-h" className="font-display font-semibold text-3xl sm:text-4xl lg:text-5xl leading-tight text-balance">
            About me
          </h2>
          <p className="max-w-[36rem] text-dim-light text-base sm:text-lg">
            Engineering solid software from database schemas to client-side performance.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 sm:gap-12 lg:gap-24">
          <AnimatedObject delay={0.1}>
            <p className="font-display font-medium text-2xl sm:text-3xl leading-snug tracking-tight text-pretty">
              I build web software with a focus on maintainability, type-safety, and speed. Good code isn't just about making it work; it's about making it reliable and effortless to evolve.
            </p>
          </AnimatedObject>
          <AnimatedObject delay={0.2}>
            <div className="space-y-4 text-dim-light leading-relaxed text-base sm:text-[1.0625rem]">
              <p>
                As a fullstack developer, I bridge the gap between intuitive user experiences and rock-solid backend infrastructure. Whether designing relational schemas, building event-driven microservices, or tuning client bundle sizes, I care deeply about end-user experience and developer velocity.
              </p>
              <p>
                My go-to stack centers around TypeScript, Next.js, Node.js, Golang, and modern SQL databases, backed by automated CI/CD and containerized deployments.
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-5 mt-9 pt-6 border-t-2 border-neutral">
              <div>
                <dt className="text-[0.9rem] text-dim-light">Location</dt>
                <dd className="font-semibold text-neutral text-base mt-1">Indonesia (GMT+7)</dd>
              </div>
              <div>
                <dt className="text-[0.9rem] text-dim-light">Specialization</dt>
                <dd className="font-semibold text-neutral text-base mt-1">Fullstack Web & API Design</dd>
              </div>
              <div>
                <dt className="text-[0.9rem] text-dim-light">Languages</dt>
                <dd className="font-semibold text-neutral text-base mt-1">Bahasa Indonesia, English</dd>
              </div>
              <div>
                <dt className="text-[0.9rem] text-dim-light">Work Availability</dt>
                <dd className="font-semibold text-neutral text-base mt-1">Full-time & Contract</dd>
              </div>
            </dl>
          </AnimatedObject>
        </div>
      </div>
    </SectionTransition>
  );
}
