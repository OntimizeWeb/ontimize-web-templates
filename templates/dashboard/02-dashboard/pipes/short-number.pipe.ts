import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'shortNumber'
})
export class ShortNumberPipe implements PipeTransform {

  constructor(private decimal: DecimalPipe) { }

  transform(value: number | null | undefined, decimals: number = 1): string {
    if (value === null || value === undefined) return '';

    if (value < 1000) {
      return this.decimal.transform(value, '1.0-0') ?? String(value);
    }

    const units = ['k', 'M', 'B', 'T'];
    let unitIndex = -1;
    let num = value;

    while (num >= 1000 && unitIndex < units.length - 1) {
      num /= 1000;
      unitIndex++;
    }

    const formatted = this.decimal.transform(num, `1.0-${decimals}`);
    return `${formatted}${units[unitIndex]}`;
  }
}
