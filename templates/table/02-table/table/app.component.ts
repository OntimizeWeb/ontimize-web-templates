import { Component, Injector, OnInit } from '@angular/core';
import { OntimizeMatIconRegistry } from 'ontimize-web-ngx';

@Component({
  selector: 'o-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ontimizeMatIconRegistry: OntimizeMatIconRegistry;

  constructor(
    protected injector: Injector
  ) {
    this.ontimizeMatIconRegistry = this.injector.get(OntimizeMatIconRegistry);
  }

  ngOnInit() {
    if (this.ontimizeMatIconRegistry.addOntimizeSvgIcon) {
      this.ontimizeMatIconRegistry.addOntimizeSvgIcon('VIP', 'assets/icons/vip.svg');
      this.ontimizeMatIconRegistry.addOntimizeSvgIcon('normal', 'assets/icons/normal.svg');
      this.ontimizeMatIconRegistry.addOntimizeSvgIcon('all', 'assets/icons/all.svg');
      this.ontimizeMatIconRegistry.addOntimizeSvgIcon('other', 'assets/icons/other.svg');
    }
  }

}
