'use client';

import ButtonPrimary from '@/shared/ButtonPrimary';
import { Field, Label } from '@/shared/fieldset';
import Input from '@/shared/Input';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const CredentialsFormProps = () => {
  const t = useTranslations('admin');

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const signInResponse = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    }); 

    if (signInResponse && !signInResponse.error) {
      router.push('/admin/dashboard');
      return;
    } else {
      setError(t('Invalid email or password'));
      return;
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      {/* FORM */}
      <form className="grid grid-cols-1 gap-6" action="#" method="post" onSubmit={handleSubmit}>
        <Field className="block">
          <Label className="text-neutral-800 dark:text-neutral-200">{t('Email address')}</Label>
          <Input type="email" name="email" placeholder="example@example.com" className="mt-1" />
        </Field>
        <Field className="block">
          <div className="flex items-center justify-between text-neutral-800 dark:text-neutral-200">
            <Label>{t('Password')} </Label>
          </div>
          <Input type="password" name="password" className="mt-1" />
        </Field>
        <ButtonPrimary type="submit">{t('login')}</ButtonPrimary>
      </form>
    </div>
  );
};

export default CredentialsFormProps;
