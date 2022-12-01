import { appFactory } from "./app";

(async () => {
  const app = appFactory();

  app.listen(process.env.PORT, function () {
    console.log("Example app listening on port " + process.env.PORT);
  });
})();
