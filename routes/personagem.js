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
  router.post("/", upload.single("perimagem"), async (req, res) => {
    try {
      const novoPersonagem = {
        ...req.body,
        perimagem: req.file ? req.file.filename : null,
      };

      const resultado = await personagem.create(novoPersonagem, res);
    } catch (err) {
      console.error("Erro ao criar personagem:", err);
      res.status(500).send({
        message: "Erro ao criar personagem",
      });
    }
  });

  // Rota para buscar imagem do personagem
  router.get("/upload/:arquivo", (req, res) => {
    const arquivo = path.join(
      __dirname,
      "../uploads/personagem",
      req.params.arquivo
    );

    fs.readFile(arquivo, (err, data) => {
      if (err) {
        return res.status(404).send({ message: "Arquivo não encontrado" });
      }
      res.contentType(path.extname(arquivo));
      res.send(data);
    });
  });

  // Outras rotas
  router.get("/", personagem.findAll);
  router.get("/:id", personagem.findOne);
  router.put("/:id", upload.single("perimagem"), async (req, res) => {
    try {
      const novoPersonagem = {
        ...req.body,
        perimagem: req.file ? req.file.filename : null,
      };

      await personagem.update({novoPersonagem, id:req.params.id}, res);
    } catch (err) {
      console.error("Erro ao criar personagem:", err);
      res.status(500).send({
        message: "Erro ao criar personagem",
      });
    }
  });
  router.delete("/:id", personagem.delete);
  router.delete("/", personagem.deleteAll);

  app.use("/personagens", router);
};  