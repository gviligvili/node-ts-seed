import express from "express";
import cors from "cors";
import { default as morgan } from "morgan";
import Settings from "./config/settings";
import {assignRoutes} from "./routes";

const app = express();
app.use(morgan("default"));

/**
 * Cors handling.
 */
if (!Settings.isProduction()){
    app.use(cors());
} else {
    const whitelist = ["http://www.FillHereYouDomain.com", "https://www.Awesomedomain.com"];
    const corsOptions = {
        origin: function (origin, callback) {
            if (whitelist.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        }
    };
    app.use(cors(corsOptions));
}

app.set("port", Settings.get().port);

assignRoutes(app);

export default app;
