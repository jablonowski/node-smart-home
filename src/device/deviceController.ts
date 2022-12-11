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
      const device = await deviceService.findOne(id);
      res.format({
        "text/html"() {
          res.render("device", {
            device: device,
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
    async toggle(req, res, next) {
      const id = req.params.id;
      const channel = req.params.channel;
      const state = await deviceService.toggle(id, channel);
      res.format({
        "application/json"() {
          res.json(state);
        },
        default() {
          res.json(state);
        },
      });
    },
    async getList(req, res) {
      const devices = await deviceService.findAll();
      res.format({
        "text/html"() {
          res.render("devices", {
            devices: devices,
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
