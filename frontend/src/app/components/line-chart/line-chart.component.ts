import { Component, Input } from '@angular/core';
import { TimeSeries } from 'src/app/common/time-series';
import { StockService } from '../../services/stock.service';
import { DataPoint } from 'src/app/common/data-point';
import { ApexOptions } from '../../common/apex-options';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent {
  @Input() dataSeries: DataPoint[] = [];

  apexOptions: ApexOptions;

  constructor(private service: StockService) {
    this.apexOptions = {
      series: [
        {
          name: 'Volume',
          data: [],
        },
      ],
      chart: {
        type: 'area',
        stacked: false,
        height: 350,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: 'zoom',
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      title: {
        text: 'Movimentação baseado no volume de transações',
        align: 'left',
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      yaxis: {
        labels: {
          formatter: function (val: any) {
            return (val).toFixed(0);
          },
        },
        title: {
          text: 'Volume',
        },
      },
      xaxis: {
        type: 'datetime',
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val: any) {
            return (val).toFixed(0);
          },
        },
      },
    };
  }

  ngOnInit() {
    this.service.getStockData('IBM', 'TIME_SERIES_DAILY').subscribe(
      (backendData: any) => {
        const dataSeries = this.formatChartData(
          backendData['Time Series (Daily)']
        );
        this.apexOptions.series[0].data = dataSeries;
      },
      (error: any) => {
        console.error('Ocorreu um erro ao buscar os dados do ativo.', error);
      }
    );
  }

  formatChartData(timeSeries: TimeSeries): any[] {
    const formattedData = [];
    for (let date in timeSeries) {
      if (timeSeries.hasOwnProperty(date)) {
        const record = timeSeries[date];
        const dataPoint = {
          x: new Date(date).getTime(),
          y: parseFloat(record['5. volume']),
        };
        formattedData.push(dataPoint);
      }
    }
    return formattedData;
  }
}
