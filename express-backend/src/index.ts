import express from "express";
import { createClient } from "redis";
const app = express();

app.use(express.json());

const client = createClient();
app.post("/submit", async (req, res) => {
  const problemId = req.body.problemId;
  const code = req.body.code;
  const language = req.body.language;
  const userId = req.body.userId;
  try {
    await client.lPush(
      "problem",
      JSON.stringify({ problemId, code, language, userId })
    );
    res.json({
      message: "problem sumbitted succesfully",
    });
  } catch (error) {
    console.log("error while submitting problem ", error);
    res.json({
      message: "error while submitting problem",
    });
  }
});

async function startServer() {
  try {
    await client.connect();
    console.log("redis is connected");
  } catch (error) {
    console.log("Error while connectiong redis ", error);
  }
}
startServer();
// app.get("/check",async(req,res)=>{
//     const res=await client.rPop("p")
// })
app.listen(5000, () => {
  console.log("Port is runnning on 5000");
});
