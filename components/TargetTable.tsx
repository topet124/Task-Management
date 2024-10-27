'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { Target } from '../lib/types';
import { TargetTableProps } from '../lib/types';
import { TargetRow } from '@/app/utils/tableFunction';



const TargetTable: React.FC<TargetTableProps> = ({ filter = 'all' }) => {
  const [targets, setTargets] = useState<Target[]>([]);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  useEffect(() => {
    const fetchTargets = async () => {
      const response = await fetch('/api/targets');
      const data = await response.json();
      setTargets(data);
    };

    fetchTargets();
  }, []);

  const filteredTargets = filter === 'all'
    ? targets
    : targets.filter(target =>
      filter === 'null'
        ? target.pipelineStatus === null
        : target.pipelineStatus === filter
    );

  const sortedTargets = filteredTargets.sort(
    (a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
  );

  const groupedTargets = sortedTargets.reduce((acc, target) => {
    const status = target.pipelineStatus ?? 'Not set';
    acc[status] = [...(acc[status] || []), target];
    return acc;
  }, {} as Record<string, Target[]>);

  const updatePipelineStatus = useCallback(async (targetId: number, newStatus: Target['pipelineStatus']) => {
    try {
      const response = await fetch(`/api/targets/${targetId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: targetId, pipelineStatus: newStatus }),
      });

      console.log("PATCH Response Status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Response Data:", data);

        setTargets((prevTargets) =>
          prevTargets.map((target) =>
            target.id === targetId ? { ...target, pipelineStatus: newStatus } : target
          )
        );
        setOpenDropdown(null);
      } else {
        const errorData = await response.json();
        console.error('Failed to update pipeline status:', errorData);
      }
    } catch (error) {
      console.error('Error updating pipeline status:', error);
    }
  }, []);

  const pipelineStatuses: Target['pipelineStatus'][] = ["Passed", "Cold", "Active", "Hot", "Closed", null];

  return (
    <div className="p-4 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Target Table</h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {Object.entries(groupedTargets).map(([status, targetsInGroup]) => (
          <div key={status} className="mb-4 p-4 border border-gray-300 rounded-lg shadow-md bg-white">
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">{status}</h3>
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-gray-800">
                  <th className="border-b border-gray-300 p-3 text-left text-white">Name</th>
                  <th className="border-b border-gray-300 p-3 text-left text-white">Pipeline Status</th>
                  <th className="border-b border-gray-300 p-3 text-left text-white">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {targetsInGroup.map((target) => (
                  <TargetRow
                    key={target.id}
                    target={target}
                    updatePipelineStatus={updatePipelineStatus}
                    openDropdown={openDropdown}
                    setOpenDropdown={setOpenDropdown}
                    pipelineStatuses={pipelineStatuses}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TargetTable;
