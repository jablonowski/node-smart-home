export const deviceUrls = {
  DEVICE_DETAILS: "/device/:id",
  DEVICE_COLLECTION: "/device",
};
export function deviceLink(id: string) {
  return deviceUrls.DEVICE_DETAILS.replace(":id", id);
}