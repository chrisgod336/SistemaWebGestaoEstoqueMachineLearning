import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

export const LineChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const options = {
      chart: {
        type: 'line',
        height: 300,
      },
      series: [{
        name: 'Sales',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
      }],
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      }
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => chart.destroy();
  }, []);

  return <div ref={chartRef} />;
};

export const BarChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const options = {
      chart: {
        type: 'bar',
        height: 300,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 4
        }
      },
      dataLabels: {
        enabled: false
      },
      series: [{
        name: 'Vendas',
        data: [30, 40, 45, 50, 49, 60, 70]
      }],
      xaxis: {
        categories: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
      }
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => chart.destroy();
  }, []);

  return <div ref={chartRef} />;
};
