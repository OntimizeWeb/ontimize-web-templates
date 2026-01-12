import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OntimizeService } from 'ontimize-web-ngx';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {
  protected candidatesAmounts = { total: 0 };
  protected interviewsAmounts = { total: 0 };

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private ontimizeService: OntimizeService,
    private cd: ChangeDetectorRef,
  ) {

    // Candidates amounts (total)
    this.setCandidatesAmounts();

    // Interviews amounts (total)
    this.setInterviewsAmounts();
  }

  private setCandidatesAmounts() {
    this.ontimizeService.configureService(this.ontimizeService.getDefaultServiceConfiguration('candidates'));

    // Get candidates and count
    this.ontimizeService.query(undefined, ['id'], 'candidate').subscribe(
      res => {
        if (res.data && res.data.length) {
          this.candidatesAmounts.total = res.data.length;
        }
      },
      err => console.error(err),
      () => this.cd.detectChanges()
    );
  }


  private setInterviewsAmounts() {
    this.ontimizeService.configureService(this.ontimizeService.getDefaultServiceConfiguration('interviews'));

    // Get interviews and count
    this.ontimizeService.query(undefined, ['id'], 'interview').subscribe(
      res => {
        if (res.data && res.data.length) {
          this.interviewsAmounts.total = res.data.length;
        }
      },
      err => console.error(err),
      () => this.cd.detectChanges()
    );

  }

  navigate() {
    this.router.navigate(['../', 'candidates'], { relativeTo: this.actRoute });
  }

}
