import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
