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
app.get("/create/:callId", (req: Request, res: Response) => {
  call = client.video.call("default", req.params.callId);
  call.create({
    ring: true,
    data: {
      created_by_id: "api",
      members: [{ user_id: "epic", role: "admin" }],
    },
  });
  res.send("call created");
});
app.get("/stop", async (req: Request, res: Response) => {
  await call.end();
  res.send("call ended");
});

app.use(express.json());
app.post("/webhooks", (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).send({});
});

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
