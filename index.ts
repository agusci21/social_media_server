import dotenv from "dotenv"
import Publication from "./models/publication";
dotenv.config()

import Server from "./models/server";
console.clear()
const server = new Server()
server.listen()


