import express from "express";
import {getExampleControllerValidator} from "../controllers/validators";
import {getExampleController} from "../controllers/example.controller";

const router = express.Router();

router.get("/", getExampleControllerValidator(), getExampleController);

export const RanksRoutes = router;
