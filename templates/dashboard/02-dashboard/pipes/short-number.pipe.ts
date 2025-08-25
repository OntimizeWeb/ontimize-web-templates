import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { OTranslateService } from 'ontimize-web-ngx';

@Pipe({
  name: 'shortNumber',
  pure: false
})
export class ShortNumberPipe implements PipeTransform {

  constructor(private decimal: DecimalPipe, private translate: OTranslateService) { }

  transform(value: number | null | undefined, decimals: number): string {

    if (value === null || value === undefined) return '';

    let lang = this.translate.getCurrentLang();
    lang = lang === 'es' ? 'es-ES' : 'en-US';

    const unitMap: Record<string, string[]> = {
      'es-ES': [' mil', ' M', ' mil M', ' B'],
      'en-US': [' k', ' M', ' B', ' T']
    };

    if (value < 1000) {
      return this.decimal.transform(value, '1.0-0', lang) ?? String(value);
    }

    let units = unitMap[lang];
    let unitIndex = 0;
    let num = value;

    while (num >= 1000 && unitIndex < units.length - 1) {
      num /= 1000;
      unitIndex++;
    }

    const formatted = this.decimal.transform(num, `1.0-${decimals}`, lang);
    return `${formatted}${units[unitIndex]}`;
  }
}
