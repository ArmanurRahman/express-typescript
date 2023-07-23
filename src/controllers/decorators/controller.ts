import "reflect-metadata";
import express from "express";
import { AppRouter } from "../../AppRouter";

export const router = AppRouter.gerInstance();

export function controller(routePrefix: string) {
    return function (target: Function) {
        for (let key in target.prototype) {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata("path", target.prototype, key);

            if (path) {
                router.get(`${routePrefix}${path}`, routeHandler);
            }
        }
    };
}
