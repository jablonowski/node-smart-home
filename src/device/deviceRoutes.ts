import { deviceUrls } from "./deviceUrls";
import { deviceRepositoryFactory } from "./deviceRepository";
import { deviceServiceFactory } from "./deviceService";
import { Router } from "express";
import { deviceControllerFactory } from "./deviceController";

export const deviceRoutesFactory = () => {
  const { DEVICE_DETAILS, DEVICE_COLLECTION } = deviceUrls;
  const router = Router();
  const deviceRepository = deviceRepositoryFactory();
  const deviceService = deviceServiceFactory(deviceRepository);
  const { details, getList } = deviceControllerFactory({
    deviceService,
    deviceRepository,
  });

  router.get(DEVICE_COLLECTION, getList);
  router.get(DEVICE_DETAILS, details);

  return router;
};
