import { RealEstateHeroSearchForm } from '@/components/HeroSearchForm/RealEstateHeroSearchForm';
import SectionClientSay from '@/components/SectionClientSay';
import SectionGridFeatureProperty from '@/components/SectionGridFeatureProperty';
import SectionOurFeatures from '@/components/SectionOurFeatures';
import SectionVideos from '@/components/SectionVideos';
import { getRealEstateCategories } from '@/data/categories';
import { getRealEstateListings } from '@/data/listings';
import heroImage from '@/images/hero-right.jpg';
import ourFeatureImage from '@/images/our-features.jpeg';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Home Real Estate',
  description: 'Booking online & rental online Next.js Template',
};

const SectionHero = () => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 end-0 w-full grow lg:w-3/4">
        <Image
          fill
          className="object-cover"
          src={heroImage}
          alt="hero"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      <div className="relative py-24 lg:py-20">
        <div className="relative inline-flex">
          <div className="absolute inset-y-0 end-20 w-screen bg-primary-500 md:end-40"></div>
          <div className="relative max-w-2xl py-10 text-white sm:py-20 xl:py-24">
            <h2 className="text-4xl/[1.1] font-semibold text-pretty md:text-6xl/[1.1] xl:text-7xl/[1.1]">
              Discover Your <br />
              Perfect Property
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
        <SectionOurFeatures type="type2" rightImg={ourFeatureImage} />
        <SectionGridFeatureProperty listing={listings} />

        <SectionVideos />
        <div className="relative py-16">
          <SectionClientSay />
        </div>
      </div>
    </main>
  );
}

export default Home;
