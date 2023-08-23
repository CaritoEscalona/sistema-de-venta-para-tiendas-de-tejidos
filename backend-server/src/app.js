import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import { associateModels } from './models/associations.js';
import usuarioRouter from "./routers/usuarioRouter.js";
import tiendaRouter from "./routers/tiendaRouter.js";
import productoRouter from "./routers/productoRouter.js";
import categoriaRouter from "./routers/categoriaRouter.js"
import authRouter from './routers/authRouter.js';
import permisoRouter from './routers/permisoRouter.js';
import rolRouter from './routers/rolRouter.js';
import carritoRouter from './routers/carritoRouter.js';
import pagoRouter from './routers/pagoRouter.js';

dotenv.config();

const app = express();

// Relationships between entities. It should be before the middleware
associateModels();

if (process.env.ENVIOROMENT != 'DEV'){
  for(let i = 0; i < 10; i++)
        console.log("env: PRODUCTION");
  app.use(function (req, res, next) {
    console.log("Origin:", req.headers.origin);
    next();
  });
  app.use(cors("http://pacheco.chillan.ubiobio.cl:105"));
} else {
  for(let i = 0; i < 10; i++)
        console.log("env: DEVELOPMENT");
  app.use(cors());
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(authRouter);
app.use(usuarioRouter);
app.use(tiendaRouter);
app.use(productoRouter);
app.use(categoriaRouter);
app.use(permisoRouter);
app.use(rolRouter);
app.use(carritoRouter);
app.use(pagoRouter);

export default app;

