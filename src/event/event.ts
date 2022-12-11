export type Event = {
    type: EventType,
    message: string,
    timestamp: string,
    // data: Object,
}

export enum EventType {
    REQUEST = 'request',
    PROCESS = 'process',
}