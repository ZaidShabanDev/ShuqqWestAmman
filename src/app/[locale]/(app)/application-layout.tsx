import Aside from '@/components/aside';
import AsideSidebarNavigation from '@/components/aside-sidebar-navigation';
import Footer from '@/components/Footer';
import FooterQuickNavigation from '@/components/FooterQuickNavigation';
import Header from '@/components/Header/Header';
import HeroSearchFormMobile from '@/components/HeroSearchFormMobile/HeroSearchFormMobile';
import 'rc-slider/assets/index.css';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  header?: ReactNode;
}

const ApplicationLayout: React.FC<Props> = ({ children, header }) => {
  return (
    <Aside.Provider>
      <div className="relative z-20 hidden lg:block">{header ? header : <Header />}</div>
      {/* HeroSearchFormMobile - will display on mobile devices instead of Header-desktop */}
      <div className="sticky top-0 z-20 bg-white shadow-xs lg:hidden dark:bg-neutral-900">
        <div className="container flex h-20 items-center justify-center">
          <HeroSearchFormMobile />
        </div>
      </div>
      {children}
      {/* FooterQuickNavigation - Displays on mobile devices and is fixed at the bottom of the screen */}
      <FooterQuickNavigation />
      <Footer />
      <AsideSidebarNavigation />
    </Aside.Provider>
  );
};

export { ApplicationLayout };
