import nconf from "nconf";
import path from "path";

const localconfig = path.join(__dirname, "localconfig.json");
const secrets = path.join(__dirname, "secrets.json");
const secretsDev = path.join(__dirname, "secrets.dev.json");

const config = nconf.env().argv()
    .file("secrets", secrets)
    .file("defaults", localconfig);

export interface SettingsInterface {
    NODE_ENV: string;
    port: string;
    db: {
        host: string,
        user: string,
        password: string,
        database: string,
    }
}

const holder: SettingsInterface = {
    NODE_ENV: config.get("NODE_ENV"),
    port: config.get("PORT"),
    db: {
        host: config.get("DB:HOST"),
        user: config.get("DB:USER"),
        password: config.get("DB:PASSWORD"),
        database: config.get("DB:DATABASE"),
    }
};

class Settings {
    static get(): SettingsInterface {
        return {
            ...holder
        };
    }

    static isProduction() {
        return holder.NODE_ENV === "production";
    }

    static isDevelopment() {
        return holder.NODE_ENV === "development";
    }
}

export function validateSettings(config: SettingsInterface) {
    if (!config.port) {
        throw new Error("port is missing");
    }
}

validateSettings(holder);
export default Settings;
