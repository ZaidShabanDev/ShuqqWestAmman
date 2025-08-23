import { Button } from '@/shared/Button';
import Logo from '@/shared/Logo';
import { useTranslations } from 'next-intl';
import CreatePropertyForm from './CreateFormProps';

const CreatePage = () => {
  const t = useTranslations('common');
  return (
    <>
      <div className="relative border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
        <div className="container flex h-20 justify-between p-2">
          <div className="flex items-center lg:flex-1">
            <Logo />
          </div>
          <div className="flex flex-1 items-center justify-end">
            <Button className="-mx-1 py-1.75!" color="light" href={'/admin/dashboard'}>
              {t('Back to Dashboard')}
            </Button>
          </div>
        </div>
      </div>

      <CreatePropertyForm />
    </>
  );
};

export default CreatePage;
