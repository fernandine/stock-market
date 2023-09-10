import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ChartOptions } from 'src/app/common/chart-options';
import { MetaData } from 'src/app/common/meta-data';
import { TimeSeries } from 'src/app/common/time-series';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {

  dataTimeSeries: any[] = [];

  form!: FormGroup;
  chartOptions: ChartOptions;
  metaData!: MetaData;
  dataSource = new MatTableDataSource<MetaData>([]);
  maxElements = 6;

  readonly displayedColumns = [
    'information',
    'symbol',
    'lastRefreshed',
    'outputSize',
    'timeZone',
  ];

  readonly displayedColumns2 = ['data', 'abertura', 'fechamento'];

  constructor(private service: StockService, private formBuilder: FormBuilder) {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'candlestick',
        height: 350,
      },
      title: {
        text: 'CandleStick Chart',
        align: 'left',
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
    };


  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      symbol: ['IBM'],
      function: ['TIME_SERIES_DAILY'],
    });
    this.loadData();
  }

  formatChartData(response: TimeSeries) {
    const timeSeries = response;
    const data = [];
    for (let date in timeSeries) {
      if (timeSeries.hasOwnProperty(date)) {
        const record = timeSeries[date];
        const chartData = [
          new Date(date).getTime(),
          parseFloat(record['1. open']),
          parseFloat(record['2. high']),
          parseFloat(record['3. low']),
          parseFloat(record['4. close']),
        ];
        data.push(chartData);
      }
    }
    return data;
  }

  loadData() {
    const symbol = this.form.get('symbol')?.value;
    const func = this.form.get('function')?.value;
    this.service.getStockData(symbol, func).subscribe((response) => {
      const formattedData = [];

      for (let date in response['Time Series (Daily)']) {
        if (response['Time Series (Daily)'].hasOwnProperty(date)) {
          const record = response['Time Series (Daily)'][date];
          formattedData.push({
            date: date,
            open: parseFloat(record['1. open']),
            close: parseFloat(record['4. close']),
            value: parseFloat(record['5. volume']),
          });
        }
      }

      this.dataTimeSeries = formattedData;

      const formattedChartSeries = this.formatChartData(
        response['Time Series (Daily)']
      );
      this.chartOptions.series = [{ data: formattedChartSeries }];

      this.metaData = response['Meta Data'];
      this.dataSource.data = [this.metaData];
    });
  }
}
