import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OTranslateService, Observable, OntimizeService } from 'ontimize-web-ngx';
import { DiscreteBarChartConfiguration, DonutChartConfiguration, OChartComponent, PieChartConfiguration } from 'ontimize-web-ngx-charts';
import { of } from 'rxjs';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  // Necesario para aplicar estilos a las gráficas
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {
  @ViewChild('donutChart')
  protected donutChart: OChartComponent;
  filteredSelectionProcesses = [];
  filteredSelectionProcessesPriority = [];
  filteredInterviews = [];
  filteredCandidates = [];
  lineData;
  protected colorScheme: {
    domain: string[]
  };
  protected donutParams: DonutChartConfiguration;
  protected pieParams: PieChartConfiguration;
  protected donutData = [];
  protected candidatesData = [];
  protected interviewsData = [];
  protected barParams: DiscreteBarChartConfiguration;
  protected barData;
  protected candidateTypes: Observable<{}> = of({});
  protected candidatesAmounts = {
    total: 0,
  };
  protected selectionProcessStatuses: Observable<{}> = of({});
  protected selectionProcessesAmounts = {
    total: 0,
    active: 0
  };
  protected interviewTypes: Observable<{}> = of({});
  protected interviewsAmounts = { total: 0 };
  protected selectionProcessPriorities: Observable<{}> = of({});
  protected selectionProcessesPerPriorityAmounts = {
    total: 0
  };

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private ontimizeService: OntimizeService,
    private cd: ChangeDetectorRef,
    private translateService: OTranslateService
  ) {
    // Chart configuration
    this.configureCharts();

    // Candidates amounts (total and by experience level)
    this.setCandidatesPerExperienceLevelAmounts();

    // Selection processes amounts (total and by status)
    this.setSelectionProcessesPerStatusAmounts();

    // Selection processes amounts (total and by priority)
    this.setSelectionProcessesPerPriorityAmounts();

    // Interviews amounts (total and by type)
    this.setInterviewsAmounts();
  }

  private configureCharts() {
    let splitColor = '1464a5'.match(/.{1,2}/g).map(function (hex) { return parseInt(hex, 16); });
    this.colorScheme = {
      domain: ['#0E5293', '#377BB3', '#b9d1e4', 'rgba(' + splitColor[0] + ', ' + splitColor[1] + ', ' + splitColor[2] + ', 0.3)']
    };

    this.donutParams = new DonutChartConfiguration();
    this.donutParams.showTooltip = true;

    this.pieParams = new PieChartConfiguration();
    this.pieParams.showLabels = false;
    this.pieParams.showTooltip = true;
    this.pieParams.height = 130;
    this.pieParams.width = 130;

    this.barParams = new DiscreteBarChartConfiguration();
    this.barParams.showLegend = false;
    this.barParams.showXAxis = true;
    this.barParams.showYAxis = true;
    this.barParams.xLabel = 'Score';
    this.barParams.yLabel = 'Count';
  }

  private setCandidatesPerExperienceLevelAmounts() {
    this.ontimizeService.configureService(this.ontimizeService.getDefaultServiceConfiguration('candidates'));

    // Get candidate experience levels
    this.ontimizeService.query(undefined, ['id', 'experience_level'], 'candidateExperienceLevel').subscribe(res => {
      if (res.data && res.data.length) {
        res.data.forEach((item) => this.candidateTypes[item.id] = item.experience_level);
      }
    });

    // Get candidates and count by experience level
    this.ontimizeService.query(undefined, ['experience_level'], 'candidate').subscribe(
      res => {
        if (res.data && res.data.length) {
          this.candidatesAmounts.total = res.data.length;
          this.filteredCandidates = res.data.reduce((acc, item) => {
            const experience_level = item.experience_level;
            if (acc[experience_level]) {
              acc[experience_level]++;
            } else {
              acc[experience_level] = 1;
            }
            return acc;
          }, {} as { [key: number]: number });

        }
        this.candidatesData = [
          { name: this.translateService.get('junior'), value: this.filteredCandidates[1] },
          { name: this.translateService.get('medium'), value: this.filteredCandidates[2] },
          { name: this.translateService.get('senior'), value: this.filteredCandidates[3] },
        ];
      },
      err => console.error(err),
      () => this.cd.detectChanges()
    );
  }

  private setSelectionProcessesPerStatusAmounts() {
    this.ontimizeService.configureService(this.ontimizeService.getDefaultServiceConfiguration('selectionProcesses'));
    // Get selection processes statuses
    this.ontimizeService.query(undefined, ['id', 'status'], 'selectionProcessStatus').subscribe(res => {
      if (res.data && res.data.length) {
        res.data.forEach((item) => this.selectionProcessStatuses[item.id] = item.status);
      }
    });

    // Get selection processes and count by status
    this.ontimizeService.query(undefined, ['status'], 'selectionProcess').subscribe(
      res => {
        if (res.data && res.data.length) {
          this.selectionProcessesAmounts = {
            total: res.data.length,
            // Active: In progress or pending
            active: res.data.filter((item) => item.status === 1 || item.status === 2).length
          };

          this.filteredSelectionProcesses = res.data.reduce((acc, item) => {
            const status = item.status;
            if (acc[status]) {
              acc[status]++;
            } else {
              acc[status] = 1;
            }
            return acc;
          }, {} as { [key: number]: number });


          // Donut data (selection processes status amounts)
          // Doesn't work even if they are the same array
          // for (let id in this.selectionProcessStatuses) {
          //   this.donutData.push({ name: this.translateService.get(this.selectionProcessStatuses[id]), value: this.selectionProcessesAmounts[this.selectionProcessStatuses[id]] });
          // }
          this.donutData = [
            { name: this.translateService.get('pending'), value: this.filteredSelectionProcesses[1] },
            { name: this.translateService.get('completed'), value: this.filteredSelectionProcesses[3] },
            { name: this.translateService.get('in_progress'), value: this.filteredSelectionProcesses[2] },
            { name: this.translateService.get('cancelled'), value: this.filteredSelectionProcesses[4] }
          ];
          this.lineData = [{
            "name": "Selection processes per status",
            "series": this.donutData
          }]
        }
      },
      err => console.error(err),
      () => this.cd.detectChanges()
    );
  }

  private setSelectionProcessesPerPriorityAmounts() {
    this.ontimizeService.configureService(this.ontimizeService.getDefaultServiceConfiguration('selectionProcesses'));
    // Get selection processes per priority
    this.ontimizeService.query(undefined, ['id', 'priority'], 'selectionProcessPriority').subscribe(res => {
      if (res.data && res.data.length) {
        res.data.forEach((item) => this.selectionProcessPriorities[item.id] = item.priority);
      }
    });


    // Get selection processes and count by priority
    this.ontimizeService.query(undefined, ['priority'], 'selectionProcess').subscribe(
      res => {
        if (res.data && res.data.length) {
          this.selectionProcessesPerPriorityAmounts.total = res.data.length;
          this.filteredSelectionProcessesPriority = res.data.reduce((acc, item) => {
            const priority = item.priority;
            if (acc[priority]) {
              acc[priority]++;
            } else {
              acc[priority] = 1;
            }
            return acc;
          }, {} as { [key: number]: number });
        }

      },
      err => console.error(err),
      () => this.cd.detectChanges()
    );
  }

  private setInterviewsAmounts() {
    this.ontimizeService.configureService(this.ontimizeService.getDefaultServiceConfiguration('interviews'));
    // Get interview types
    this.ontimizeService.query(undefined, ['id', 'type'], 'interviewType').subscribe(res => {
      if (res.data && res.data.length) {
        res.data.forEach((item) => this.interviewTypes[item.id] = item.type);
      }
    });

    // Get interviews and count by type
    this.ontimizeService.query(undefined, ['type'], 'interview').subscribe(
      res => {
        if (res.data && res.data.length) {
          this.interviewsAmounts.total = res.data.length;
          this.filteredInterviews = res.data.reduce((acc, item) => {
            const type = item.type;
            if (acc[type]) {
              acc[type]++;
            } else {
              acc[type] = 1;
            }
            return acc;
          }, {} as { [key: number]: number });

        }
        this.interviewsData = [
          { name: this.translateService.get('hr'), value: this.filteredInterviews[1] },
          { name: this.translateService.get('management'), value: this.filteredInterviews[3] },
          { name: this.translateService.get('technical'), value: this.filteredInterviews[2] },
        ];
      },
      err => console.error(err),
      () => this.cd.detectChanges()
    );

    // Bar chart data (interviews scores)
    this.ontimizeService.configureService(this.ontimizeService.getDefaultServiceConfiguration('interviews'));
    this.ontimizeService.query(undefined, ['score'], 'interview').subscribe(
      res => {
        if (res.data && res.data.length) {
          // Scores: [0-10]
          let scores = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
          // Count of each score
          let scoreCount = scores.map((score) => res.data.filter((item) => Math.floor(item.score) === score).length);
          // Bar data
          this.barData = scores.map((score, index) => ({ name: score, value: scoreCount[index] }));
        }
      },
      err => console.error(err),
      () => this.cd.detectChanges()
    );
  }

  navigate() {
    this.router.navigate(['../', 'login'], { relativeTo: this.actRoute });
  }

}
