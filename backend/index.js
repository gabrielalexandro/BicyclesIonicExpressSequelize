const express = require("express");
const cors = require("cors");

const app = express();

let corsOption = {
  origin: "http://localhost:8100"
}
app.use(cors(corsOption));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./models");
/*const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });*/

// normal use. Doesn't delete the database data
db.sequelize.sync();

// In development, you may need to drop existing tables and re-sync database.
//db.sequelize.sync({ force: true }).then(() => {
//  console.log("Drop and re-sync db");
//})

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bycicles application" })
})

require("./routes/bicycle.routes.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})



/*

require('dotenv').config();  // Cargamos las variables de entorno desde el archivo .env
const express = require("express");  // Importamos Express
const db = require("./models");  // Importamos la configuración de la base de datos y modelos

const app = express();  // Creamos la aplicación de Express

// Middlewares para parsear JSON y datos codificados en URL
app.use(express.json());  // Permite a la aplicación aceptar peticiones con JSON
app.use(express.urlencoded({ extended: true }));  // Permite manejar datos en formato de URL

// Middleware para la página de inicio
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bicycles application" });  // Respuesta de bienvenida en formato JSON
});

// Inicialización del servidor y conexión a la base de datos
const PORT = process.env.PORT || 8080;  // Definimos el puerto a usar. Si no hay variable de entorno PORT, será 8080

// Función para inicializar el servidor de forma asíncrona
const startServer = async () => {
    try {
        await db.connect();  // Conectamos a la base de datos y sincronizamos los modelos
        app.listen(PORT, () => {  // Iniciamos el servidor en el puerto definido
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);  // En caso de error, lo registramos en la consola
        process.exit(1);  // Forzamos la salida del proceso en caso de error crítico
    }
};

// Iniciamos el servidor
startServer();

// Middleware global para manejar errores no capturados
app.use((err, req, res, next) => {
    console.error(err.stack);  // Logueamos el error
    res.status(500).send({ message: "An unexpected error occurred!" });  // Enviamos una respuesta genérica de error
});



*/