// Iteration #1
const mongoose = require("mongoose");
const Drone = require("../models/Drone.model.js");
const drones = [
  { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
  { name: "Racer 57", propellers: 4, maxSpeed: 20 },
  { name: "Courier 3000i", propellers: 6, maxSpeed: 18 }
];

  mongoose
  .connect("mongodb://127.0.0.1:27017/lab-express-drones", { bufferCommands: false })
  .then(() => {
    console.log("Conexión exitosa a la base de datos.");
    // Función para insertar los datos de películas en la base de datos
    const seedDatabase = async () => {
      try {
        // Elimina todos los registros existentes en la colección de películas
        await Drone.deleteMany();

        // Inserta los datos de películas en la base de datos
        await Drone.insertMany(drones);

        console.log("Datos de drones insertados en la base de datos.");
      } catch (error) {
        console.error("Error al insertar los datos de los drones:", error);
      } finally {
        // Cierra la conexión a la base de datos y finaliza el proceso de sembrado
        mongoose.connection.close();
        console.log("Proceso de sembrado finalizado.");
      }
    };

    // Invoca la función de sembrado para iniciar el proceso
    seedDatabase();
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });

//PARA SEMBRAR:
  //ejecutar con node seeds/drones.seed.js en terminal