import express,{Request,Response,Express} from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app:Express = express();
const port = process.env.PORT || 8000;
import router from "../src/routes/apiRoutes";


app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use("/api", router);


// MongoDB Connection
dotenv.config();
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

mongoose
    .connect(`mongodb+srv://${username}:${password}@cluster1.jlmll9b.mongodb.net/pizza-hut`)
    .then(() => console.log("MongoDB Connected"))
    .catch((error: Error) => console.log("Mongo Error", error));


app.listen(port,() => {
    console.log(`Listening to PORT ${port}`);
})
