import express from "express";

import { deviceRoutesFactory } from "./device/deviceRoutes";

import { errorHandler, notFound } from "./error";

export const appFactory = () => {
  const app = express();

  const deviceRoutes = deviceRoutesFactory();

  const path = require("path");

  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "hbs");

  app.use(express.json());
  app.get("/", function (req, res, next) {
    res.send("node smart home");
  });
  app.use("/", deviceRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
