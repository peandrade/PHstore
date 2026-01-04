import Image from "next/image";
import Link from "next/link";

type Props = {
    href: string;
    icon: string;
    label?: string;
    ariaLabel?: string;
}
export const FooterButton = ({ href, icon, label, ariaLabel }: Props) => {
    const iconName = icon.split('/').pop()?.replace('.png', '').replace('-line', '').replace('-fill', '') || 'icon';
    const defaultAriaLabel = ariaLabel || label || iconName;

    // If href is empty, render as non-interactive element
    if (!href || href === '') {
        return (
            <div className="flex items-center gap-4 border border-gray-700 rounded-sm p-4 opacity-50 cursor-not-allowed">
                <Image
                    src={icon}
                    alt={iconName}
                    width={24}
                    height={24}
                />
                {label &&
                    <div className="flex-1">{label}</div>
                }
            </div>
        );
    }

    return (
        <Link href={href} aria-label={defaultAriaLabel}>
            <div className="flex items-center gap-4 border border-gray-700 rounded-sm p-4 hover:bg-gray-900 transition-colors">
                <Image
                    src={icon}
                    alt={iconName}
                    width={24}
                    height={24}
                />
                {label &&
                    <div className="flex-1">{label}</div>
                }
            </div>
        </Link>
    );
}