const db = require("../models");
const Bicycle = db.bicycles;
const Op = db.Sequelize.Op;

// https://www.bezkoder.com/node-js-express-sequelize-mysql/

// Create and Save a new Bicycle
exports.create = (req, res) => {
    // Validamos la solicitud (verificamos que tenga los datos mínimos)
    if (!req.body.model || !req.body.brand) {
        return res.status(400).send({ message: "Content can not be Empty!" });
    }

    // Creamos un objeto con los datos de la nueva bicicleta
    const bicycle = {
        brand: req.body.brand,
        model: req.body.model
    };

    // Guardamos la bicicleta en la base de datos
    Bicycle.create(bicycle)
        .then(data => {
            // Si se crea correctamente, devolvemos el objeto creado
            res.status(201).send(data);
        })
        .catch(err => {
            // En caso de error, devolvemos un mensaje de error
            res.status(500).send({
                message: err.message || "Some error occurred while creating the bicycle."
            });
        });
};


// Retrieve all Bycicles from the database.
exports.findAll = (req, res) => {
    Bicycle.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving bicycles."
            });
        });
};


/*

// Importamos el modelo de Bicycle desde los modelos configurados
const db = require("../models");
const Bicycle = db.bicycles;

// Método para encontrar y devolver todas las bicicletas almacenadas en la base de datos
exports.findAll = async (req, res) => {
    try {
        // Obtenemos el valor de 'model' desde los parámetros de consulta de la solicitud (query string)
        const { model } = req.query;

        // Definimos un objeto vacío 'condition' que usaremos para condicionar la consulta a la base de datos
        let condition = {};

        // Si se envía un modelo en la solicitud, lo agregamos a la condición (usamos LIKE para hacer una búsqueda parcial)
        if (model) {
            condition.model = { [db.Sequelize.Op.like]: `%${model}%` };  // El operador 'LIKE' permite búsqueda parcial
        }

        // Realizamos la consulta a la base de datos usando el método findAll de Sequelize
        // Si 'condition' está vacío, se devolverán todas las bicicletas; si contiene un modelo, se filtrarán
        const bicycles = await Bicycle.findAll({ where: condition });

        // Si no se encuentran bicicletas, devolvemos un mensaje indicándolo con código 404 (Not Found)
        if (bicycles.length === 0) {
            return res.status(404).send({ message: "No se encontraron bicicletas." });
        }

        // Enviamos la lista de bicicletas encontradas como respuesta en formato JSON con un código 200 (OK)
        res.status(200).json(bicycles);

    } catch (error) {
        // En caso de un error inesperado (como un fallo en la base de datos), devolvemos un código 500 (Internal Server Error)
        // Además enviamos el mensaje de error detallado
        res.status(500).send({
            message: error.message || "Ocurrió un error al recuperar las bicicletas."
        });
    }
};


*/


exports.findOne = (req, res) => {
    const id = req.params.id;

    Bicycle.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Bicycle with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Bicycle with id=" + id
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.id;

    Bicycle.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Bicycle was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Bicycle with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Bicycle with id=" + id
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;

    Bicycle.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Bicycle was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Bicycle with id=${id}. Maybe Bycicle was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Bicycle with id=" + id
            });
        });
};


exports.deleteAll = (req, res) => {
    Bicycle.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Bicycles were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            });
        });
};


exports.findAllPublished = (req, res) => {
    Bicycle.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Bicycles."
            });
        });
};

/*
Este controlador se puede modificar un poco para devolver la respuesta de paginación:
{
    "totalItems": 8,
    "tutorials": [...],
    "totalPages": 3,
    "currentPage": 1
}


*/