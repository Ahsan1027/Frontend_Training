import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ChartWrapper from './style';

const PieHighchartsChart = ({ totalOrders, totalAmount }) => {
  const maxYAxisValue = Math.max(...totalOrders, ...totalAmount);
  const options = {
    colors: ['#87C5FF', '#FF8339'],
    title: {
      text: '',
      align: 'right',
    },
    xAxis: {
      gridLineWidth: 1,
      gridLineColor: '#C7E2FF',
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      gridLineDashStyle: 'Dash',
    },
    yAxis: {
      gridLineWidth: 1,
      gridLineColor: '#C7E2FF',
      gridLineDashStyle: 'Dash',
      min: 0,
      max: maxYAxisValue,
    },
    legend: {
      align: 'left',
      verticalAlign: 'top',
      floating: false,
      x: 0,
      y: 0,
    },
    series: [
      {
        name: 'Total Orders - 2023',
        data: totalOrders,
      },
      {
        name: 'Total Amount - 2023',
        data: totalAmount,
      },
    ],
  };

  return (
    <ChartWrapper>
      <div className='mt-3 ms-4'> <h6>Sales & Orders Report</h6>
        {totalAmount && totalOrders && (
            <HighchartsReact highcharts={Highcharts} options={options} />
          )
        }
      </div>
    </ChartWrapper>
  );
};

export default PieHighchartsChart;
