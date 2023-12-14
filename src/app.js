import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from 'swagger-ui-express';
import __dirname from "./utils/index.js";
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

const swaggerOptions = {
    definition: {
      openapi: '3.0.1',  
      info: { 
        title: 'Documentazao',
        description: 'Documentación',
      },
    },
    apis: [`${__dirname}/docs/**/*.yaml`],
};
  
const specs = swaggerJSDoc(swaggerOptions);
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser);

app.use('/api/products',privateRoutes, productRouter);
app.use('/api/user',privateRoutes, userRouter);
app.use('/api/cart',privateRoutes, cartRouter);


initializePassport();
app.use(passport.initialize())