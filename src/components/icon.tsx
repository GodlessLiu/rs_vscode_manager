import { cn } from '@/lib/utils';
import { icons } from 'lucide-react';
import { FC } from 'react';

interface Props {
    name: string;
    color?: string;
    size?: number;
    className?: string;
}

export const Icon: FC<Props> = ({ name, color, size, className }) => {
    // @ts-ignore
    const LucideIcon = icons[name];

    return <LucideIcon className={cn(className)} color={color} size={size} />;
};
