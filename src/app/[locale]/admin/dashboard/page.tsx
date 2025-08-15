import { loginIsRequiredServer } from '@/lib/auth';
import { Button } from '@/shared/Button';
import Logo from '@/shared/Logo';

export default async function Dashboard() {
  await loginIsRequiredServer();
  return (
    <>
      <div className="relative border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
        <div className="container flex h-20 justify-between p-2">
          <div className="flex items-center lg:flex-1">
            <Logo />
          </div>
          <div className="flex flex-1 items-center justify-end">
            <Button className="-mx-1 py-1.75!" color="light" href={'/add-listing/1'}>
              List your property
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
