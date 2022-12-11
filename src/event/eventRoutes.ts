import { eventUrls} from "./eventUrls";
import { eventRepositoryFactory } from "./eventRepository";
import { eventServiceFactory } from "./eventService";
import { Router } from "express";
import { eventControllerFactory } from "./eventController";
import {Db} from "mongodb";
import {EventEmitter} from "events";

export const eventRoutesFactory = (db: Db, eventEmitter: EventEmitter) => {
  const { EVENT_COLLECTION } = eventUrls;
  const router = Router();
  const eventRepository = eventRepositoryFactory(db);
  const eventService = eventServiceFactory(eventRepository);
  const { getList } = eventControllerFactory({
    eventService,
    eventRepository,
  });

  router.get(EVENT_COLLECTION, getList);
  eventEmitter.on('register-request', eventService.registerRequest);
  eventEmitter.on('device-found', eventService.registerDeviceFound);
  eventEmitter.on('devices-found', eventService.registerDevicesFound);


  return router;
};
