export interface DeviceRepository {
  findOne(id: any): Promise<any | null>;
  findAll(): Promise<any[]>;
}