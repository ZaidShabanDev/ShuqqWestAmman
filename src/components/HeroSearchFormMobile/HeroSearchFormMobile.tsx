'use client';

import { Dialog, DialogPanel } from '@headlessui/react';
import { FilterVerticalIcon, Search01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useTimeoutFn } from 'react-use';
import RealestateSearchFormMobile from './RealestateSearchFormMobile';

const HeroSearchFormMobile = ({ className }: { className?: string }) => {
  const tHero = useTranslations('HeroSearchForm');
  const [showModal, setShowModal] = useState(false);

  // FOR RESET ALL DATA WHEN CLICK CLEAR BUTTON
  const [showDialog, setShowDialog] = useState(false);
  let [, , resetIsShowingDialog] = useTimeoutFn(() => setShowDialog(true), 1);
  //
  function closeModal() {
    setShowModal(false);
  }

  function openModal() {
    setShowModal(true);
  }

  const renderButtonOpenModal = () => {
    return (
      <button
        onClick={openModal}
        className="relative flex w-full items-center rounded-full border border-neutral-200 px-4 py-2 pe-11 shadow-lg dark:border-neutral-600"
      >
        <HugeiconsIcon icon={Search01Icon} size={20} color="currentColor" strokeWidth={1.5} />

        <div className="ms-3 flex-1 overflow-hidden text-start">
          <span className="block text-sm font-medium">{tHero('Location')}</span>
          <span className="mt-0.5 block text-xs font-light text-neutral-500 dark:text-neutral-400">
            <span className="line-clamp-1">{tHero('Location, city, or property name')}</span>
          </span>
        </div>

        <span className="absolute end-2 top-1/2 flex h-9 w-9 -translate-y-1/2 transform items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-600 dark:text-neutral-300">
          <HugeiconsIcon icon={FilterVerticalIcon} size={20} color="currentColor" strokeWidth={1.5} />
        </span>
      </button>
    );
  };

  return (
    <div className={clsx(className, 'relative z-10 w-full max-w-lg')}>
      {renderButtonOpenModal()}
      <Dialog as="div" className="relative z-max" onClose={closeModal} open={showModal}>
        <div className="fixed inset-0 bg-neutral-100 dark:bg-neutral-900">
          <div className="flex h-full">
            <DialogPanel
              transition
              className="relative flex-1 transition data-closed:translate-y-28 data-closed:opacity-0"
            >
              {showDialog && <RealestateSearchFormMobile />}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default HeroSearchFormMobile;
