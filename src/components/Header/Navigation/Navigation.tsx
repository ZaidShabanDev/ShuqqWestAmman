import { TNavigationItem } from '@/data/navigation';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FC } from 'react';

const Lv1MenuItem = ({ menuItem }: { menuItem: TNavigationItem }) => {
  const t = useTranslations('Navigation');
  return (
    <Link
      className="flex items-center self-center rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 lg:text-[15px] xl:px-5 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
      href={menuItem.href || '#'}
    >
      {t(menuItem.name ?? '')}
      {menuItem.children?.length && (
        <ChevronDownIcon className="-mr-1 ml-1 h-4 w-4 text-neutral-400" aria-hidden="true" />
      )}
    </Link>
  );
};

export interface Props {
  menu: TNavigationItem[];
  className?: string;
}
const Navigation: FC<Props> = ({ menu, className }) => {
  return (
    <ul className={clsx('flex', className)}>
      {menu.map((menuItem) => {
        return (
          <li key={menuItem.id} className="relative menu-item">
            <Lv1MenuItem key={menuItem.id} menuItem={menuItem} />
          </li>
        );
      })}
    </ul>
  );
};

export default Navigation;
