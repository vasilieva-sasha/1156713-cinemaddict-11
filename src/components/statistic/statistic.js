import AbstractSmartComponent from "../abstract-smart-component";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {createStatisticTemplate} from "./components/statistic";
import {getDateFromString} from "../../tools/utils/utils";


export default class Statistic extends AbstractSmartComponent {
  constructor(filmsModel) {
    super();

    this._filmsModel = filmsModel;
    this._chart = null;
    this._chartData = null;
    this._chartLabels = null;
    this._chartCounts = null;

    this.show.bind(this);
  }

  getTemplate() {
    return createStatisticTemplate();
  }

  render() {
    this._setChartData();
    this._renderChart();
  }

  hide() {
    super.hide();
  }

  show() {
    super.show();
  }

  _setChartData() {
    this._chartData = this._filmsModel.getWatchedFilmsCountByGenre();

    this._chartLabels = this._chartData.map((genre) => genre.name);
    this._chartCounts = this._chartData.map((genre) => genre.count);
  }

  _renderChart() {
    const BAR_HEIGHT = 50;
    const statisticCtx = document.querySelector(`.statistic__chart`);

    console.log(this._filmsModel.getWatchedFilms());
    // Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
    statisticCtx.height = BAR_HEIGHT * this._chartData.length;

    this._chart = new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: this._chartLabels,
        datasets: [{
          data: this._chartCounts,
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`,
          barThickness: 24
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });
  }
}
