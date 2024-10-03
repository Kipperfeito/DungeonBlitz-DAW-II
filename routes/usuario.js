module.exports = (app) => {
    const usuario = require("../controllers/usuario.js");
    var router = require("express").Router();
  
    // Rota para criar um usuário
    router.post("/", usuario.create);
    // Rota que retorna todos os usuários
    router.get("/", usuario.findAll);
    // Rota que retorna um usuário pelo id
    router.get("/:id", usuario.findOne);
    // Rota que atualiza um usuário pelo id
    router.put("/:id", usuario.update);
    // Rota para deletar um usuário pelo id
    router.delete("/:id", usuario.delete);
    // Rota para deletar todos os usuários
    router.delete("/", usuario.deleteAll);
  
    // A linha abaixo informa que todas essas rotas são encontradas após o /usuarios.
    app.use("/usuarios", router);
  };
  