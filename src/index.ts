import express from "express";
import bodyParser from "body-parser";
import { router } from "./controllers/decorators/controller";
import "./controllers/LoginController";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.listen(4000, () => {
    console.log("Listening on port 4000");
});
