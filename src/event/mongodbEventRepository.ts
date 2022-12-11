import { Event } from "./event";
import {Db} from "mongodb";
import {EventRepository} from "./eventRepository";


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