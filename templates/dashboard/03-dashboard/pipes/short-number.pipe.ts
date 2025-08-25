import { Pipe, PipeTransform } from '@angular/core';
import { NumberService } from 'ontimize-web-ngx';

@Pipe({
  name: 'shortNumber',
  pure: false
})
export class ShortNumberPipe implements PipeTransform {

  constructor(private numberService: NumberService) { }

  transform(value: number | null | undefined, decimals: number = 0): string {
    if (value === null || value === undefined) return '';

    const unitMap: Record<string, string[]> = {
      'es': [' mil', ' M', ' mil M', ' B'],
      'en': [' k', ' M', ' B', ' T']
    };

    const locale = this.numberService['locale'] || 'en';
    const units = unitMap[locale] || unitMap['en'];

    if (value < 1000) {
      return this.numberService.getIntegerValue(value, { locale });
    }

    let num = value;
    let unitIndex = 0;

    while (num >= 1000 && unitIndex < units.length - 1) {
      num /= 1000;
      unitIndex++;
    }

    const formatted = this.numberService.getRealValue(num, {
      locale,
      minDecimalDigits: decimals,
      maxDecimalDigits: decimals
    });

    return `${formatted}${units[unitIndex]}`;
  }
}
