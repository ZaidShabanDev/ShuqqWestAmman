import ButtonPrimary from '@/shared/ButtonPrimary';
import { Field, Label } from '@/shared/fieldset';
import Input from '@/shared/Input';
import SocialsList from '@/shared/SocialsList';
import Textarea from '@/shared/Textarea';
import { Contact01Icon, EarthIcon, TelephoneIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

const info = [
  {
    title: 'EMAIL',
    icon: Contact01Icon,
    description: 'mohammadsamir000d@gmail.com',
  },
  {
    title: 'PHONE',
    icon: TelephoneIcon,
    description: '+00962792892455',
  },
];

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact us page',
};

const PageContact = () => {
  const t = useTranslations('Contact');
  return (
    <div className="pt-10 pb-24 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl">
        <div className="grid shrink-0 grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2">
          <div>
            <h1 className="max-w-2xl text-4xl font-semibold sm:text-5xl">{t('title')}</h1>
            <div className="mt-10 flex max-w-sm flex-col gap-y-8 sm:mt-20">
              {info.map((item, index) => (
                <div key={index}>
                  <h3 className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase dark:text-neutral-200">
                    <HugeiconsIcon icon={item.icon} size={20} color="currentColor" strokeWidth={1.5} />
                    {t(item.title)}
                  </h3>
                  <span className="mt-2 block text-neutral-500 dark:text-neutral-400">{item.description}</span>
                </div>
              ))}
              <div>
                <h3 className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase dark:text-neutral-200">
                  <HugeiconsIcon icon={EarthIcon} size={20} color="currentColor" strokeWidth={1.5} /> {t('socials')}
                </h3>
                <SocialsList className="mt-2" />
              </div>
            </div>
          </div>
          <form className="grid grid-cols-1 gap-6" action="#" method="post">
            <Field className="block">
              <Label>{t('fullName')}</Label>
              <Input placeholder={t('fullNamePlaceholder')} type="text" className="mt-1" />
            </Field>
            <Field className="block">
              <Label>{t('emailAddress')}</Label>
              <Input type="email" placeholder={t('emailAddressPlaceholder')} className="mt-1" />
            </Field>
            <Field className="block">
              <Label>{t('message')}</Label>
              <Textarea className="mt-1" rows={6} />
            </Field>
            <div>
              <ButtonPrimary type="submit">{t('sendMessage')}</ButtonPrimary>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PageContact;
