import winston from "winston";
import moment from "moment";
import Settings from "../config/settings";
import _ from "lodash";

const {combine, printf} = winston.format;
const colorizer = winston.format.colorize();


const myFormat = printf(({level, message, ...meta}) => {
    const metaString = !_.isEmpty(meta) ? ` -- Meta: ${JSON.stringify(meta)}` : "";
    const msg = `${moment().toISOString()}--${level.toUpperCase()}-- ${message}${metaString}`;
    return colorizer.colorize(level, msg);
});
const transports = [
    new winston.transports.Console({
        level: process.env.NODE_ENV === "production" ? "error" : "debug",
        format: combine(
            myFormat
        ),
    })
];

const options: winston.LoggerOptions = {
    transports
};

const logger = winston.createLogger(options);

if (!Settings.isProduction()) {
    logger.debug("Logging initialized at debug level");
}

export default logger;
