import {EventRepository} from "./eventRepository";
import {Event, EventType} from "./event";
import {Request} from "express";
import {Device} from "ewelink-api";

export interface EventService {
    registerRequest(req: Request): void;
    registerDeviceFound(device: Device): void;
    registerDevicesFound(devices: Device[]): void;
}

function prepareEventObject(message: string, type: EventType): Event {
    return {
        type: type,
        message: message,
        timestamp: new Date().toISOString(),
    }
}

export const eventServiceFactory = (eventRepository: EventRepository): EventService => ({

    async registerRequest(req: Request) {
        const message = 'Request ' + req.path + ' with params ' + JSON.stringify(req.params) + ' being registered.';
        await eventRepository.insert(prepareEventObject(message, EventType.REQUEST));
    },
    async registerDeviceFound(device: Device) {
        const message = 'Device ' + device.deviceid + ' being processed.';
        await eventRepository.insert(prepareEventObject(message, EventType.PROCESS));
    },
    async registerDevicesFound(devices: Device[]) {
        const ids = devices.map(function(device) {
            return device.deviceid;
        });
        const message = 'List of devices ' + JSON.stringify(ids) + ' being processed.';
        await eventRepository.insert(prepareEventObject(message, EventType.PROCESS));
    },
});
