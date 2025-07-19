'use client';

import { ThemeContext } from '@/app/[locale]/theme-provider';
import { useCarouselDotButton } from '@/hooks/use-carousel-dot-buttons';
import HeadingWithSub from '@/shared/Heading';
import { StarIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import type { EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { FC, useContext } from 'react';

const DEMO_DATA = [
  {
    id: 1,
    clientName: 'Tiana Abie',
    content: 'Great quality products, affordable prices, fast and friendly delivery. I very recommend.',
  },
  {
    id: 2,
    clientName: 'Lennie Swiffan',
    content: 'Great quality products, affordable prices, fast and friendly delivery. I very recommend.',
  },
  {
    id: 3,
    clientName: 'Berta Emili',
    content: 'Great quality products, affordable prices, fast and friendly delivery. I very recommend.',
  },
];

interface SectionClientSayProps {
  className?: string;
  emblaOptions?: EmblaOptionsType;
  heading?: string;
  subHeading?: string;
}

const SectionClientSay: FC<SectionClientSayProps> = ({
  className,
  emblaOptions = {
    slidesToScroll: 1,
    loop: true,
  },
  heading = 'Good news from far away 🥇',
  subHeading = "Let's see what people think of Chisfis",
}) => {
  const theme = useContext(ThemeContext);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      ...emblaOptions,
      direction: theme?.themeDir,
    },
    [Autoplay({ playOnInit: true, delay: 2000 })]
  );
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useCarouselDotButton(emblaApi);

  return (
    <div className={clsx('relative flow-root', className)}>
      <HeadingWithSub subheading={subHeading} isCenter>
        {heading}
      </HeadingWithSub>
      <div className="relative mx-auto max-w-2xl md:mb-16">
        {/* SLIDER */}
        <div className="relative mt-12 lg:mt-16">
          <div className="embla" ref={emblaRef}>
            <ul className="embla__container">
              {DEMO_DATA.map((item) => (
                <li key={item.id} className="flex embla__slide basis-full flex-col items-center text-center">
                  <span className="block text-2xl">{item.content}</span>
                  <span className="mt-8 block text-2xl font-semibold">{item.clientName}</span>
                  <div className="mt-3.5 flex items-center space-x-0.5 text-yellow-500">
                    <StarIcon className="size-6" />
                    <StarIcon className="size-6" />
                    <StarIcon className="size-6" />
                    <StarIcon className="size-6" />
                    <StarIcon className="size-6" />
                  </div>
                </li>
              ))}
            </ul>

            <div className="embla__dots flex items-center justify-center pt-10">
              {scrollSnaps.map((_, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={clsx(
                    index === selectedIndex ? 'bg-neutral-700' : 'bg-neutral-300',
                    'mx-1 size-2 rounded-full focus:outline-none'
                  )}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionClientSay;
