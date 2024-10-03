"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Upload Image",
        href: "/upload",
        description: "A component to upload images to the server.",
    },
    {
        title: "View Gallery",
        href: "/gallery",
        description: "A component to view a gallery of uploaded images.",
    },
];

function onNavChange() {
    //added
    setTimeout(() => {
        const triggers = document.querySelectorAll(
            '.submenu-trigger[data-state="open"]'
        );
        if (triggers.length === 0) return;

        const firstTrigger = triggers[0] as HTMLElement;
        const viewports = document.getElementsByClassName("submenu-viewport");

        if (viewports.length > 0) {
            const viewport = viewports[0] as HTMLElement;
            viewport.style.left = `${firstTrigger.offsetLeft}px`;
        }
    });
}

export function NavigationMenuDemo() {
    return (
        <div className="flex justify-center m-10">
            <NavigationMenu onValueChange={onNavChange}>
            <NavigationMenuList>
                <NavigationMenuItem className="mr-4">
                <NavigationMenuTrigger className="submenu-trigger">
                    Home
                </NavigationMenuTrigger>
                <NavigationMenuContent className="flex justify-center">
                    <ul className="gap-3 p-4 md:w-[400px] lg:w-[500px]">
                    <li className="flex justify-center">
                        <NavigationMenuLink asChild>
                        <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                        >
                            <Icons.logo className="h-6 w-full mx-auto" />
                            <div className="mb-2 mt-4 text-lg font-medium text-center">
                            file/uploader
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground text-center">
                            bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh saoijd ojasidojiasjoida
                            </p>
                        </a>
                        </NavigationMenuLink>
                    </li>
                    </ul>
                </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                <NavigationMenuTrigger className="submenu-trigger">Features</NavigationMenuTrigger>
                <NavigationMenuContent className="flex justify-center">
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {components.map((component) => (
                        <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                        >
                        {component.description}
                        </ListItem>
                    ))}
                    </ul>
                </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";
