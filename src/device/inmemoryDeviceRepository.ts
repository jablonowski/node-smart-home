import {DeviceRepository} from "./deviceRepository";

export const deviceRepositoryFactory = (initialDevicesState: any[] = []): DeviceRepository => {
    const devices: any[] = initialDevicesState;
    return {
        async findOne(id: number): Promise<any> {
            return devices[id];
        },
        async findAll(): Promise<any[]> {
            return devices;
        },
        async toggle(id: any, channel: any): Promise<any> {
            return true;
        }
    };
};