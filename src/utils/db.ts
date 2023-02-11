import Dexie, { Table } from 'dexie';

export interface Event {
  id?: number;
  name: string;
  eventType: number;
  price: string;
  rebates?: string;
  contractAddress?: string;
  description: string;
  location: string;
  image: string;
  symbol?: string;
  holdTime: number;
  state: number;
  personLimit: number;
  receiver: string;
}

export class MySubClassedDexie extends Dexie {

  events!: Table<Event>;

  constructor() {
    super('tickenDatabase');
    this.version(1).stores({
      events: '++id, name, eventType, price, rebates, contractAddress, description, location, image, symbol, holdTime, state'
    });
  }

  findAllEvents() {
    return this.events.where('state').notEqual(1).toArray();
  }

  addEvent(props: Event) {
    return this.events.add(props);
  }

  updateEvent(id: number, props: Partial<Event>) {
    return this.events.update(id, props)
  }
}
let db: MySubClassedDexie;
export function getDB() {
  if (typeof window === 'undefined') return;
  if (!db) {
    db = new MySubClassedDexie();
  }

  return db;
}
