import AbstractSmartComponent from "../abstract-smart-component";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {createStatisticTemplate} from "./components/statistic";
import {STATISTIC_FILTER, BAR_HEIGHT} from "../../consts/consts";


export default class Statistic extends AbstractSmartComponent {
  constructor(filmsModel) {
    super();

    this._filmsModel = filmsModel;
    this._chart = null;
    this._chartData = null;
    this._chartLabels = null;
    this._chartCounts = null;
    this._currentFilterType = STATISTIC_FILTER[0].period;
    this._filteredFilms = null;

    this.show.bind(this);
  }

  getTemplate() {
    return createStatisticTemplate(this._filmsModel, this._filmsModel.getStisticsResults(this._currentFilterType));
  }

  render() {
    this._filteredFilms = this._filmsModel.getWatchedFilms();

    this._setFilterChangeHandler();
    this._renderChart();
  }

  rerender() {
    super.rerender();

    const input = this.getElement().querySelector(`[data-filter-type=${this._currentFilterType}]`);
    input.setAttribute(`checked`, `checked`);

    this._renderChart();
    this.show();
  }

  recoveryListeners() {
    this._setFilterChangeHandler();
  }

  hide() {
    this._currentFilterType = STATISTIC_FILTER[0].period;
    super.hide();
  }

  show() {
    super.show();
  }

  _getStisticsResults() {
    return {
      filmCount: this._filteredFilms.length,
      hoursCount: this._filteredFilms.reduce((length, film) => {
        return length + film.details[4][`info`];
      }, 0),
      genre: this._chartLabels.slice(0, 1)
    };
  }

  _setFilterChangeHandler() {
    this.getElement().addEventListener(`change`, (evt) => {
      evt.preventDefault();

      const filterType = evt.target.dataset.filterType;
      this._filteredFilms = this._filmsModel.getFilteredFilmsforStats(filterType);

      const input = this.getElement().querySelector(`[data-filter-type=${this._currentFilterType}]`);
      input.setAttribute(`checked`, `checked`);

      this._currentFilterType = filterType;

      this.rerender();
    });
  }

  _renderChart() {
    const statisticCtx = document.querySelector(`.statistic__chart`);

    this._chartData = this._filmsModel.getWatchedFilmsCountByGenre(this._filteredFilms, this._currentFilterType);
    statisticCtx.height = BAR_HEIGHT * this._chartData.length;

    this._chart = new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: this._chartData.map((genre) => genre.name),
        datasets: [{
          data: this._chartData.map((genre) => genre.count),
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
