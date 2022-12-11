import {eventServiceFactory} from "../../src/event/eventService";
import {eventRepositoryFactory} from "../../src/event/inmemoryEventRepository";
import assert from "assert";
import {Device} from "ewelink-api";

describe("Event service", function () {
    it("can add an event", async function () {
        //given
        const eventRepository = eventRepositoryFactory();
        const eventSerice = eventServiceFactory(eventRepository);

        //when
        await eventSerice.registerDeviceFound({deviceid: "abcd123"} as Device);

        //then
        const events = await eventRepository.findAll();
        assert.ok(JSON.stringify(events).includes("abcd123"));
    });
});