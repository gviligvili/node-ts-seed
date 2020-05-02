import errorHandler from "errorhandler";
import app from "./app";
import Settings from "./config/settings";
import logger from "./util/logger";

/**
 * Error Handler is not for production.
 */
if (!Settings.isProduction()) {
    app.use(errorHandler());
} else {
}

/**
 * Start Express server.
 */
export async function startServer() {
    const server = app.listen(app.get("port"), () => {
        logger.info(`App is running at http://localhost:${app.get("port")} in ${app.get("env")} mode`);
    });

    return server;
};
