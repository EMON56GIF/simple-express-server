import express from "express";
const app = express();

const PORT = 3500;
const timestamp = new Date().toUTCString();

app.get("/", (request, response) => {
  response.status(200).json({
    message: "Hello, World",
    active: true,
    timestamp: timestamp,
  });
});

app.listen(PORT, () => {
  console.log(`Server started running on ${PORT}`);
});
