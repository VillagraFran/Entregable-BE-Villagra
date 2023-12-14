import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import { config } from "dotenv";
config();

import productRouter from "./routes/products.routes.js";
import userRouter from "./routes/users.routes.js";
import cartRouter from "./routes/carts.routes.js";
import privateRoutes from "./middlewares/privateRoutes.js";

import initializePassport from "./config/passport.config.js";

mongoose.connect(process.env.MONGO_ATLAS_URL);

const app = express();
const httpServer = app.listen(8080, ()=>console.log("on"));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser);

app.use('/api/products',privateRoutes, productRouter);
app.use('/api/user',privateRoutes, userRouter);
app.use('/api/cart',privateRoutes, cartRouter);


initializePassport();
app.use(passport.initialize())