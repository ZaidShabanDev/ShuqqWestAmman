'use client';

import { Button } from '@/shared/Button';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { Alert01Icon, Delete02Icon, DeleteIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTranslations } from 'next-intl';
import { useState, useTransition } from 'react';
import { toast } from 'react-toastify';

const DeleteDialog = ({
  id,
  action,
  actionName,
}: {
  id: string;
  action: (id: string) => Promise<{ success: boolean; message: string }>;
  actionName: string;
}) => {
  const t = useTranslations('toastMessages');
  const tDialog = useTranslations('dialog');

  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDeleteClick = () => {
    startTransition(async () => {
      const res = await action(id);
      if (!res.success) {
        toast.error(res.message);
      } else {
        setOpen(false);
        toast.success(t(res.message));
      }
    });
  };

  return (
    <div>
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <PopoverButton className={`text-red-600 dark:text-red-400 ${open ? 'ring-primary-500 focus:ring-2' : ''}`}>
              <HugeiconsIcon icon={DeleteIcon} size={20} color="currentColor" strokeWidth={1.5} />
            </PopoverButton>

            <PopoverPanel
              static={open}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
            >
              <div className="relative mx-4 w-full max-w-md overflow-hidden">
                <div className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 dark:bg-neutral-800 dark:ring-white/10">
                  {/* Header */}
                  <div className="flex items-start gap-4 p-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                      <HugeiconsIcon
                        icon={Alert01Icon}
                        size={24}
                        color="currentColor"
                        strokeWidth={1.5}
                        className="text-red-600 dark:text-red-400"
                      />
                    </div>
                    <div className="min-w-0 flex-1 pt-1">
                      <h3 className="text-lg font-semibold break-words text-gray-900 dark:text-gray-100">
                        {actionName === 'property'
                          ? tDialog('deleteConfirmationTitle')
                          : tDialog('deleteConfirmationTitleSchedule')}
                      </h3>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col-reverse gap-3 rounded-b-2xl bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end dark:bg-neutral-900/50">
                    <Button onClick={() => close()} disabled={isPending} className="inline-flex justify-center">
                      {tDialog('cancel')}
                    </Button>
                    <Button
                      onClick={handleDeleteClick}
                      disabled={isPending}
                      className="inline-flex items-center justify-center gap-2"
                    >
                      {isPending ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          {tDialog('deleting')}
                        </>
                      ) : (
                        <>
                          <HugeiconsIcon icon={Delete02Icon} size={16} color="currentColor" strokeWidth={1.5} />
                          {tDialog('delete')}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverPanel>
          </>
        )}
      </Popover>
    </div>
  );
};

export default DeleteDialog;
