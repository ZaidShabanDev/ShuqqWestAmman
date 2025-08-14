import { Metadata } from 'next';
import { ApplicationLayout } from './application-layout';

export const metadata: Metadata = {
  title: 'ShuqqWestAmman - Premium Real Estate in West Amman',
  description:
    'Find your dream home in West Amman with ShuqqWestAmman. Browse luxury apartments, villas, and properties in the most desirable neighborhoods of Amman, Jordan.',
  keywords: ['West Amman', 'Real Estate', 'Apartments', 'Villas', 'Properties', 'Amman', 'Jordan', 'ShuqqWestAmman'],
};

export default function Layout({ children }: { children: React.ReactNode; }) {
  return <ApplicationLayout>{children}</ApplicationLayout>;
}
