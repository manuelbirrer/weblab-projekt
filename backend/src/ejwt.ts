import {expressjwt} from "express-jwt";

export const eJwt = expressjwt({
    secret: "badsecret",
    algorithms: ["HS256"]
})