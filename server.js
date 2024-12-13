const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin:
    "http://localhost:3000",
};

app.use(cors(corsOptions));
//parser de requisições com content type - application/json
app.use(express.json());
//parser de requisições com content type - application/x-www-form-urlencoded (forms enviando dados pelo método POST)
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/", function (req, res) {
  res.send("DAW II - Criação de Personagem");
});

// Rota para os usuários
require("./routes/usuario")(app);
// Rota para os personagens
require("./routes/personagem")(app);
// Rota para os atributos
require("./routes/atributo")(app);

app.listen(8000, function (req, res) {
  console.log("App rodando na porta 8000");
});