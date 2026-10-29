import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import dotenv from "dotenv";


// the env(security house) is called and configured
dotenv.config();


//  to connect the env with Mongo DB to secure our data base using the url from MDB
mongoose.connect(process.env.MONGODB_URI).
    then(() => {
        console.log("connected to mongodb");
    }).
    catch((error) => {
        console.log('error connecting mongodb:', error)
    });


// wrapping the express file to a name "app" so we can call it as a function
const app = express();


// now, the "app" is a function already holding the "epress file"
//  we are telling it to convert it to json
app.use(express.json())


// the url  abter "http://"
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);


// holding the env to post and alternative port server code
const port = process.env.PORT || 5000




//  the place the server is running
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})