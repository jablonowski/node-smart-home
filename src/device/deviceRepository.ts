import { Device } from 'ewelink-api';
import ewelink from 'ewelink-api';
import config from './../config';

export const deviceRepositoryFactory = (): DeviceRepository => {
  return {
    async findOne(id) {  
      const connection = new ewelink(config.ewelink);
      const device = await connection.getDevice(id);
      return device;
    },
    async findAll() {
      const connection = new ewelink(config.ewelink);
      const devices = await connection.getDevices();
      return devices;
    },
  };
};

export interface DeviceRepository {
  findOne(id: any): Promise<Device | null>;
  findAll(): Promise<Device[]>;
}