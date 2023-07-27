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

export const MainNav = () => {
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
          <NavigationMenuItem>
            <NavigationMenuTrigger className='bg-transparent text-white hover:bg-transparent hover:text-yellow-200'>
              Community
            </NavigationMenuTrigger>
            <NavigationMenuContent className='bg-primaryDark'>
              <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                <li className='row-span-3'>
                  <NavigationMenuLink asChild>
                    <a
                      className='flex h-full w-full select-none flex-col justify-end bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                      href='/'
                    >
                      <div className='mx-auto'>
                        <img
                          src='/dragon-egg_62x62.png'
                          alt='Dragon Egg'
                          width={58}
                          height={58}
                        />
                      </div>
                      <div className='mb-2 mt-4 text-lg font-medium'>
                        Forums
                      </div>
                      <p className='text-sm leading-tight text-muted-foreground'>
                        Where we plan all of our builds.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href='/about' title='About'>
                  Read all about us and our process.
                </ListItem>
                <ListItem href='/rookery' title='Rookery'>
                  All editions of our quarterly newsletter.
                </ListItem>
                <ListItem href='/docs/primitives/typography' title='Donate'>
                  Help by contributing to server costs.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className='bg-transparent text-white hover:bg-transparent hover:text-yellow-200'>
              Resources
            </NavigationMenuTrigger>
            <NavigationMenuContent className='bg-primaryDark'>
              <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                <li className='row-span-3'>
                  <NavigationMenuLink asChild>
                    <a
                      className='flex h-full w-full select-none flex-col justify-end bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                      href='/'
                    >
                      <div className='mx-auto'>
                        <img
                          src='/three-eyed-raven_58x58.png'
                          alt='Three Eyed Raven'
                          width={58}
                          height={58}
                        />
                      </div>
                      <div className='mb-2 mt-4 text-lg font-medium'>
                        Modpack
                      </div>
                      <p className='text-sm leading-tight text-muted-foreground'>
                        Get all the mods you need to starting exploring
                        Westeros.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href='/docs' title='Progress'>
                  Check on the status of the project.
                </ListItem>
                <ListItem href='/docs/installation' title='Rules & Guides'>
                  Learn how to contribute to the community.
                </ListItem>
                <ListItem href='/docs/primitives/typography' title='FAQ'>
                  Answers to some common questions.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-transparent hover:text-yellow-200`}
            >
              <a href='/docs'>Map</a>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-transparent hover:text-yellow-200`}
            >
              <a href='/wiki'>Wiki</a>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-transparent hover:text-yellow-200`}
            >
              <a href='/docs'>Discord</a>
            </NavigationMenuLink>
          </NavigationMenuItem>
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
