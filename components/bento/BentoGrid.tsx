import { ReactNode } from 'react';

interface BentoGridProps {
  children: ReactNode;
}

export default function BentoGrid({ children }: BentoGridProps) {
  return (
    <section className="px-4 md:px-0">
      <h2 className="sr-only">Dashboard / Highlights</h2>
      <div className="grid grid-cols-1 justify-center gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
        {children}
      </div>
    </section>
  );
}

interface BentoBoxProps {
  children: ReactNode;
  className?: string;
  span?: 1 | 2 | 3 | 4;
}

export function BentoBox({ children, className = '', span = 1 }: BentoBoxProps) {
  const spanClasses = {
    1: 'lg:col-span-1',
    2: 'sm:col-span-2 lg:col-span-2',
    3: 'sm:col-span-2 lg:col-span-3',
    4: 'sm:col-span-2 lg:col-span-4',
  };

  return (
    <div
      className={`rounded-xl border border-border bg-card p-3 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-accent-dynamic/20 ${spanClasses[span]} ${className}`}
    >
      {children}
    </div>
  );
}
