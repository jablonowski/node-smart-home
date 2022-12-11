import { DeviceRepository} from "./deviceRepository";
import {EventEmitter} from "events";
import {EventRepository} from "../event/eventRepository";
import {EventType} from "../event/event";
import {deviceLink} from "./deviceUrls";


export interface DeviceService {
    findOne(id:string): any;
    findAll(): any;
}

export const deviceServiceFactory = (deviceRepository: DeviceRepository, eventEmmiter: EventEmitter): DeviceService => ({
  async findOne(id: string) {
      const device = await deviceRepository.findOne(id);
      eventEmmiter.emit('device-found', device);
      return device;
  },

    async findAll() {
        const devices = await deviceRepository.findAll();
        eventEmmiter.emit('devices-found', devices);
        devices.map((device: { deviceid: string; }) => ({
            ...device,
            url: deviceLink(device.deviceid),
        }))
        return devices;
    },
});
