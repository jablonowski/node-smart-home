import { EventRepository } from "./eventRepository";
import {EventType} from "./event";

export interface EventService {
    register(eventData:any): void;
}


export const eventServiceFactory = (eventRepository: EventRepository): EventService => ({
  async register(eventData: any) {
      const event = {
          type: eventData.type || EventType.REQUEST,
          message: "Request being processed",
          // data: eventData,
          timestamp: new Date().toString(),
      }
      await eventRepository.insert(event);
  }
});
