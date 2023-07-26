import express from "express";
import cors from "cors";
import { getAll, create, updateByID, deleteByID } from "./endpoints.js";

const app = express();

const port = 3001; //I think adding number type alias might break something so I haven't done it.

app.use(express.json());
app.use(cors());

app.get("/api/posts", getAll);
app.post("/api/posts", create);
app.put("/api/posts/:id", updateByID);
app.delete("/api/posts/:id", deleteByID);

app.listen(port, () => {
  console.log(`The server is being listened on port ${port}`);
});
