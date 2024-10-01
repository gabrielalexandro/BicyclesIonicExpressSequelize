const dbConfig = require("./../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    //operatorsAliases: false,  // <- Esto ya no es necesario

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.bicycles = require("./bicycle.model.js")(sequelize, Sequelize);

module.exports = db;


/*

const dbConfig = require("./../config/db.config.js"); // Cargamos la configuración de la base de datos
const Sequelize = require("sequelize"); // Importamos Sequelize para manejar la base de datos

// Creamos una instancia de Sequelize con la configuración cargada
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false, // Evitamos el uso de aliases de operadores obsoletos por seguridad
    pool: {  // Configuramos el pool de conexiones según los valores en la configuración
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    logging: false // Desactivamos el log de consultas SQL en consola
});

// Creamos un objeto `db` que contendrá los modelos y la instancia de Sequelize
const db = {};

db.Sequelize = Sequelize;  // Guardamos la clase Sequelize
db.sequelize = sequelize;  // Guardamos la instancia de la conexión a la base de datos

// Importamos el modelo `bicycles` y lo añadimos al objeto `db`
db.bicycles = require("./bicycle.model.js")(sequelize, Sequelize);

// Método para conectar y sincronizar la base de datos de forma asíncrona
db.connect = async () => {
    try {
        await sequelize.authenticate();  // Autentica la conexión con la base de datos
        console.log("Conexión a la base de datos establecida con éxito");
        await sequelize.sync();  // Sincroniza los modelos con la base de datos
    } catch (error) {
        console.error("No se pudo conectar a la base de datos:", error);
        throw error;  // Lanza el error para que sea manejado en otro lugar
    }
};

module.exports = db;  // Exportamos el objeto `db` para ser usado en otras partes del proyecto



*/
