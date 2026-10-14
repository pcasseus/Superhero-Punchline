import type { ReactNode } from 'react';
import ActionBurst from './ActionBurst';

interface PageHeaderProps {
  kicker: string;
  title: string;
  children?: ReactNode;
  burst?: string;
  /** Fill class for the halftone background. */
  fill?: 'fill-red' | 'fill-blue' | 'fill-yellow' | 'fill-green';
}

/** Big comic "splash panel" used at the top of every secondary page. */
export default function PageHeader({ kicker, title, children, burst = 'POW!', fill = 'fill-blue' }: PageHeaderProps) {
  return (
    <header className={`panel panel-lg ${fill} halftone relative mb-10 overflow-hidden px-5 pb-7 pt-5 sm:px-8 sm:pb-9`}>
      <p className="caption -rotate-1 text-base">{kicker}</p>
      <h1 className="comic-title mt-3 max-w-[16ch] text-5xl sm:text-6xl md:text-7xl">{title}</h1>
      {children && <div className="mt-3 max-w-2xl text-base font-semibold leading-relaxed sm:text-lg">{children}</div>}
      <ActionBurst
        word={burst}
        size={150}
        className="absolute -right-6 -top-4 hidden animate-wiggle sm:block md:right-4 md:top-3"
      />
    </header>
  );
}
