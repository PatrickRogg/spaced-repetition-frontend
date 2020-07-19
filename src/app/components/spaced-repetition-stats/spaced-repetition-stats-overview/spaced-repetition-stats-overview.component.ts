import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-spaced-repetition-stats-overview',
  templateUrl: './spaced-repetition-stats-overview.component.html',
  styleUrls: ['./spaced-repetition-stats-overview.component.scss'],
})
export class SpacedRepetitionStatsOverviewComponent implements OnInit {
  @Input() chartData: number[];

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
    },
  };
  public pieChartLabels: Label[] = ['Correct', 'Wrong', 'Not Done'];
  public pieChartData: number[] = [10, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['#20c997', 'rgba(247,70,74,1)', 'rgba(148,159,177,1)'],
    },
  ];

  constructor() {}

  ngOnInit() {
    this.updateChartData();
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public updateChartData() {
    this.pieChartData[0] = this.chartData[0];
    this.pieChartData[1] = this.chartData[1];
    this.pieChartData[2] = this.chartData[2];
  }
}
