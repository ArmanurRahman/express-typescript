import express from "express";
import bodyParser from "body-parser";
import { router } from "./controllers/decorators/controller";
import "./controllers/LoginController";
import { AppRouter } from "./AppRouter";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(AppRouter.gerInstance());

app.listen(4000, () => {
    console.log("Listening on port 4000");
});
