import { Injectable } from '@angular/core';

@Injectable()

export class SpacesFilterService {
  private type: string;

  getType() {
    return this.type;
  }

  setType(type: string) {
    this.type = type;
  }

}