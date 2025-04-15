'use client';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

export default function AreaChart() {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Users',
        data: [23, 90, 44, 89, 100, 80, 999], // Fallback data
        fill: true,
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',  // Tailwind's blue-500 with opacity
        borderColor: '#3b82f6',                      // Tailwind's blue-500
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false, position: 'top' },
      title: { display: false, text: 'Monthly Visitors - Area Chart' },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return <Line data={data} options={options} />;
}
