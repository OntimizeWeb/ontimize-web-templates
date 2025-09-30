import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormDetailComponent {

  getStaticData() {
    return [
      { "id": 1, "name": "Cabaña 1", "capacity": "4", "status": "busy", "uptake": "low", "image": "assets/images/form-detail-image-1.jpg" },
      { "id": 2, "name": "Cabaña 2", "capacity": "6", "status": "available", "uptake": "high", "image": "assets/images/form-detail-image-2.jpg" },
      { "id": 3, "name": "Cabaña 3", "capacity": "2", "status": "maintenance", "uptake": "low", "image": "assets/images/form-detail-image-1.jpg" },
      { "id": 4, "name": "Cabaña 4", "capacity": "8", "status": "busy", "uptake": "high", "image": "assets/images/form-detail-image-2.jpg" },
      { "id": 5, "name": "Cabaña 5", "capacity": "5", "status": "available", "uptake": "low", "image": "assets/images/form-detail-image-1.jpg" },
      { "id": 6, "name": "Cabaña 6", "capacity": "3", "status": "busy", "uptake": "low", "image": "assets/images/form-detail-image-2.jpg" },
      { "id": 7, "name": "Cabaña 7", "capacity": "10", "status": "reserved", "uptake": "high", "image": "assets/images/form-detail-image-1.jpg" }
    ];
  }

}
