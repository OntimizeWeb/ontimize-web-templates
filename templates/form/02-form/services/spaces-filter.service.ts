import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SpacesFilterService {
  buildKv(hotelId: number | string, type: string) {
    const kv: any = { hotelId };
    if (type && type !== 'all') {
      kv.type = type;
    }
    return kv;
  }
}