import { getRealEstateListings } from '@/lib/actions/property.actions';
import { loginIsRequiredServer } from '@/lib/auth';
import { Button } from '@/shared/Button';
import Logo from '@/shared/Logo';
import { getTranslations } from 'next-intl/server';
import DashboardTabs from './dashboardTabs';

export default async function Dashboard() {
  await loginIsRequiredServer();

  const properties = await getRealEstateListings();
  const t = await getTranslations('Navigation');

  return (
    <>
      <div className="relative border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
        <div className="container flex h-20 justify-between p-2">
          <div className="flex items-center lg:flex-1">
            <Logo />
          </div>
          <div className="flex flex-1 items-center justify-end">
            <Button className="-mx-1 py-1.75!" color="light" href={'/add-listing/1'}>
              {t('List your property')}
            </Button>
          </div>
        </div>
      </div>

      <DashboardTabs properties={properties} />
    </>
  );
}
