"use client";

import * as React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@components/ui/collapsible";
import { ChevronRight, ChevronDown } from "lucide-react";
import clsx from "clsx";
import { Button } from "@components/ui/button";
import slugify from "slugify";

export const NavSection = ({ title, pathName, links }: any) => {
  const pathname = window?.location?.pathname || pathName;

  const [isOpen, setIsOpen] = React.useState(
    pathname === "/docs" ||
      pathname === `/docs/` ||
      pathname.includes(slugify(title?.toLowerCase()))
      ? true
      : false
  );

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='text-[13px] w-full py-[6px] px-2 font-display font-medium dark:text-white justify-between mb-2 hover:bg-primaryLightBorder/30'
        >
          {title}
          {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className='border-l-2 border-primaryLightBorder/70 ml-3'>
        <ul className='space-y-1'>
          {links?.map((link: any) => (
            <li key={link?.title}>
              <Button
                asChild
                variant='ghost'
                size='sm'
                className='relative justify-start text-[13px] break-words h-auto'
              >
                <a
                  href={link.href}
                  className={clsx(
                    "ml-1 py-2 px-2 block w-full before:pointer-events-none before:absolute before:-left-2 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full",
                    {
                      "font-semibold text-primaryRed before:bg-primaryRed bg-primaryRed/10 hover:bg-primaryRed/10":
                        link.href === pathname || link.href === `${pathname}/`,
                      "text-slate-600 before:hidden before:bg-primaryLightBorder hover:text-slate-700 hover:before:block hover:bg-primaryLightBorder/30":
                        link.href !== pathname && link.href !== `${pathname}/`,
                    }
                  )}
                >
                  {link.title}
                </a>
              </Button>
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
};
