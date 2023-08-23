import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

var db = {};
var dbPass = '';

if (process.env.ENVIOROMENT == 'DEV') {
    for(let i = 0; i < 10; i++)
        console.log("ENVIROMENT DEVELOPMENT");
    db = {
        host: 'localhost',
        dialect: 'postgres',
        //comentar logging para mostrar data de bdd al iniciar
        logging: false
    };
    dbPass = process.env.DB_PASS_DEV;

} else {
    for(let i = 0; i < 10; i++)
        console.log("ENVIROMENT PRODUCTION");
    db = {
        host: process.env.DB_HOST_PROD,
        port: process.env.DB_PORT_PROD, // Puerto de la base de datos en entorno de producción
        dialect: 'postgres',
        dialectOptions: {},
        //comentar logging para mostrar data de bdd al iniciar
        logging: false,
        };
    dbPass = process.env.DB_PASS_PROD;
}

export const sequelize = new Sequelize('sistemaTejidos', 'postgres', dbPass, db);