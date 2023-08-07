import * as React from "react";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";

type Nav = {
  id: "mainNav";
  collection: "pages";
  data: any;
};

export type NavigationProps = {
  navigation: Nav;
};

export function SiteHeader({ navigation }: NavigationProps) {
  return (
    <header className='w-full border-b bg-primaryDark shadow-sm backdrop-blur z-50 px-4 sticky top-0'>
      <MainNav navigation={navigation} />
      <MobileNav navigation={navigation} />
    </header>
  );
}
