import {deviceUrls} from "./deviceUrls";
import {deviceRepositoryFactory} from "./ewelinkDeviceRepository";
import {deviceServiceFactory} from "./deviceService";
import {Router} from "express";
import {deviceControllerFactory} from "./deviceController";
import {EventEmitter} from "events";

export const deviceRoutesFactory = (eventEmmiter: EventEmitter) => {
    const {DEVICE_DETAILS, DEVICE_COLLECTION, TOGGLE_DEVICE} = deviceUrls;
    const router = Router();
    const deviceRepository = deviceRepositoryFactory();
    const deviceService = deviceServiceFactory(deviceRepository, eventEmmiter);
    const {details, getList, toggle} = deviceControllerFactory({
        deviceService,
        deviceRepository,
    });

    router.get(DEVICE_COLLECTION, getList);
    router.get(DEVICE_DETAILS, details);
    router.get(TOGGLE_DEVICE, toggle);

    return router;
};
