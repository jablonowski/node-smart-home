import {DeviceRepository} from "./deviceRepository";


export const deviceRepositoryFactory = (): DeviceRepository => {
    const devices: any[] = [];
    return {
        async findOne(id: number): Promise<any> {
            return devices[id];
        },
        async findAll(): Promise<any[]> {
            return devices;
        },
    };
};