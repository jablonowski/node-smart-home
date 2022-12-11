import { Event } from "./event";

export interface EventRepository {
  findAll(): Promise<Event[] | null>;
  insert(event: Event): void;
}