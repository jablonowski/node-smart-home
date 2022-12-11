import {appFactory} from "./app";
import {connection} from "./connection";

(async () => {
    const app = appFactory(await connection);

    app.listen(process.env.PORT, function () {
        console.log("Example app listening on port " + process.env.PORT);
    });
})();
