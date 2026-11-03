export function Footer() {
  return (
    <footer className="bg-neutral text-on-dark py-14">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-8 text-[0.95rem]">
        <div>
          <h3 className="font-body font-semibold text-[0.95rem] text-secondary mb-2.5">
            Ismail Gilang Maulana
          </h3>
          <p className="text-dim-dark max-w-[26rem] leading-relaxed">
            Fullstack Developer building robust, scalable web applications and high-throughput systems.
          </p>
        </div>
        <div>
          <h3 className="font-body font-semibold text-[0.95rem] text-secondary mb-2.5">
            Connect
          </h3>
          <ul className="list-none p-0 m-0 grid gap-1.5">
            <li>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-dim-dark hover:text-on-dark transition-colors">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-dim-dark hover:text-on-dark transition-colors">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-dim-dark hover:text-on-dark transition-colors">
                Twitter / X
              </a>
            </li>
            <li>
              <a href="https://dev.to" target="_blank" rel="noopener noreferrer" className="text-dim-dark hover:text-on-dark transition-colors">
                Dev.to
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-body font-semibold text-[0.95rem] text-secondary mb-2.5">
            Based in
          </h3>
          <p className="text-dim-dark leading-relaxed">Indonesia (GMT+7) • Available Worldwide (Remote)</p>
        </div>
        <div className="col-span-full border-t border-[#3A332E] pt-6 text-[0.88rem] flex flex-wrap justify-between gap-4 text-dim-dark">
          <span>© {new Date().getFullYear()} Ismail Gilang Maulana. All rights reserved.</span>
          <span>Engineered with Next.js, Tailwind CSS &amp; Motion</span>
        </div>
      </div>
    </footer>
  );
}
