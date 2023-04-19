import React, { useEffect, useRef } from 'react';
import { Chart } from 'react-chartjs-2';
import { formatCurrency } from '../util';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const staticData = {
  label: 'Sales',
  borderColor: '#3182ce',
  fill: 'start',
};

const options = {
  responsive: true,
  elements: {
    line: {
      tension: 0.3,
      borderWidth: 1.5,
    },
    point: {
      radius: 0,
    },
  },
  scales: {
    y: {
      ticks: {
        callback: (value) => formatCurrency(value),
      },
    },
  },
};

const createGradient = (chart) => {
  const ctx = chart.ctx;
  const gradient = ctx.createLinearGradient(0, 0, 0, 250);

  gradient.addColorStop(0, 'rgba(0, 97, 215, 0.4)');
  gradient.addColorStop(1, 'rgba(0, 200, 255, 0)');

  return gradient;
};

const useChart = ({ salesData }) => {
  const chartRef = useRef(null);
  const dataSets = useRef([]);

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    const gradient = createGradient(chart);
    const updatedData = {
      labels: salesData.map((sale) => sale.date),
      datasets: [
        {
          ...staticData,
          data: salesData.map((sale) => sale.amount),
          backgroundColor: gradient,
        },
      ],
    };

    dataSets.current = updatedData.datasets;

    if (chartRef.current) {
      chart.data = updatedData;
      chart.update();
    }
  }, [salesData]);

  return {
    chartRef,
    dataSets: dataSets.current,
  };
};

const DashboardChart = ({ salesData }) => {
  const { chartRef, dataSets } = useChart({ salesData });

  return <Chart type="line" height={100} ref={chartRef} data={{ datasets: dataSets }} options={options} />;
};

export default DashboardChart;
