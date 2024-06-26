import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import searchRoutes from "./routes/search.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
console.log(__dirname)
dotenv.config();

const app=express();
app.use(express.json())
app.use(cors({
    origin:"*"
}))
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"))
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/assets")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload=multer({ storage })



/* ROUTES WITH FILES */
app.post("/auth/register", register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/",searchRoutes);
app.get("/",(req,res)=>{
    return res.json({
        msg:"hello there"
    })
})


const port=3001;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true

}).then(()=>{
    console.log("Database connected..")
}).catch(error=>console.log(error))
app.listen(port,()=>{
    console.log("Server running at port 3001")
})
console.log("ok");
 /* ADD DATA ONE TIME */
//User.insertMany(users);
//Post.insertMany(posts);

