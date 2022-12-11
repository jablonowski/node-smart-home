import {DeviceRepository} from "./deviceRepository";
import {EventEmitter} from "events";
import {deviceLink} from "./deviceUrls";


export interface DeviceService {
    findOne(id: any): any;

    findAll(): any;

    toggle(id: any, channel: any): any;
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

    async toggle(id, channel) {
        const state = await deviceRepository.toggle(id, channel);
        eventEmmiter.emit('toggle-device', {id, channel});
        return state;
    }
});
