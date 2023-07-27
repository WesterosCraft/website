import * as React from "react";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className='w-full border-b bg-primaryDark shadow-sm backdrop-blur z-50 px-4 sticky top-0'>
      <MainNav />
      <MobileNav />
    </header>
  );
}
