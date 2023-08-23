import app from './app.js';
import {sequelize} from './db/db.js';

import './models/Usuario.js';
import './models/Producto.js';
import './models/Tienda.js';


async function start(){
    try {
        /*
        NOTA: Utilizar alguno de los sync de abajo puede vaciar las tablas de la bdd, usar cuando sea necesario
        sync({force: true}) para forzar la creación de tablas al ejecutar
        sync({alter: true}) para modificar tablas al ejecutar 
        */
        await sequelize.authenticate();
        await sequelize.sync();
        
        console.log("Conexión establecida con la base de datos");
        app.listen(5000, ()=>{
            console.log("Server has started on port 5000");
        });
    } catch (error) {
        console.log("No se pudo conectar con la base de datos: ", error);
    }
}

start();

//crear usuario
// app.post("/usuarios", async (req, res) =>{
//     try {
//         const results = await db.query("INSERT INTO Usuario (rut_usuario, nombre_usuario, apellido_usuario, email_usuario) values ($1,$2,$3,$4) returning *", [req.body.rut_usuario, 
//             req.body.nombre_usuario, req.body.apellido_usuario, req.body.email_usuario]);
        
//         res.status(201).json({
//             status: "success"
//         });
        
//     } catch (error) {
//         console.error(error.message);
//     }

// });
//get usuarios
//get usuario
//update usuario
//delete usuario

