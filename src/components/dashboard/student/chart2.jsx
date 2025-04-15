'use client';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function AreaChart2() {
  const labels = ['Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Metric A',
        data: [12, 19, 3, 5, 2, 9],
        fill: true,
        borderColor: '#6366f1', // Indigo-500
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.5,
        pointRadius: 0,
      },
      {
        label: 'Metric B',
        data: [8, 12, 15, 8, 10, 14],
        fill: true,
        borderColor: '#3b82f6', // Blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.5,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.1)' },
        ticks: { color: '#cbd5e1' }, // Slate-300
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.1)' },
        ticks: { color: '#cbd5e1' },
      },
    },
  };

  return (
    <div className="w-full h-64 bg-[#1e293b] rounded-xl p-4">
      <Line data={data} options={options} />
    </div>
  );
}
