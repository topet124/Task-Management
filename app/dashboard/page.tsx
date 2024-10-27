'use client';

import BarChart from '@/components/BarChart';
import TargetTable from '@/components/TargetTable';
import GlobalFilter from '@/components/GlobalFilter';
import { useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [filter, setFilter] = useState('all');

  return (
    <div className='bg-gray-100'>
      <div className="flex items-center font-poppins bg-teal-300 justify-between gap-4 h-full p-6">
        <Link href="/" passHref>
          <h1 className="text-2xl font-poppins font-bold rounded-md px-3 py-2 bg-gray-700 text-white hover:bg-gray-600 hover:text-gray-200">Target Management Dashboard</h1>
        </Link>
        <GlobalFilter filter={filter} setFilter={setFilter} />
      </div>
      <div className='p-12'>
        <div className="pt-12">
          <BarChart filter={filter} />
        </div>
      </div>
      <div>
        <div>
          <div className="p-8">
            <TargetTable filter={filter} />
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
        </div>
      </div>
    </div>
  );
}
