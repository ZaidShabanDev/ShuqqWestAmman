import ButtonPrimary from '@/shared/ButtonPrimary';
import { Field, Label } from '@/shared/fieldset';
import Input from '@/shared/Input';
import Logo from '@/shared/Logo';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};

const Page = () => {
  const t = useTranslations('admin');
  return (
    <div className="container">
      <div className="my-16 flex justify-center">
        <Logo className="w-32" />
      </div>

      <div className="mx-auto max-w-md space-y-6">
        {/* FORM */}
        <form className="grid grid-cols-1 gap-6" action="#" method="post">
          <Field className="block">
            <Label className="text-neutral-800 dark:text-neutral-200">{t('Email address')}</Label>
            <Input type="email" placeholder="example@example.com" className="mt-1" />
          </Field>
          <Field className="block">
            <div className="flex items-center justify-between text-neutral-800 dark:text-neutral-200">
              <Label>{t('Password')} </Label>
            </div>
            <Input type="password" className="mt-1" />
          </Field>
          <ButtonPrimary type="submit">{t('login')}</ButtonPrimary>
        </form>
      </div>
    </div>
  );
};

export default Page;
