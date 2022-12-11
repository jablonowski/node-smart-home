import {deviceServiceFactory} from "../../src/device/deviceService";
import {deviceRepositoryFactory} from "../../src/device/inmemoryDeviceRepository";
import assert from "assert";
import {Device} from "ewelink-api";
import {EventEmitter} from "events";

describe("Device service", function () {
    it("can find device", async function () {
        //given
        const devices = [
            {deviceid: "abcd123"} as Device,
            {deviceid: "xyz123"} as Device
        ];
        const deviceRepository = deviceRepositoryFactory(devices);
        const deviceService = deviceServiceFactory(deviceRepository, new EventEmitter());

        //when
        const device = await deviceService.findOne(0);

        //then
        assert.strictEqual(device.deviceid, "abcd123")
    });
});