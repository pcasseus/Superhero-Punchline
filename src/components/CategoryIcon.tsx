import type { CategoryId } from '../types';
import { IconCrest, IconDice, IconShieldStar, IconVersus } from './Icons';

const ICONS = {
  marvel: IconShieldStar,
  dc: IconCrest,
  versus: IconVersus,
  random: IconDice,
} as const;

export default function CategoryIcon({ id, size = 22 }: { id: CategoryId; size?: number }) {
  const Icon = ICONS[id];
  return <Icon size={size} />;
}
