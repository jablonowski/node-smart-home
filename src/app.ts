import express from "express";
import { deviceRoutesFactory } from "./device/deviceRoutes";
import { eventRoutesFactory } from "./event/eventRoutes";
import { EventEmitter } from 'events';
import { errorHandler, notFound } from "./error";
import { Db } from "mongodb";

export const appFactory = (db: Db) => {
  const app = express();

  const eventEmitter = new EventEmitter();
  const deviceRoutes = deviceRoutesFactory(eventEmitter);
  const eventRoutes = eventRoutesFactory(db, eventEmitter);

  const path = require("path");

  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "hbs");

  app.use(express.json());
  app.use(function(req, res, next) {
    eventEmitter.emit('register', req);
    next();
  });

  app.get("/", function (req, res, next) {
    res.send("node smart home");
  });

  app.use("/", deviceRoutes);
  app.use("/", eventRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
