import mapValues from "lodash.mapvalues";
import {EventService} from "./eventService";
import {EventRepository} from "./eventRepository";
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

interface EventControllerDeps {
  eventService: EventService;
  eventRepository: EventRepository;
}

export const eventControllerFactory = ({ eventService, eventRepository }: EventControllerDeps) =>
  withErrorHandling({
    async getList(req, res) {
      const events = await eventRepository.findAll();
      res.format({
        "application/json"() {
          res.json(events);
        },
        default() {
          res.json(events);
        },
      });
    },
    async register(eventData: any) {
      await eventService.register(eventData);
    },
  });
