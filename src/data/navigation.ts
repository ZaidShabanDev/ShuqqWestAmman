export async function getNavigation(): Promise<TNavigationItem[]> {
  return [
    {
      id: '1',
      href: '/',
      name: 'Home',
    },
    {
      id: '2',
      href: '/properties',
      name: 'Properties',
    },
    {
      id: '4',
      href: '/contact',
      name: 'Contact Us',
    },
  ];
}

// ============ TYPE =============
export type TNavigationItem = Partial<{
  id: string;
  href: string;
  name: string;
  type?: 'dropdown' | 'mega-menu';
  isNew?: boolean;
  children?: TNavigationItem[];
}>;

export const getLanguages = async () => {
  return [
    {
      id: 'en',
      name: 'English',
      description: 'English',
      locale: 'en',
      dir: 'ltr' as const,
    },
    {
      id: 'ar',
      name: 'العربية',
      description: 'Arabic',
      locale: 'ar',
      dir: 'rtl' as const,
    },
  ];
};
