import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const colorPalette = [
  '#0d6efd', // primary
  '#6c757d', // secondary
  '#198754', // success
  '#dc3545', // danger
  '#ffc107', // warning
  '#0dcaf0', // info
  '#6610f2', // indigo
  '#d63384', // pink
  '#fd7e14', // orange
  '#20c997'  // teal
];

interface LineChartProps {
  series: {
    name: string;
    data: number[];
  }[];
  categories: string[];
}

export const LineChart = ({ series, categories }: LineChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const options = {
      chart: {
        type: 'line',
        height: 300,
        toolbar: { show: false },
      },
      colors: colorPalette,
      series: series,
      xaxis: {
        categories: categories
      },
      stroke: {
        width: 5,
        curve: 'smooth'
      }
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => chart.destroy();
  }, [series, categories]);

  return <div ref={chartRef} />;
};

interface BarChartProps {
  data: {
    x: string;
    y: number;
  }[];
}

export const BarChart = ({ 
  data
}: BarChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const options = {
      chart: {
        type: 'bar',
        height: 300,
        toolbar: { show: false },
      },
      colors: colorPalette,
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 4,
          distributed: true,
        }
      },
      dataLabels: { enabled: false },
      series: [{
        name: 'Valores',
        data: data.map((item, index) => ({
          ...item,
          color: colorPalette[index % colorPalette.length] 
        }))
      }],
      xaxis: { type: 'category' }
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => chart.destroy();
  }, [data]);

  return <div ref={chartRef} />;
};
