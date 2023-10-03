import * as React from "react";
import { Menu } from "lucide-react";
import { cn } from "@lib/utils";
import { Button } from "@components/ui/button";
import { ScrollArea } from "@components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet";
// import { Icons } from "@/components/icons"
import { MatchSorterSearch } from "./match-sorter-search";
import clsx from "clsx";

export function MobileNav({ navigation, directories, isWiki, wikiNav }: any) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className='flex lg:hidden h-16 items-center justify-between'>
      <a href='/'>
        <img
          src='/westeroscraft.svg'
          alt='WesterosCraft Logo'
          width={176}
          height={24}
          // priority
        />
      </a>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant='ghost'
            className='mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden'
          >
            <Menu className='h-6 w-6 fill-white text-white' />
            <span className='sr-only'>Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent size='xl' position='left' className='pr-0 bg-primaryDark'>
          <ScrollArea className='my-4 h-[calc(100vh-8rem)] pb-10'>
            {isWiki && (
              <>
                <MatchSorterSearch
                  directories={directories}
                  className='mt-6 pr-6'
                />
                <ul className='mb-12'>
                  {wikiNav.map((section: any) => (
                    <li key={section.title}>
                      <h2 className='font-display font-medium text-white mt-6 mb-4'>
                        {section.title}
                      </h2>
                      <ul className='mt-2 space-y-2 border-l-2 border-slate-100 dark:border-slate-800 lg:mt-4 lg:space-y-4 lg:border-slate-200'>
                        {section.links.map((link: any) => (
                          <li className='relative' key={link.href}>
                            <a
                              href={link.href}
                              className={clsx(
                                "block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full",
                                "text-slate-200 before:hidden before:bg-slate-300 hover:text-primaryGold hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300"
                              )}
                            >
                              {link.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <div className='flex flex-col space-y-3'>
              {navigation.data.items.map((n: any) =>
                n.isDropdown.discriminant ? (
                  <div key={n.text}>
                    <div className='bg-transparent text-white font-medium'>
                      {n.text}
                    </div>
                    <div>
                      <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                        {n.isDropdown?.value?.map((x: any) => (
                          <li key={x.text}>
                            <MobileLink
                              href={x.link}
                              className='flex items-center text-white hover:bg-transparent hover:text-yellow-200'
                              onOpenChange={setOpen}
                            >
                              {x.text}
                            </MobileLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div key={n.text}>
                    <div
                      className={`text-white hover:bg-transparent hover:text-yellow-200`}
                    >
                      <MobileLink href={n.isDropdown.value.link}>
                        {n.text}
                      </MobileLink>
                    </div>
                  </div>
                )
              )}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}

interface MobileLinkProps {
  href: string;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  return (
    <a
      href={href}
      onClick={() => {
        window.location.href = href.toString();
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </a>
  );
}
