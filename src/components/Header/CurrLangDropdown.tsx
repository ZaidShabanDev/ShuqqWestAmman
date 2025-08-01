'use client';

import { getLanguages } from '@/data/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  PopoverPanelProps,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useLocale } from 'next-intl';
import { FC, useEffect } from 'react';

const Languages = ({
  languages,
  onClose,
}: {
  languages: Awaited<ReturnType<typeof getLanguages>>;
  onClose?: () => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale(); // Get current locale from next-intl

  // Set direction based on current locale on component mount and locale change
  useEffect(() => {
    const currentLanguage = languages.find((lang) => lang.locale === locale);
    if (currentLanguage) {
      document.documentElement.dir = currentLanguage.dir;
      document.documentElement.lang = currentLanguage.locale;
    }
  }, [locale, languages]);

  const handleLanguageClick = (language: (typeof languages)[0]) => {
    // Use next-intl router to navigate to the same page with new locale
    router.push(pathname, { locale: language.locale });

    // Close the language selector if onClose is provided
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {languages.map((item, index) => (
        <button
          key={index}
          onClick={() => handleLanguageClick(item)}
          className={clsx(
            '-m-2.5 flex w-full cursor-pointer items-center rounded-lg p-2.5 text-left transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-hidden dark:hover:bg-neutral-700',
            locale === item.locale ? 'bg-neutral-100 dark:bg-neutral-700' : 'opacity-80'
          )}
        >
          <div>
            <p className="text-sm font-medium">{item.name}</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">{item.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
};
interface Props {
  panelAnchor?: PopoverPanelProps['anchor'];
  panelClassName?: PopoverPanelProps['className'];

  className?: string;
  languages: Awaited<ReturnType<typeof getLanguages>>;
}

const CurrLangDropdown: FC<Props> = ({
  panelAnchor = {
    to: 'bottom end',
    gap: 16,
  },
  className,
  languages,
  panelClassName = 'w-sm',
}) => {
  return (
    <Popover className={clsx('group', className)}>
      <PopoverButton className="-m-2.5 flex items-center p-2.5 text-sm font-medium text-neutral-600 group-hover:text-neutral-950 focus:outline-hidden focus-visible:outline-hidden dark:text-neutral-200 dark:group-hover:text-neutral-100">
        <GlobeAltIcon className="size-5" />
        <ChevronDownIcon className="ms-1 size-4 group-data-open:rotate-180" aria-hidden="true" />
      </PopoverButton>

      <PopoverPanel
        anchor={panelAnchor}
        transition
        className={clsx(
          'z-40 rounded-3xl bg-white p-6 shadow-lg ring-1 ring-black/5 transition duration-200 ease-in-out data-closed:translate-y-1 data-closed:opacity-0 dark:bg-neutral-800',
          panelClassName
        )}
      >
        <TabGroup>
          <TabList className="flex space-x-1 rounded-full bg-neutral-100 p-1 dark:bg-neutral-700">
            {['Language'].map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  clsx(
                    'w-full rounded-full py-2 text-sm leading-5 font-medium text-neutral-700 focus:ring-0 focus:outline-hidden',
                    selected
                      ? 'bg-white shadow-sm'
                      : 'text-neutral-700 hover:bg-white/70 dark:text-neutral-300 dark:hover:bg-neutral-900/40'
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="mt-5">
            <TabPanel className="rounded-xl p-3 focus:ring-0 focus:outline-hidden">
              <Languages languages={languages} />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </PopoverPanel>
    </Popover>
  );
};
export default CurrLangDropdown;
