import { DiscreteBarChartConfiguration, DonutChartConfiguration, LineChartConfiguration, MultiBarHorizontalChartConfiguration, StackedAreaChartConfiguration, PieChartConfiguration } from 'ontimize-web-ngx-charts';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Factory } from '../../shared/interfaces/factories.interface';
import { OComboComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  @ViewChild('comboCountry', { static: true }) comboCountry!: OComboComponent;
  @ViewChild('comboFactory', { static: true }) comboFactory!: OComboComponent;
  @ViewChild('comboModel', { static: true }) comboModel!: OComboComponent;

  factories: Factory[] = [
    {
      "id": 1,
      "name": "Factory Germany 1",
      "country": "Germany",
      "employees": 3500,
      "models": [
        {
          "name": "Falcon X",
          "category": "SUV",
          "engine": "V6 Petrol",
          "basePriceUSD": 38000,
          "production": [
            { "year": 2018, "units": 25000 },
            { "year": 2019, "units": 27000 },
            { "year": 2020, "units": 22000 },
            { "year": 2021, "units": 19000 }
          ]
        },
        {
          "name": "UrbanGo",
          "category": "Hatchback",
          "engine": "1.6L Petrol",
          "basePriceUSD": 18000,
          "production": [
            { "year": 2019, "units": 30000 },
            { "year": 2020, "units": 32000 },
            { "year": 2021, "units": 28000 },
            { "year": 2022, "units": 26000 }
          ]
        }
      ]
    },
    {
      "id": 2,
      "name": "Factory Germany 2",
      "country": "Germany",
      "employees": 2800,
      "models": [
        {
          "name": "Aurora E",
          "category": "Electric Sedan",
          "engine": "75kWh Electric",
          "basePriceUSD": 42000,
          "production": [
            { "year": 2020, "units": 12000 },
            { "year": 2021, "units": 18000 },
            { "year": 2022, "units": 22000 },
            { "year": 2023, "units": 26000 }
          ]
        },
        {
          "name": "Rhine Crossover",
          "category": "Crossover",
          "engine": "2.0L Hybrid",
          "basePriceUSD": 33000,
          "production": [
            { "year": 2019, "units": 15000 },
            { "year": 2020, "units": 17000 },
            { "year": 2021, "units": 19000 }
          ]
        }
      ]
    },
    {
      "id": 3,
      "name": "Factory Germany 3",
      "country": "Germany",
      "employees": 3100,
      "models": [
        {
          "name": "Berlin Compact",
          "category": "Compact",
          "engine": "1.4L Petrol",
          "basePriceUSD": 21000,
          "production": [
            { "year": 2017, "units": 14000 },
            { "year": 2018, "units": 16000 },
            { "year": 2019, "units": 15000 }
          ]
        },
        {
          "name": "Teutonic EV",
          "category": "Electric SUV",
          "engine": "90kWh Electric",
          "basePriceUSD": 47000,
          "production": [
            { "year": 2021, "units": 8000 },
            { "year": 2022, "units": 12000 },
            { "year": 2023, "units": 15000 }
          ]
        }
      ]
    },
    {
      "id": 4,
      "name": "Factory Germany 4",
      "country": "Germany",
      "employees": 2600,
      "models": [
        {
          "name": "Alpine Van",
          "category": "Van",
          "engine": "2.2L Diesel",
          "basePriceUSD": 25000,
          "production": [
            { "year": 2018, "units": 9000 },
            { "year": 2019, "units": 10000 },
            { "year": 2020, "units": 12000 }
          ]
        },
        {
          "name": "Bavaria Pickup",
          "category": "Pickup",
          "engine": "3.0L Petrol",
          "basePriceUSD": 36000,
          "production": [
            { "year": 2019, "units": 7000 },
            { "year": 2020, "units": 9500 },
            { "year": 2021, "units": 11000 }
          ]
        }
      ]
    },
    {
      "id": 5,
      "name": "Factory Spain 1",
      "country": "Spain",
      "employees": 2200,
      "models": [
        {
          "name": "Solaria",
          "category": "Compact EV",
          "engine": "Electric 65kWh",
          "basePriceUSD": 29000,
          "production": [
            { "year": 2020, "units": 12000 },
            { "year": 2021, "units": 17000 },
            { "year": 2022, "units": 25000 },
            { "year": 2023, "units": 28000 }
          ]
        },
        {
          "name": "Mediterraneo",
          "category": "Sedan",
          "engine": "2.0L Diesel",
          "basePriceUSD": 24000,
          "production": [
            { "year": 2017, "units": 18000 },
            { "year": 2018, "units": 22000 },
            { "year": 2019, "units": 21000 },
            { "year": 2020, "units": 15000 }
          ]
        }
      ]
    },
    {
      "id": 6,
      "name": "Factory Spain 2",
      "country": "Spain",
      "employees": 2600,
      "models": [
        {
          "name": "Iberia X",
          "category": "SUV",
          "engine": "2.0L Petrol",
          "basePriceUSD": 31000,
          "production": [
            { "year": 2020, "units": 9000 },
            { "year": 2021, "units": 14000 },
            { "year": 2022, "units": 20000 },
            { "year": 2023, "units": 24000 }
          ]
        },
        {
          "name": "Costa EV",
          "category": "Electric Hatchback",
          "engine": "50kWh Electric",
          "basePriceUSD": 27000,
          "production": [
            { "year": 2021, "units": 8000 },
            { "year": 2022, "units": 12000 },
            { "year": 2023, "units": 17000 }
          ]
        }
      ]
    },
    {
      "id": 7,
      "name": "Factory USA 1",
      "country": "USA",
      "employees": 5000,
      "models": [
        {
          "name": "Thunderbolt",
          "category": "Pickup",
          "engine": "V8 Petrol",
          "basePriceUSD": 42000,
          "production": [
            {
              "year": 2014,
              "units": 28000
            },
            {
              "year": 2015,
              "units": 30000
            },
            {
              "year": 2016,
              "units": 32000
            },
            {
              "year": 2017,
              "units": 31000
            }
          ]
        },
        {
          "name": "Freedom EV",
          "category": "Electric SUV",
          "engine": "100kWh Electric",
          "basePriceUSD": 52000,
          "production": [
            {
              "year": 2020,
              "units": 10000
            },
            {
              "year": 2021,
              "units": 16000
            },
            {
              "year": 2022,
              "units": 21000
            },
            {
              "year": 2023,
              "units": 25000
            }
          ]
        }
      ]
    },
    {
      "id": 8,
      "name": "Factory USA 2",
      "country": "USA",
      "employees": 4200,
      "models": [
        {
          "name": "Liberty Sedan",
          "category": "Sedan",
          "engine": "2.0L Hybrid",
          "basePriceUSD": 30000,
          "production": [
            {
              "year": 2016,
              "units": 18000
            },
            {
              "year": 2017,
              "units": 22000
            },
            {
              "year": 2018,
              "units": 25000
            },
            {
              "year": 2019,
              "units": 24000
            }
          ]
        },
        {
          "name": "Eagle Compact",
          "category": "Hatchback",
          "engine": "1.6L Petrol",
          "basePriceUSD": 20000,
          "production": [
            {
              "year": 2018,
              "units": 15000
            },
            {
              "year": 2019,
              "units": 17000
            },
            {
              "year": 2020,
              "units": 20000
            }
          ]
        }
      ]
    },
    {
      "id": 9,
      "name": "Factory Japan 1",
      "country": "Japan",
      "employees": 4200,
      "models": [
        {
          "name": "Samurai Z",
          "category": "Sedan",
          "engine": "2.0L Hybrid",
          "basePriceUSD": 30000,
          "production": [
            {
              "year": 2015,
              "units": 20000
            },
            {
              "year": 2016,
              "units": 23000
            },
            {
              "year": 2017,
              "units": 25000
            },
            {
              "year": 2018,
              "units": 20000
            }
          ]
        },
        {
          "name": "EcoRide",
          "category": "Hybrid SUV",
          "engine": "Hybrid 1.8L",
          "basePriceUSD": 27000,
          "production": [
            {
              "year": 2018,
              "units": 15000
            },
            {
              "year": 2019,
              "units": 20000
            },
            {
              "year": 2020,
              "units": 22000
            },
            {
              "year": 2021,
              "units": 25000
            }
          ]
        }
      ]
    },
    {
      "id": 10,
      "name": "Factory Japan 2",
      "country": "Japan",
      "employees": 3900,
      "models": [
        {
          "name": "Shinkai",
          "category": "Electric Compact",
          "engine": "55kWh Electric",
          "basePriceUSD": 26000,
          "production": [
            {
              "year": 2021,
              "units": 8000
            },
            {
              "year": 2022,
              "units": 15000
            },
            {
              "year": 2023,
              "units": 20000
            }
          ]
        },
        {
          "name": "Nippon Van",
          "category": "Van",
          "engine": "2.5L Diesel",
          "basePriceUSD": 28000,
          "production": [
            {
              "year": 2017,
              "units": 10000
            },
            {
              "year": 2018,
              "units": 12000
            },
            {
              "year": 2019,
              "units": 14000
            }
          ]
        }
      ]
    },
    {
      "id": 11,
      "name": "Factory Japan 3",
      "country": "Japan",
      "employees": 3500,
      "models": [
        {
          "name": "Sakura EV",
          "category": "Electric Sedan",
          "engine": "70kWh Electric",
          "basePriceUSD": 32000,
          "production": [
            {
              "year": 2020,
              "units": 6000
            },
            {
              "year": 2021,
              "units": 10000
            },
            {
              "year": 2022,
              "units": 15000
            }
          ]
        },
        {
          "name": "Fuji SUV",
          "category": "SUV",
          "engine": "2.2L Petrol",
          "basePriceUSD": 31000,
          "production": [
            {
              "year": 2018,
              "units": 13000
            },
            {
              "year": 2019,
              "units": 15000
            },
            {
              "year": 2020,
              "units": 17000
            }
          ]
        }
      ]
    },
    {
      "id": 12,
      "name": "Factory Japan 4",
      "country": "Japan",
      "employees": 3300,
      "models": [
        {
          "name": "Hokkaido Truck",
          "category": "Pickup",
          "engine": "3.0L Diesel",
          "basePriceUSD": 34000,
          "production": [
            {
              "year": 2017,
              "units": 8000
            },
            {
              "year": 2018,
              "units": 10000
            },
            {
              "year": 2019,
              "units": 12000
            }
          ]
        },
        {
          "name": "Koi Compact",
          "category": "Compact",
          "engine": "1.2L Petrol",
          "basePriceUSD": 16000,
          "production": [
            {
              "year": 2019,
              "units": 14000
            },
            {
              "year": 2020,
              "units": 16000
            },
            {
              "year": 2021,
              "units": 18000
            }
          ]
        }
      ]
    },
    {
      "id": 13,
      "name": "Factory Japan 5",
      "country": "Japan",
      "employees": 3700,
      "models": [
        {
          "name": "Zen Hybrid",
          "category": "Hybrid Sedan",
          "engine": "1.8L Hybrid",
          "basePriceUSD": 28000,
          "production": [
            {
              "year": 2018,
              "units": 11000
            },
            {
              "year": 2019,
              "units": 13000
            },
            {
              "year": 2020,
              "units": 15000
            }
          ]
        },
        {
          "name": "Mount EV",
          "category": "Electric SUV",
          "engine": "85kWh Electric",
          "basePriceUSD": 40000,
          "production": [
            {
              "year": 2021,
              "units": 7000
            },
            {
              "year": 2022,
              "units": 11000
            },
            {
              "year": 2023,
              "units": 16000
            }
          ]
        }
      ]
    }
  ]

  protected colorScheme: {
    domain: string[]
  };

  protected donutParams: DonutChartConfiguration;
  protected pieParams: PieChartConfiguration;
  protected horizontalBarParams: MultiBarHorizontalChartConfiguration;
  protected lineParams: LineChartConfiguration;
  protected barParams: DiscreteBarChartConfiguration;
  protected stackParams: StackedAreaChartConfiguration;

  protected barData: any[] = [];
  protected lineData: any[] = [];
  protected donutData: any[] = [];
  protected multiBarData: any[] = [];
  protected pieData: any[] = [];
  protected stackedAreaData: any[] = [];

  countries: { id: number; name: string }[] = [];
  factoriesFiltered: { id: number; name: string }[] = [];
  modelsFiltered: { id: number; name: string }[] = [];

  selectedCountry?: string;
  selectedFactory?: string;
  selectedModel?: string;

  constructor() {
    this.configureCharts();
  }

  ngOnInit(): void {
    this.initFilters();
    this.updateAllCharts();
  }

  private initFilters(): void {
    const uniqueCountries = Array.from(new Set(this.factories.map(f => f.country)));
    this.countries = uniqueCountries.map((country, index) => ({
      id: index + 1,
      name: country
    }));
  }

  onCountryChange(country: string): void {
    this.selectedCountry = country;

    this.factoriesFiltered = this.factories.filter(f => f.country === this.selectedCountry)
      .map(f => ({
        id: f.id,
        name: f.name
      }));

    this.comboFactory.setDataArray(this.factoriesFiltered);
    this.comboFactory.clearValue();
    this.comboModel.clearValue();

    this.updateAllCharts();
  }

  onFactoryChange(factoryName: string): void {
    this.selectedFactory = factoryName;
    const selectedFactoriesFromCountry = this.factories.find(f => f.name === this.selectedFactory);

    this.modelsFiltered = selectedFactoriesFromCountry.models.map((m, i) => ({
      id: i + 1,
      name: m.name
    }));

    this.comboModel.setDataArray(this.modelsFiltered);
    this.comboModel.clearValue();

    this.updateAllCharts();
  }

  onModelChange(model: string): void {
    this.selectedModel = model;
    this.updateAllCharts();
  }


  private updateAllCharts(): void {

    let filteredFactories = this.factories;

    if (this.selectedCountry) {
      filteredFactories = filteredFactories.filter(f => f.country === this.selectedCountry);
    }

    if (this.selectedFactory) {
      filteredFactories = filteredFactories.filter(f => f.name === this.selectedFactory);
    }

    if (this.selectedModel) {
      filteredFactories = filteredFactories.map(f => ({
        ...f,
        models: f.models.filter(m => m.name === this.selectedModel)
      }));
    }

    this.buildDonutData(filteredFactories);
    this.buildPieData(filteredFactories);
    this.buildBarData(filteredFactories);
    this.buildLineData(filteredFactories);
    this.buildMultiBarData(filteredFactories);
    this.buildStackedAreaData(filteredFactories);
  }

  private buildStackedAreaData(filteredFactories: any[]): void {
    const groupTotals: { [key: string]: { [year: number]: number } } = {};

    if (!this.selectedCountry) {
      filteredFactories.forEach(f =>
        f.models.forEach(m =>
          m.production.forEach(p => {
            if (!groupTotals[f.country]) groupTotals[f.country] = {};
            groupTotals[f.country][p.year] =
              (groupTotals[f.country][p.year] || 0) + p.units;
          })
        )
      );
    } else if (this.selectedCountry && !this.selectedFactory) {
      filteredFactories.forEach(f =>
        f.models.forEach(m =>
          m.production.forEach(p => {
            if (!groupTotals[f.name]) groupTotals[f.name] = {};
            groupTotals[f.name][p.year] =
              (groupTotals[f.name][p.year] || 0) + p.units;
          })
        )
      );
    } else if (this.selectedFactory && !this.selectedModel) {
      const factory = filteredFactories[0];
      factory.models.forEach(m =>
        m.production.forEach(p => {
          if (!groupTotals[m.name]) groupTotals[m.name] = {};
          groupTotals[m.name][p.year] =
            (groupTotals[m.name][p.year] || 0) + p.units;
        })
      );
    } else {
      const model = filteredFactories[0].models[0];
      groupTotals[model.name] = {};
      model.production.forEach(p => (groupTotals[model.name][p.year] = p.units));
    }

    this.stackedAreaData = Object.keys(groupTotals).map(group => ({
      name: group,
      series: Object.keys(groupTotals[group])
        .map(year => ({
          name: year,
          value: groupTotals[group][+year]
        }))
        .sort((a, b) => +a.name - +b.name)
    }));
  }

  private buildMultiBarData(filteredFactories: any[]): void {
    if (!this.selectedCountry) {
      const countryTotals: { [c: string]: number } = {};
      filteredFactories.forEach(f =>
        f.models.forEach(m =>
          m.production.forEach(p =>
            (countryTotals[f.country] = (countryTotals[f.country] || 0) + p.units)
          )
        )
      );
      this.multiBarData = Object.keys(countryTotals).map(c => ({
        name: c,
        value: countryTotals[c]
      }));
    } else if (this.selectedCountry && !this.selectedFactory) {
      this.multiBarData = filteredFactories.map(f => ({
        name: f.name,
        value: f.models.reduce(
          (sum, m) => sum + m.production.reduce((s, p) => s + p.units, 0),
          0
        )
      }));
    } else if (this.selectedFactory && !this.selectedModel) {
      const factory = filteredFactories[0];
      this.multiBarData = factory.models.map(m => ({
        name: m.name,
        value: m.production.reduce((sum, p) => sum + p.units, 0)
      }));
    } else if (this.selectedModel) {
      const model = filteredFactories[0]?.models[0];
      if (model) {
        this.multiBarData = model.production.map(p => ({
          name: p.year.toString(),
          value: p.units
        }));
      } else {
        this.multiBarData = [];
      }
    } else {
      this.multiBarData = [];
    }
  }

  private buildLineData(filteredFactories: any[]): void {
    const yearTotals: { [year: number]: number } = {};
    filteredFactories.forEach(f =>
      f.models.forEach(m =>
        m.production.forEach(p => {
          yearTotals[p.year] = (yearTotals[p.year] || 0) + p.units;
        })
      )
    );

    this.lineData = [
      {
        name:
          this.selectedModel ??
          this.selectedFactory ??
          this.selectedCountry ??
          'Total Units',
        series: Object.keys(yearTotals)
          .map(year => ({ name: year, value: yearTotals[+year] }))
          .sort((a, b) => +a.name - +b.name)
      }
    ];
  }

  private buildPieData(filteredFactories: any[]): void {
    if (!this.selectedCountry) {
      const countryTotals: { [country: string]: number } = {};
      filteredFactories.forEach(f =>
        f.models.forEach(m =>
          m.production.forEach(p =>
            (countryTotals[f.country] = (countryTotals[f.country] || 0) + p.units)
          )
        )
      );
      this.pieData = Object.keys(countryTotals).map(country => ({
        name: country,
        value: countryTotals[country]
      }));
    } else if (this.selectedCountry && !this.selectedFactory) {
      const categoryTotals: { [cat: string]: number } = {};
      filteredFactories.forEach(f =>
        f.models.forEach(m =>
          m.production.forEach(p =>
            (categoryTotals[m.category] = (categoryTotals[m.category] || 0) + p.units)
          )
        )
      );
      this.pieData = Object.keys(categoryTotals).map(cat => ({
        name: cat,
        value: categoryTotals[cat]
      }));
    } else if (this.selectedFactory && !this.selectedModel) {
      const engineTotals: { [engine: string]: number } = {};
      filteredFactories.forEach(f =>
        f.models.forEach(m =>
          m.production.forEach(p =>
            (engineTotals[m.engine] = (engineTotals[m.engine] || 0) + p.units)
          )
        )
      );
      this.pieData = Object.keys(engineTotals).map(engine => ({
        name: engine,
        value: engineTotals[engine]
      }));
    } else {
      this.pieData = [{ name: this.selectedModel!, value: 100 }];
    }
  }

  private buildDonutData(filteredFactories: any[]): void {
    if (!this.selectedCountry) {
      let japanTotal = 0;
      let othersTotal = 0;
      filteredFactories.forEach(f =>
        f.models.forEach(m =>
          m.production.forEach(p =>
            f.country === 'Japan' ? (japanTotal += p.units) : (othersTotal += p.units)
          )
        )
      );
      this.donutData = [
        { name: 'Japan', value: japanTotal },
        { name: 'Others', value: othersTotal }
      ];
    } else if (this.selectedCountry && !this.selectedFactory) {
      this.donutData = filteredFactories.map(f => ({
        name: f.name,
        value: f.models.reduce(
          (sum, m) => sum + m.production.reduce((s, p) => s + p.units, 0),
          0
        )
      }));
    } else if (this.selectedFactory && !this.selectedModel) {
      const factory = filteredFactories[0];
      this.donutData = factory.models.map(m => ({
        name: m.name,
        value: m.production.reduce((sum, p) => sum + p.units, 0)
      }));
    } else {
      this.donutData = [{ name: this.selectedModel!, value: 100 }];
    }
  }

  private buildBarData(filteredFactories: any[]): void {
    if (!this.selectedCountry) {
      this.barData = filteredFactories.map(f => ({
        name: f.name,
        value: f.models.reduce(
          (sum, m) => sum + m.production.reduce((s, p) => s + p.units, 0),
          0
        )
      }));
    } else if (this.selectedCountry && !this.selectedFactory) {
      this.barData = filteredFactories.map(f => ({
        name: f.name,
        value: f.models.reduce(
          (sum, m) => sum + m.production.reduce((s, p) => s + p.units, 0),
          0
        )
      }));
    } else if (this.selectedFactory && !this.selectedModel) {
      const factory = filteredFactories[0];
      this.barData = factory.models.map(m => ({
        name: m.name,
        value: m.production.reduce((sum, p) => sum + p.units, 0)
      }));
    } else {
      const model = filteredFactories[0].models[0];
      this.barData = model.production.map(p => ({
        name: p.year.toString(),
        value: p.units
      }));
    }
  }

  private configureCharts() {
    let splitColor = '1464a5'.match(/.{1,2}/g).map(function (hex) { return parseInt(hex, 16); });
    this.colorScheme = { domain: ['#1464a5', '#eeeeee', '#c5c5c5', 'rgba(' + splitColor[0] + ', ' + splitColor[1] + ', ' + splitColor[2] + ', 0.3)'] };

    this.barParams = new DiscreteBarChartConfiguration();
    this.barParams.height = 150;
    this.barParams.width = 400;
    this.barParams.showTooltip = true;
    this.barParams.showValues = false;

    this.pieParams = new PieChartConfiguration();
    this.pieParams.showLabels = false;
    this.pieParams.height = 150;
    this.pieParams.width = 150;

    this.horizontalBarParams = new MultiBarHorizontalChartConfiguration();
    this.horizontalBarParams.showTooltip = true;
    this.horizontalBarParams.height = 150;
    this.horizontalBarParams.width = 380;

    this.stackParams = new StackedAreaChartConfiguration();
    this.stackParams.height = 200;
    this.stackParams.width = 400;
    this.stackParams.showTooltip = true;
    this.stackParams.useInteractiveGuideline = true;
    this.stackParams.showLegend = false;

    this.donutParams = new DonutChartConfiguration();
    this.donutParams.height = 150;
    this.donutParams.width = 150;
    this.donutParams.showLabels = false;
    this.donutParams.showTooltip = true;
  }
}
