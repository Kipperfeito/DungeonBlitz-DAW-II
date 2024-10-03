module.exports = (app) => {
    const atributo = require("../controllers/atributo.js");
    var router = require("express").Router();
  
    // Rota para criar atributos
    router.post("/", atributo.create);
    // Rota que retorna todos os atributos
    router.get("/", atributo.findAll);
    // Rota que retorna atributos pelo id
    router.get("/:id", atributo.findOne);
    // Rota que atualiza atributos pelo id
    router.put("/:id", atributo.update);
    // Rota para deletar atributos pelo id
    router.delete("/:id", atributo.delete);
    // Rota para deletar todos os atributos
    router.delete("/", atributo.deleteAll);
  
    // A linha abaixo informa que todas essas rotas são encontradas após o /atributos.
    app.use("/atributos", router);
  };
  