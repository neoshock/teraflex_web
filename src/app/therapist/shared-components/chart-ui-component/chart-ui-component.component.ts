import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";



@Component({
  selector: 'app-chart-ui-component',
  templateUrl: './chart-ui-component.component.html',
  styleUrls: ['./chart-ui-component.component.css']
})
export class ChartUiComponentComponent {
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        data: [28, 48, 40, 19, 86, 27, 90],
        label: 'Ejercicios completados',
        fill: true,
        tension: 0.4,
        borderColor: '#5cb85c',
        borderWidth: 2,
        backgroundColor: 'rgba(92, 184, 92, 0.1)',
        pointBackgroundColor: '#5cb85c',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#5cb85c'
      },
      {
        data: [18, 48, 77, 9, 100, 27, 40],
        label: 'Ejercicios sin completar',
        fill: true,
        tension: 0.4,
        borderColor: '#d9534f',
        borderWidth: 2,
        backgroundColor: 'rgba(217, 83, 79, 0.1)',
        pointBackgroundColor: '#d9534f',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#d9534f'
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 20,
        }
      }
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 0.4,
        to: 0.3,
      }
    }
  };

  public lineChartLegend = true;
}
