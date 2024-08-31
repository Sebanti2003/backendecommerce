import { configDotenv } from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";

configDotenv({
  path: "./.env",
});

const port = process.env.PORT;

//connection to the database
connectDB();

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`);
});
