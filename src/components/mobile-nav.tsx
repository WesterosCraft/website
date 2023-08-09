import * as React from "react";
// import Link, { LinkProps } from "next/link";
// import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";

// import { docsConfig } from "@/config/docs"
// import { siteConfig } from "@/config/site"
import { cn } from "@lib/utils";
import { Button } from "@components/ui/button";
import { ScrollArea } from "@components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet";
// import { Icons } from "@/components/icons"
import type { NavigationProps } from "./site-header";

export function MobileNav({ navigation }: NavigationProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className='flex md:hidden h-16 items-center justify-between'>
      <img
        src='/westeroscraft.svg'
        alt='WesterosCraft Logo'
        width={176}
        height={24}
        // priority
      />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant='ghost'
            className='mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden'
          >
            <Menu className='h-6 w-6 fill-white text-white' />
            <span className='sr-only'>Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          size='xl'
          position='left'
          className='pr-0 bg-primaryLight'
        >
          <MobileLink
            href='/'
            className='flex items-center'
            onOpenChange={setOpen}
          >
            {/* <Icons.logo className="mr-2 h-4 w-4" />
          <span className="font-bold">{siteConfig.name}</span> */}
          </MobileLink>
          <ScrollArea className='my-4 h-[calc(100vh-8rem)] pb-10 pl-6'>
            <div className='flex flex-col space-y-3'>
              {navigation.data.items.map((n: any) =>
                n.isDropdown.discriminant ? (
                  <div key={n.text}>
                    <div className='bg-transparent text-white hover:bg-transparent hover:text-yellow-200'>
                      {n.text}
                    </div>
                    <div>
                      <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                        {n.isDropdown?.value?.map((x: any) => (
                          <a key={x.text} href={x.link} title={x.text}>
                            {x.description}
                          </a>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div key={n.text}>
                    <div
                      // asChild
                      className={` text-white hover:bg-transparent hover:text-yellow-200`}
                    >
                      <a href={n.isDropdown.value.link}>{n.text}</a>
                    </div>
                  </div>
                )
              )}
              {/* {docsConfig.mainNav?.map(
              (item) =>
                item.href && (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setOpen}
                  >
                    {item.title}
                  </MobileLink>
                )
            )} */}
            </div>
            <div className='flex flex-col space-y-2'>
              {/* {docsConfig.sidebarNav.map((item, index) => (
              <div key={index} className="flex flex-col space-y-3 pt-6">
                <h4 className="font-medium">{item.title}</h4>
                {item?.items?.length &&
                  item.items.map((item) => (
                    <React.Fragment key={item.href}>
                      {item.href ? (
                        <MobileLink href={item.href} onOpenChange={setOpen}>
                          {item.title}
                        </MobileLink>
                      ) : (
                        item.title
                      )}
                    </React.Fragment>
                  ))}
              </div>
            ))} */}
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
