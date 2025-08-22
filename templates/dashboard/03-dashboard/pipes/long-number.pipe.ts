import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { OTranslateService } from 'ontimize-web-ngx';

@Pipe({
  name: 'longNumber',
  pure: false
})
export class LongNumberPipe implements PipeTransform {

  constructor(private decimal: DecimalPipe, private translate: OTranslateService) { }

  transform(value: number | null | undefined): string {
    if (value === null || value === undefined) return '';

    let lang = this.translate.getCurrentLang();
    lang = lang === 'es' ? 'es-ES' : 'en-US';

    const unitMap: Record<string, string[]> = {
      'es-ES': [' M', ' mil M', ' B'],
      'en-US': [' M', ' B', ' T']
    };

    if (value < 1_000_000) {
      return this.decimal.transform(value, '1.0-0', lang) ?? String(value);
    }

    let units = unitMap[lang];
    let unitIndex = 0;
    let num = value / 1_000_000;

    while (num >= 1000 && unitIndex < units.length - 1) {
      num /= 1000;
      unitIndex++;
    }

    const formatted = this.decimal.transform(num, `1.0-1`, lang);
    return `${formatted}${units[unitIndex]}`;
  }
}
