import { NextFunction, Request, Response } from "express";
import { bodyValidator, controller, get, post, use } from "./decorators";

function logger(req: Request, res: Response, next: NextFunction) {
    console.log("Request has made");
    next();
}
@controller("/auth")
class LoginController {
    @get("/login")
    @use(logger)
    getLogin(req: Request, res: Response): void {
        res.send(`
        <form method="POST">
            <div>
                <label>Email</label>
                <input name="email" />
            </div>
            <div>
                <label>Password</label>
                <input name="password" />
            </div>
            <button>Submit</button>
        </form>
        `);
    }

    @post("/login")
    @bodyValidator("email", "password")
    postLogin(req: Request, res: Response) {
        const { email, password } = req.body;

        if (email === "mubeen@test.com" && password === "12345") {
            res.send("logged in");
        } else {
            res.send("invalid credential");
        }
    }
}
