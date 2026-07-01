const express = require("express");
const db = require("./db");

// Define express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.get("/api/ping", (req, res) => res.json({ message: "pong" }));
app.get("/api/greet", (req, res) => {
  const name = req.query.name || "World";
  res.json({ message: `¡Hola, ${name}!` });
});
app.get("/api/students", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM students");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error");
  }
});
// Tarea 4: Agregar estudiante a la base de datos
app.post("/api/students", async (req, res) => {
  var nombreNuevo = req.body.name;

  if(!nombreNuevo){
    return res.status(400).json({ error: "Falta el nombre del estudiante"});
  }

  try {
    var consulta = "INSERT INTO students (name) VALUES ($1) RETURNING id, name";
    var resultado = await db.query(consulta, [nombreNuevo]);

    res.json(resultado.rows[0]);
  } catch (err){
    console.error(err);
    res.status(500).send("Error de BD al insertar");
  }
});
// Start the server
app.listen(port, () => console.log(`App running on port ${port}`));
