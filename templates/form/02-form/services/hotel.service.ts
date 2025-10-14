import { Injectable, Injector } from '@angular/core';
import { OntimizeEEService, OntimizeServiceResponse } from 'ontimize-web-ngx';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HotelService extends OntimizeEEService {


  private hotels = [
    {
      id: 1,
      name: 'Hotel Bosque Encantado',
      location: 'Montañas Verdes, Galicia',
      commonAreas: [
        'Restaurante',
        'Piscina climatizada',
        'Sala de juegos',
        'Spa',
        'Gimnasio'
      ]
    },
    {
      id: 2,
      name: 'Hotel Costa Azul',
      location: 'Playa Serena, Andalucía',
      commonAreas: [
        'Restaurante mediterráneo',
        'Piscina infinita',
        'Bar de playa',
        'Zona infantil',
        'Campo de voleibol'
      ]
    },
    {
      id: 3,
      name: 'Hotel Valle Dorado',
      location: 'Sierra Nevada, Granada',
      commonAreas: [
        'Restaurante gourmet',
        'Piscina exterior',
        'Sala de juegos',
        'Campo de golf',
        'Teatro al aire libre'
      ]
    }
  ];

  private cabins = [
    {
      id: 1,
      type: 'cabin',
      name: 'Cabaña 1',
      capacity: 4,
      status: 'busy',
      uptake: 'low',
      image: 'assets/images/form-detail-image-1.jpg',
      hotelId: 1
    },
    {
      id: 2,
      type: 'cabin',
      name: 'Cabaña 2',
      capacity: 6,
      status: 'available',
      uptake: 'high',
      image: 'assets/images/form-detail-image-2.jpg',
      hotelId: 1
    },
    {
      id: 3,
      type: 'cabin',
      name: 'Cabaña 3',
      capacity: 2,
      status: 'maintenance',
      uptake: 'low',
      image: 'assets/images/form-detail-image-1.jpg',
      hotelId: 1
    },
    {
      id: 4,
      type: 'cabin',
      name: 'Cabaña 4',
      capacity: 8,
      status: 'busy',
      uptake: 'high',
      image: 'assets/images/form-detail-image-2.jpg',
      hotelId: 2
    },
    {
      id: 5,
      type: 'cabin',
      name: 'Cabaña 5',
      capacity: 5,
      status: 'available',
      uptake: 'low',
      image: 'assets/images/form-detail-image-1.jpg',
      hotelId: 2
    },
    {
      id: 6,
      type: 'cabin',
      name: 'Cabaña 6',
      capacity: 3,
      status: 'busy',
      uptake: 'low',
      image: 'assets/images/form-detail-image-2.jpg',
      hotelId: 2
    },
    {
      id: 7,
      type: 'cabin',
      name: 'Cabaña 7',
      capacity: 10,
      status: 'reserved',
      uptake: 'high',
      image: 'assets/images/form-detail-image-1.jpg',
      hotelId: 3
    },
    {
      id: 8,
      type: 'cabin',
      name: 'Cabaña 8',
      capacity: 6,
      status: 'available',
      uptake: 'low',
      image: 'assets/images/form-detail-image-2.jpg',
      hotelId: 3
    },
    {
      id: 9,
      type: 'cabin',
      name: 'Cabaña 9',
      capacity: 4,
      status: 'busy',
      uptake: 'high',
      image: 'assets/images/form-detail-image-1.jpg',
      hotelId: 3
    }
  ];

  private commons = [
    { id: 101, type: 'common', name: 'Restaurante', capacity: 60, schedule: '12:30–16:00 · 20:00–23:30', image: 'assets/images/common-restaurant.jpg', hotelId: 1 },
    { id: 102, type: 'common', name: 'Piscina', capacity: 25, schedule: '09:00–21:00', image: 'assets/images/common-pool.jpg', hotelId: 1 },
    { id: 103, type: 'common', name: 'Sala de juegos', capacity: 18, schedule: '10:00–22:00', image: 'assets/images/common-games.jpg', hotelId: 1 },
    { id: 104, type: 'common', name: 'Spa', capacity: 12, schedule: '10:00–20:00 (cita previa)', image: 'assets/images/common-spa.jpg', hotelId: 1 },
    { id: 105, type: 'common', name: 'Gimnasio', capacity: 15, schedule: '07:00–23:00', image: 'assets/images/common-gym.jpg', hotelId: 1 },
    { id: 201, type: 'common', name: 'Restaurante mediterráneo', capacity: 70, schedule: '13:00–16:00 · 20:30–23:30', image: 'assets/images/common-restaurant.jpg', hotelId: 2 },
    { id: 202, type: 'common', name: 'Piscina', capacity: 30, schedule: '09:00–21:00', image: 'assets/images/common-pool.jpg', hotelId: 2 },
    { id: 203, type: 'common', name: 'Bar de playa', capacity: 40, schedule: '12:00–00:00', image: 'assets/images/common-beachbar.jpg', hotelId: 2 },
    { id: 204, type: 'common', name: 'Zona infantil', capacity: 20, schedule: '10:00–20:00', image: 'assets/images/common-games.jpg', hotelId: 2 },
    { id: 205, type: 'common', name: 'Gimnasio', capacity: 12, schedule: '10:00–20:00', image: 'assets/images/common-gym.jpg', hotelId: 2 },
    { id: 301, type: 'common', name: 'Restaurante gourmet', capacity: 50, schedule: '13:30–16:00 · 20:00–23:00', image: 'assets/images/common-restaurant.jpg', hotelId: 3 },
    { id: 302, type: 'common', name: 'Piscina exterior', capacity: 35, schedule: '10:00–20:00', image: 'assets/images/common-pool.jpg', hotelId: 3 },
    { id: 303, type: 'common', name: 'Sala de juegos', capacity: 16, schedule: '10:00–22:00', image: 'assets/images/common-games.jpg', hotelId: 3 },
    { id: 304, type: 'common', name: 'Campo de golf', capacity: 72, schedule: '08:00–20:00', image: 'assets/images/common-golf.jpg', hotelId: 3 }
  ];

  constructor(protected injector: Injector) {
    super(injector);
  }

  public override query(kv: any = {}, av: string[] = [], entity?: string): Observable<any> {
    let data: any[] = [];

    switch (entity) {
      case 'spaces': {
        const spaces = [
          ...this.cabins.map(c => ({ ...c, type: 'cabin' })),
          ...this.commons.map(c => ({ ...c, type: 'common' }))
        ];

        data = spaces;

        if (kv?.hotelId != null) {
          data = data.filter(x => String(x.hotelId) === String(kv.hotelId));
        }
        if (kv?.type != null && kv.type !== 'all' && String(kv.type).trim() !== '') {
          data = data.filter(x => x.type === kv.type);
        }
        if (kv?.id != null) {
          data = data.filter(x => String(x.id) === String(kv.id));
        }
        break;
      }
      case 'hotel': {
        if (kv && kv.id != null) {
          const h = this.hotels.find(x => x.id === Number(kv.id));
          data = h ? [h] : [];
        } else {
          data = this.hotels;
        }
        break;
      }
      case 'cabin': {
        if (kv && kv.hotelId != null) {
          data = this.cabins.filter(c => c.hotelId === Number(kv.hotelId));
        } else if (kv && kv.id != null) {
          const c = this.cabins.find(x => x.id === Number(kv.id));
          data = c ? [c] : [];
        } else {
          data = this.cabins;
        }
        break;
      }
      case 'common': {
        if (kv && kv.hotelId != null) {
          data = this.commons.filter(c => c.hotelId === Number(kv.hotelId));
        } else if (kv && kv.id != null) {
          const c = this.commons.find(x => x.id === Number(kv.id));
          data = c ? [c] : [];
        } else {
          data = this.commons;
        }
        break;
      }
      default:
        data = [];
    }

    const resp = new OntimizeServiceResponse(0, data, '');
    return of(resp);
  }

  public override configureService() {
  }
}