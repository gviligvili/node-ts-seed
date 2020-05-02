import {check} from "express-validator";

export function getExampleControllerValidator() {
    return [
        check("someProperty").optional(),
    ];
}
