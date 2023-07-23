import "reflect-metadata";
import { AppRouter } from "../../AppRouter";
import { Methods } from "./Methods";
import { MetadataKeys } from "./MetadataKeys";
import { RequestHandler, Request, Response, NextFunction } from "express";

export const router = AppRouter.gerInstance();

function bodyValidators(keys: string[]): RequestHandler {
    return function (req: Request, res: Response, next: NextFunction) {
        if (!req.body) {
            console.log("in");
            res.status(422).send("invalid request");
            return;
        }

        for (let key in req.body) {
            console.log(key);
            if (!keys.includes(key)) {
                res.status(422).send("invalid request");
                return;
            }
        }
        next();
    };
}

export function controller(routePrefix: string) {
    return function (target: Function) {
        for (let key in target.prototype) {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata(
                MetadataKeys.path,
                target.prototype,
                key
            );
            const method: Methods = Reflect.getMetadata(
                MetadataKeys.method,
                target.prototype,
                key
            );

            const middlewares =
                Reflect.getMetadata(
                    MetadataKeys.middleware,
                    target.prototype,
                    key
                ) || [];

            const requireBodyProps =
                Reflect.getMetadata(
                    MetadataKeys.validator,
                    target.prototype,
                    key
                ) || [];

            const validator = bodyValidators(requireBodyProps);
            if (path) {
                router[method](
                    `${routePrefix}${path}`,
                    ...middlewares,
                    validator,
                    routeHandler
                );
            }
        }
    };
}
