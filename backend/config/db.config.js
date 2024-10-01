module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "123456",
    DB: "db_bicycles",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

/*

Para esto tenemos que instalar el paquete dotenv
$ npm install dotenv

Crear el archivo .env en la raíz de tu proyecto: Crea un archivo llamado .env en la raíz de tu proyecto, y agrega las variables que necesites. 
Aquí un ejemplo de cómo puede verse tu archivo .env:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=db_bicycles
PORT=8080
DB_POOL_MAX=5
DB_POOL_MIN=0
DB_POOL_ACQUIRE=30000
DB_POOL_IDLE=10000


require('dotenv').config(); // Carga las variables de entorno desde un archivo .env

module.exports = {
    HOST: process.env.DB_HOST || "localhost",   // El host de la base de datos, obtenido de las variables de entorno
    USER: process.env.DB_USER || "root",        // El usuario de la base de datos
    PASSWORD: process.env.DB_PASSWORD || "123456",  // La contraseña del usuario
    DB: process.env.DB_NAME || "db_bicycles",   // Nombre de la base de datos
    dialect: "mysql",                           // El dialecto a utilizar (en este caso MySQL)
    pool: {
        max: parseInt(process.env.DB_POOL_MAX) || 5,        // Máximo número de conexiones simultáneas
        min: parseInt(process.env.DB_POOL_MIN) || 0,        // Mínimo número de conexiones
        acquire: parseInt(process.env.DB_POOL_ACQUIRE) || 30000,  // Tiempo máximo para adquirir una conexión
        idle: parseInt(process.env.DB_POOL_IDLE) || 10000   // Tiempo máximo de inactividad antes de cerrar la conexión
    }
};



*/