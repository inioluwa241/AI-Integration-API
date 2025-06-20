const punycode = require("punycode/");

const OpenAiApi = require("openai");
const Together = require("together-ai");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
const path = require("path");
const cors = require("cors");

const express = require("express");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3003;

app.post("/", async (req, res, next) => {
  const input = req.body;
  console.log(input.text);

  const response = await fetch(
    "https://api.pawan.krd/cosmosrp/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer pk-YSgUOxvvOzXJWRQVjEGTvFrSnrikMfmkQFrlhDuHhEmHtyZZ`,
      },
      body: JSON.stringify({
        model: "cosmosrp",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: input.text },
        ],
      }),
    }
  );
  console.log("it is printing");
  console.log(response);
  console.log(response);
  const data = await response.json();
  console.log(data);
  const preMessage = await data.choices;
  if (preMessage) {
    console.log(preMessage[0].message.content);
  } else {
    console.log("nothing for you");
  }
  console.log(preMessage);
  console.log(data.choices[0].message.content);
  const Aireply = data.choices[0].message.content;
  res.status(200).json({
    AIresponse: Aireply,
  });
  console.log("it is still printing");
});

console.log("it is done");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
