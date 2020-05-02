import {validationResult} from "express-validator";

const MAX_AVAILABLE = 50;

export async function getExampleController(req, res, next) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    res.status(200).json( {'SampleCTL' : 'SampleCTL'})
}
