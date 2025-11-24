import process from "process";
import { ICredentials } from "./types/credentials";

export const credentials: ICredentials = {
    username: process.env.USER_NAME!,
    password: process.env.USER_PASSWORD!
}