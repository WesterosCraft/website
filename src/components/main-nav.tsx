import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@components/ui/navigation-menu";
// import Link from "next/link";
// import Image from "next/image";
import { cn } from "@lib/utils";
import { Button } from "./ui/button";
import type { NavigationProps } from "./site-header";

export const MainNav = ({ navigation }: NavigationProps) => {
  return (
    <div className='container hidden md:flex h-16 items-center'>
      <img
        src='/westeroscraft.svg'
        alt='WesterosCraft Logo'
        width={176}
        height={24}
        // priority
      />
      <NavigationMenu className='h-16 flex items-center space-x-6 font-medium'>
        <NavigationMenuList>
          {navigation.data.items.map((n: any) =>
            n.isDropdown.discriminant ? (
              <NavigationMenuItem key={n.text}>
                <NavigationMenuTrigger className='bg-transparent text-white hover:bg-transparent hover:text-yellow-200'>
                  {n.text}
                </NavigationMenuTrigger>
                <NavigationMenuContent className='bg-primaryDark'>
                  <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                    {n.isDropdown?.value?.map((x: any) => (
                      <ListItem key={x.text} href={x.link} title={x.text}>
                        {x.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem key={n.text}>
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-transparent hover:text-yellow-200`}
                >
                  <a href={n.isDropdown.value.link}>{n.text}</a>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )
          )}
        </NavigationMenuList>
      </NavigationMenu>
      <Button className='hover:bg-red-900  font-semibold rounded-none text-md bg-primaryRed text-white'>
        <a href='/join'>Join Server</a>
      </Button>
    </div>
  );
};

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
            "text-white block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primaryRed focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-slate-300'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
