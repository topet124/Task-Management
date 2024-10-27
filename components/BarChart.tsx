'use client';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { ChartData, Target } from '@/lib/types';
import { SkeletonLoader } from './SkeletonLoader';
import { BarChartProps } from '../lib/types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart: React.FC<BarChartProps> = ({ filter = 'all' }) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/targets');
      const data: Target[] = await response.json();

      const filteredData = filter === 'all'
        ? data
        : data.filter(target =>
          filter === 'null'
            ? target.pipelineStatus === null
            : target.pipelineStatus === filter
        );

      const statusCounts = filteredData.reduce((acc: Record<string, number>, target: Target) => {
        const status = target.pipelineStatus === null ? 'Not set' : target.pipelineStatus;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {});

      setChartData({
        labels: Object.keys(statusCounts),
        datasets: [
          {
            label: 'Number of Targets',
            data: Object.values(statusCounts),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            barThickness: 50,
          }
        ]
      });
    };

    fetchData();
  }, [filter]);

  if (!chartData) return <SkeletonLoader />;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        min: 0,
        max: 12,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
    elements: {
      bar: {
        maxBarThickness: 20,
        borderRadius: 5,
      },
    },
  };

  return (
    <div className="w-full h-64">
      <h2 className="text-xl font-semibold mb-4">Targets by Pipeline Status</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
