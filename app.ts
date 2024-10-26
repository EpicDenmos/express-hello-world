import { StreamCall, StreamClient } from "@stream-io/node-sdk";
import express, { Request, Response } from "express";
import dotenv from "dotenv";

// configures dotenv to work in your application
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const client = new StreamClient(
  process.env.STREAM_API_KEY || "",
  process.env.STREAM_API_SECRET || "",
);

let call: StreamCall;

app.get("/", (req: Request, res: Response) => {
  res.type("html").send("Hello");
});
app.get("/create", (req: Request, res: Response) => {
  call = client.video.call("default", "default_test_call");
  call.create({ data: { created_by_id: "john" } });
  res.send("call created");
});
app.get("/stop", (req: Request, res: Response) => {
  call.end();
  res.send("call ended");
});

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
