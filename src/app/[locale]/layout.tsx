import { routing } from '@/i18n/routing';
import { APP_DESCRIPTION, APP_NAME } from '@/lib/constants';
import '@/styles/tailwind.css';
import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { Poppins } from 'next/font/google';
import { notFound } from 'next/navigation';
import ThemeProvider from './theme-provider';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    template: `%s - ${APP_NAME}`,
    default: `${APP_NAME} - ${APP_DESCRIPTION}`,
  },
  description: APP_DESCRIPTION,
  keywords: ['Real Estate Amman', 'Properties Jordan', 'Apartments Amman', 'Villas West Amman'],
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={poppins.className}>
      <body className="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
        <ThemeProvider>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
