import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/Questions.js";
import answerRoutes from "./routes/Answers.js";
import connectDB from "./connectMongoDb.js";
import mongoose from "mongoose";
import chatbotRoutes from "./routes/chatbot.js"
import otpRoutes from "./routes/otp.js"
import path from "path"

dotenv.config();
//connectDB();
mongoose.connect(process.env.CONNECTION_URL).then(() => console.log("Connection successfull"))
const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// app.use('/',(req, res) => {
//     res.send("This is a stack overflow clone API")
// })
app.use('/user', userRoutes)
app.use('/questions', questionRoutes);
app.use("/answer", answerRoutes);
app.use("/otp" , otpRoutes)
app.use("/chatbot" , chatbotRoutes)

// --------------------Deployment---------------------
const __dirname1 = path.resolve();
console.log(__dirname1); 
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname1, "../client/build")));
  
  console.log("sdf"); 
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"));
  });
}
else{
  app.get("/", (req, res) => {
    res.send("API IS RUNNING SUCCESSFUL")
  });
}
// --------------------Deployment---------------------


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
