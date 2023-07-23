import "reflect-metadata";
import { AppRouter } from "../../AppRouter";
import { Methods } from "./Methods";

export const router = AppRouter.gerInstance();

export function controller(routePrefix: string) {
    return function (target: Function) {
        for (let key in target.prototype) {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata("path", target.prototype, key);
            const method: Methods = Reflect.getMetadata(
                "method",
                target.prototype,
                key
            );

            if (path) {
                router[method](`${routePrefix}${path}`, routeHandler);
            }
        }
    };
}
