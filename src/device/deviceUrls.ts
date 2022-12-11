export const deviceUrls = {
    DEVICE_DETAILS: "/device/:id",
    DEVICE_COLLECTION: "/device",
    TOGGLE_DEVICE: "/toggle/:id/:channel",
};

export function deviceLink(id: string) {
    return deviceUrls.DEVICE_DETAILS.replace(":id", id);
}