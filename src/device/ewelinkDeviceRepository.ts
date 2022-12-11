import {Device, DeviceState} from 'ewelink-api'; //todo: DeviceDTO -> Device / ACL
import ewelink from 'ewelink-api';
import config from './../config';
import {DeviceRepository} from "./deviceRepository";


export const deviceRepositoryFactory = (): DeviceRepository => {
    return {
        async findOne(id): Promise<Device> {
            const connection = new ewelink(config.ewelink);
            const device = await connection.getDevice(id);
            return device;
        },
        async findAll(): Promise<Device[]> {
            const connection = new ewelink(config.ewelink);
            const devices = await connection.getDevices();
            return devices;
        },
        async toggle(id, channel): Promise<DeviceState> {
            const connection = new ewelink(config.ewelink);
            return await connection.toggleDevice(id, channel);
        }
    };
};