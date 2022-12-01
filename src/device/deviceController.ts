import mapValues from "lodash.mapvalues";
import {DeviceService} from "./deviceService";
import {DeviceRepository} from "./deviceRepository";
import { deviceLink } from "./deviceUrls";
import {Request, Response, NextFunction} from "express";

// const mapValues = (api, f) => Object.fromEntries(Object.entries(api).map(([key, value]) => [key, f(value)]));

// function withErrorHandling(api: Record<string, AsyncHandler>) {
//   return mapValues(api, wrapWithTryCatch);
// }
function withErrorHandling<T extends Record<string, AsyncHandler>>(api: T) {
  return mapValues(api, wrapWithTryCatch);
}


type AsyncHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void>;

function wrapWithTryCatch(fn: AsyncHandler): AsyncHandler {
  return async function (req, res, next) {
    try {
      await fn(req, res, next);
    } catch (e) {
      next(e);
    }
  };
}

interface DeviceControllerDeps {
  deviceService: DeviceService;
  deviceRepository: DeviceRepository;
}

export const deviceControllerFactory = ({ deviceService, deviceRepository }: DeviceControllerDeps) =>
  withErrorHandling({
    async details(req, res, next) {
      const id = req.params.id;
      const device = await deviceRepository.findOne(id);
      res.format({
        "text/html"() {
          res.render("device", {
            device: {
              ...device, 
              json: JSON.stringify(device)
            }, 
            layout: "layout", 
          });
        },
        "application/json"() {
          res.json(device);
        },
        default() {
          res.json(device);
        },
      });
    },
    async getList(req, res) {
      const devices = await deviceRepository.findAll();
      res.format({
        "text/html"() {
          res.render("devices", {
            devices: devices.map((device) => ({
              ...device, 
              url: deviceLink(device.deviceid),
              json: JSON.stringify(device),
            })),
            layout: "layout",
          });
        },
        "application/json"() {
          res.json(devices);
        },
        default() {
          res.json(devices);
        },
      });
    },
  });
