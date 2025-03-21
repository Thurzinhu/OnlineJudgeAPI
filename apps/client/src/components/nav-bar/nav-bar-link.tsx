"use client";

import Link from "next/link";
import { NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "../ui/navigation-menu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { type ClassValue } from "clsx";

type NavBarProps = PropsWithChildren & {
    href: string;
    className?: ClassValue;
};

export default function NavItem({ children, href, className }: NavBarProps) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <NavigationMenuItem>
            <Link href={href} legacyBehavior passHref>
                <NavigationMenuLink 
                    className={cn(
                        navigationMenuTriggerStyle(),
                        "group no-underline inline-flex flex-row align-middle px-5 py-5 rounded-md text-base leading-relaxed font-medium",
                        isActive ? "text-primary" : "text-muted-foreground",
                        className
                    )}
                >
                    {children}
                </NavigationMenuLink>
            </Link>
        </NavigationMenuItem>
    )
}
