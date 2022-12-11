import { Event } from "./event";
import {Db} from "mongodb";

export const eventRepositoryFactory = (db: Db): EventRepository => {
  const events = db.collection("events");

  return {
    async findAll() {
      return events.find({}, {projection: {_id:false}}).toArray();
    },
    async insert(event: Event) {
      await events.insertOne(event);
    }
  };
};

export interface EventRepository {
  findAll(): Promise<Event[] | null>;
  insert(event: Event): void;
}