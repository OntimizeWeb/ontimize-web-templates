import { Component, Input } from '@angular/core';

@Component({
  selector: 'custom-card',
  templateUrl: './custom-card.component.html',
})

export class CustomCardComponent {
  @Input() titleKey!: string;
  @Input() titleIcon!: string;
  @Input() items: Array<{
    topIcon: string;
    topLabelKey: string;
    value: number | string;
    bottomLabelKey: string;
  }> = [];
}