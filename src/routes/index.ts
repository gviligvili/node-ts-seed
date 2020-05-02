import {RanksRoutes} from "./ranks.route";

export function assignRoutes(app) {
    app.use("/", RanksRoutes);
}
