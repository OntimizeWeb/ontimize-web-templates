import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'splitSchedule', pure: true })
export class SplitSchedulePipe implements PipeTransform {
  transform(value: string | null | undefined): string[] {
    if (!value) return [];
    const SEP = /(?:·|,|;|\||\/)/g;
    return value.split(SEP).map(s => s.trim());
  }
}