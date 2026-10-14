import type { ComponentType, SVGProps } from 'react';
import { IconBook, IconGear, IconHelp, IconHome, IconStar } from './Icons';

export interface NavItem {
  to: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
}

export const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Home', Icon: IconHome },
  { to: '/favorites', label: 'Favorites', Icon: IconStar },
  { to: '/settings', label: 'Settings', Icon: IconGear },
  { to: '/about', label: 'About', Icon: IconBook },
  { to: '/help', label: 'Help', Icon: IconHelp },
];
