import { RealEstateHeroSearchForm } from '@/components/HeroSearchForm/RealEstateHeroSearchForm';
import SectionClientSay from '@/components/SectionClientSay';
import SectionGridFeatureProperty from '@/components/SectionGridFeatureProperty';
import SectionOurFeatures from '@/components/SectionOurFeatures';
import { getRealEstateCategories } from '@/data/categories';
import heroImage from '@/images/hero-right.jpg';
import { getRealEstateListings } from '@/lib/actions/property.actions';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Home Real Estate',
  description: 'Booking online & rental online Next.js Template',
};

const SectionHero = () => {
  const t = useTranslations('HeroSearchForm');
  return (
    <div className="relative">
      <div className="absolute inset-y-0 end-0 w-full grow lg:w-3/4">
        <Image
          fill
          className="object-cover"
          src={heroImage}
          alt="hero"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 75vw"
          priority
        />
      </div>
      <div className="relative py-24 lg:py-20">
        <div className="relative inline-flex">
          <div className="absolute inset-y-0 end-20 w-screen bg-primary-500 md:end-40"></div>
          <div className="relative max-w-2xl py-10 text-white sm:py-20 xl:py-24">
            <h2 className="text-4xl/[1.1] font-semibold text-pretty md:text-6xl/[1.1] xl:text-7xl/[1.1]">
              {t('Discover Your')} <br />
              {t('Perfect Property')}
            </h2>
          </div>
        </div>
        <div className="hidden w-full lg:mt-20 lg:block">
          <RealEstateHeroSearchForm formStyle="default" />
        </div>
      </div>
    </div>
  );
};

async function Home() {
  const categories = await getRealEstateCategories();
  const listings = await getRealEstateListings();

  return (
    <main className="relative overflow-hidden">
      <div className="relative container mb-24 flex flex-col gap-y-24 lg:mb-28 lg:gap-y-32">
        <SectionHero />
        <SectionOurFeatures />
        {/* send here the categories (tabs) */}
        <SectionGridFeatureProperty listing={listings} />
        <SectionClientSay />
      </div>
    </main>
  );
}

export default Home;
