import {EventRepository} from "./eventRepository";
import {Event} from "./event";


export const eventRepositoryFactory = (): EventRepository => {
    const events: Event[] = [];

    return {
        async findAll() {
            return events;
        },
        async insert(event: Event) {
            events.push(event);
        }
    };
};