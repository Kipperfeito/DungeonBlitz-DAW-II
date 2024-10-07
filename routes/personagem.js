module.exports = (app) => {
  const multer = require("multer");
  const fs = require("fs");
  var path = require("path");

  const personagem = require("../controllers/personagem");
  var router = require("express").Router();

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/personagem");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
    },
  });

  const upload = multer({
    storage: storage,
  });

  // Rota para upload de imagem do personagem
  router.post("/upload/", upload.single("file"), async (req, res) => {
    res.send({
      upload: true,
      file: req.file,
    });
  });

  // Rota para buscar imagem do personagem
  router.get("/upload/:arquivo", (req, res) => {
    const arquivo =
      path.dirname(__dirname) + `/uploads/personagem/${req.params.arquivo}`;
    console.log("dir: " + arquivo);
    fs.readFile(arquivo, function (err, data) {
      if (err) {
        return res.status(404).send({ message: "Arquivo não encontrado" });
      }
      res.contentType("png");
      res.send(data);
    });
  });

  // Criar um novo personagem
  router.post("/", personagem.create);

  // Buscar todos os personagem
  router.get("/", personagem.findAll);

  // Buscar um único personagem por ID
  router.get("/:id", personagem.findOne);

  // Atualizar um personagem por ID
  router.put("/:id", personagem.update);

  // Deletar um personagem por ID
  router.delete("/:id", personagem.delete);

  // Deletar todos os personagem
  router.delete("/", personagem.deleteAll);

  app.use("/personagens", router);
};
