import {EventRepository} from "./eventRepository";
import {EventType} from "./event";
import {Request} from "express";
import {Device} from "ewelink-api";

export interface EventService {
    register(eventType: EventType, message: string): void;
    registerRequest(req: Request): void;
    registerDeviceFound(device: Device): void;
    registerDevicesFound(devices: Device[]): void;
}


export const eventServiceFactory = (eventRepository: EventRepository): EventService => ({
  async register(eventType: EventType, message: string) {
      const event = {
          type: eventType,
          message: message,
          timestamp: new Date().toString(),
      }
      await eventRepository.insert(event);
  },
    async registerRequest(req: Request) {
        const message = 'Request ' + req.path + 'with params ' + JSON.stringify(req.params) + ' being registered.'
        await this.register(EventType.REQUEST, message);
    },
    async registerDeviceFound(device: Device) {
        const message = 'Device ' + device.deviceid + ' being processed.'
        await this.register(EventType.PROCESS, message);
    },
    async registerDevicesFound(devices: Device[]) {
        const ids = devices.map(function(device) {
            return device.deviceid;
        });
        const message = 'List of devices ' + JSON.stringify(ids) + ' being processed.'
        await this.register(EventType.PROCESS, message);
    },
});
