import { createClient } from "redis";
const client = createClient();
async function processSubmission(submission: string) {
  const { problemId, code, language, userId } = JSON.parse(submission);
  console.log(problemId);
  console.log(code);
  console.log(language);
  console.log(userId);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(`Finished processing submission for problemId ${problemId}.`);
}
async function startServer() {
  try {
    await client.connect();
    console.log("worker connected to redis");
    while (true) {
      const submission = await client.brPop("problem", 0);
      //   console.log("submission ", submission);

      //@ts-ignore
      await processSubmission(submission.element);
    }
  } catch (error) {
    console.log("error while establishing a connection ", error);
  }
}
startServer();
