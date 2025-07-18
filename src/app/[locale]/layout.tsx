import { routing } from '@/i18n/routing'
import '@/styles/tailwind.css'
import type { Metadata } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { Poppins } from 'next/font/google'
import { notFound } from 'next/navigation'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    template: '%s - Shuqq West Amman',
    default: 'Shuqq West Amman - Premium Real Estate in Amman',
  },
  description: 'Premium apartments, villas, and commercial properties for sale and rent in West Amman, Jordan.',
  keywords: ['Real Estate Amman', 'Properties Jordan', 'Apartments Amman', 'Villas West Amman'],
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale} className={poppins.className}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
