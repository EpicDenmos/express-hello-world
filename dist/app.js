"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_sdk_1 = require("@stream-io/node-sdk");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// configures dotenv to work in your application
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
const client = new node_sdk_1.StreamClient(process.env.STREAM_API_KEY || "", process.env.STREAM_API_SECRET || "");
let call;
app.get("/", (req, res) => {
    res.type("html").send("Hello");
});
app.get("/create", (req, res) => {
    call = client.video.call("default", "default_test_call");
    call.create({ data: { created_by_id: "john" } });
    res.send("call created");
});
app.get("/stop", (req, res) => {
    call.end();
    res.send("call ended");
});
const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
