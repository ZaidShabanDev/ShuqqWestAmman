'use client';

import DeleteDialog from '@/components/delete-dialog';
import { deleteProperty } from '@/lib/actions/property.actions';
import { formatId } from '@/lib/helpers';
import { ViewIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';

const DashboardTabs = ({ properties = [] }: { properties?: RealEstateListingType[] }) => {
  const [activeTab, setActiveTab] = useState('schedules');
  const t = useTranslations('table');

  const schedules = [
    { id: 1, task: 'Team Meeting', date: '2024-08-16', time: '10:00 AM', status: 'Scheduled' },
    { id: 2, task: 'Project Review', date: '2024-08-17', time: '2:00 PM', status: 'Pending' },
    { id: 3, task: 'Client Call', date: '2024-08-18', time: '11:30 AM', status: 'Confirmed' },
    { id: 4, task: 'Training Session', date: '2024-08-19', time: '3:00 PM', status: 'Scheduled' },
    { id: 5, task: 'Monthly Report', date: '2024-08-20', time: '9:00 AM', status: 'Pending' },
  ];

  return (
    <div className="mx-auto max-w-6xl p-6">
      {/* Navigation Tabs */}
      <div className="mb-8 flex justify-around border-b border-neutral-200 dark:border-neutral-700">
        <button
          onClick={() => setActiveTab('schedules')}
          className={`px-6 py-3 text-lg font-medium transition-colors duration-200 ${
            activeTab === 'schedules'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-neutral-600 hover:text-blue-500 dark:text-neutral-300'
          }`}
        >
          Schedules
        </button>
        <button
          onClick={() => setActiveTab('properties')}
          className={`px-6 py-3 text-lg font-medium transition-colors duration-200 ${
            activeTab === 'properties'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-neutral-600 hover:text-blue-500 dark:text-neutral-300'
          }`}
        >
          Properties
        </button>
      </div>

      {/* Schedules Table */}
      {activeTab === 'schedules' && (
        <div className="overflow-hidden rounded-lg border bg-white shadow-md dark:border-neutral-700 dark:bg-neutral-900">
          <div className="border-b bg-neutral-50 px-6 py-4 dark:border-neutral-700 dark:bg-neutral-800">
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Schedules</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-100 dark:bg-neutral-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                    Task
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 bg-white dark:divide-neutral-700 dark:bg-neutral-900">
                {schedules.map((schedule) => (
                  <tr key={schedule.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800">
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-neutral-800 dark:text-neutral-200">
                      {schedule.id}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-neutral-800 dark:text-neutral-200">
                      {schedule.task}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-neutral-800 dark:text-neutral-200">
                      {schedule.date}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-neutral-800 dark:text-neutral-200">
                      {schedule.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          schedule.status === 'Confirmed'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : schedule.status === 'Scheduled'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}
                      >
                        {schedule.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Properties Table */}
      {activeTab === 'properties' && (
        <div className="overflow-hidden rounded-lg border bg-white shadow-md dark:border-neutral-700 dark:bg-neutral-900">
          <div className="border-b bg-neutral-50 px-6 py-4 dark:border-neutral-700 dark:bg-neutral-800">
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Properties</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-100 dark:bg-neutral-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                    {t('id')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                    {t('propertyName')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                    {t('type')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                    {t('location')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                    {t('price')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                    {t('action')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 bg-white dark:divide-neutral-700 dark:bg-neutral-900">
                {properties.map((property) => (
                  <tr key={property.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800">
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-neutral-800 dark:text-neutral-200">
                      {formatId(property.id)}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-neutral-800 dark:text-neutral-200">
                      {property.description}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-neutral-800 dark:text-neutral-200">
                      {property.propertyType}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-neutral-800 dark:text-neutral-200">
                      {property.address}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold whitespace-nowrap text-green-600 dark:text-green-400">
                      {property.price}
                    </td>
                    <td className="flex justify-between px-6 py-4 text-sm font-semibold whitespace-nowrap">
                      <Link href={`/properties-list/${property.handle}`}>
                        <HugeiconsIcon icon={ViewIcon} size={20} color="currentColor" strokeWidth={1.5} />
                      </Link>

                      <DeleteDialog id={property.id} action={deleteProperty} actionName={'property'} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardTabs;
