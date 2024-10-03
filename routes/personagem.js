module.exports = (app) => {
    const personagen = require("../controllers/personagem.js");
    var router = require("express").Router();
  
    // Rota para criar um personagem
    router.post("/", personagen.create);
    // Rota que retorna todos os personagens
    router.get("/", personagen.findAll);
    // Rota que retorna um personagem pelo id
    router.get("/:id", personagen.findOne);
    // Rota que atualiza um personagem pelo id
    router.put("/:id", personagen.update);
    // Rota para deletar um personagem pelo id
    router.delete("/:id", personagen.delete);
    // Rota para deletar todos os personagens
    router.delete("/", personagen.deleteAll);
  
    // A linha abaixo informa que todas essas rotas são encontradas após o /personagens.
    app.use("/personagens", router);
  };
  