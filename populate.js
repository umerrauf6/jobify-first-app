import { readFile } from "fs/promises";
import connectDb from "./db/connect.js";
import dotenv from "dotenv";
import Job from "./model/Job.js";

dotenv.config();
async function populate() {
  try {
    await connectDb(process.env.MONGO_URL);
    const jsonData = JSON.parse(
      await readFile(new URL("./MOCK_DATA.json", import.meta.url))
    );
    await Job.deleteMany();
    await Job.create(jsonData);
    console.log("success");
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
populate();
