const db = require("../models");
const Personagem = db.personagem;
const Op = db.Sequelize.Op;

// Criar um novo personagem
exports.create = (req, res) => {
  if (!req.body.pernome || !req.body.perclasse) {
    res.status(400).send({
      message: "Nome e classe são obrigatórios",
    });
    return;
  }

  const personagem = {
    pernome: req.body.pernome,
    perclasse: req.body.perclasse,
    perimagem: req.body.perimagem || "default.png",
    perexperiencia: req.body.perexperiencia || 0,
    perpontosvida: req.body.perpontosvida || 100,
    permana: req.body.permana || 50,
    usuarioId: req.body.usuarioId
  };

  Personagem.create(personagem)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro ao criar personagem",
      });
    });
};

// Buscar todos os personagens
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  const condition = nome ? { pernome: { [Op.iLike]: `%${nome}%` } } : null;

  Personagem.findAll({ where: condition })
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Erro ao buscar personagens",
      })
    );
};

// Buscar um único personagem por ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Personagem.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não foi possível encontrar personagem com id ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Erro ao buscar personagem com id ${id}`,
      });
    });
};

// Atualizar um personagem por ID
exports.update = (req, res) => {
  const id = req.params.id;

  Personagem.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Personagem atualizado com sucesso" });
      } else {
        res.send({
          message: `Não foi possível atualizar o personagem com id ${id}. Talvez o personagem não tenha sido encontrado ou req.body esteja vazio`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Erro ao atualizar o personagem com id ${id}`,
      });
    });
};

// Deletar um personagem por ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Personagem.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Personagem deletado com sucesso!" });
      } else {
        res.send({
          message: `Não foi possível deletar o personagem com id ${id}. Talvez o personagem não tenha sido encontrado`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro ao deletar personagem com id=" + id,
      });
    });
};

// Deletar todos os personagens
exports.deleteAll = (req, res) => {
  Personagem.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} personagens foram deletados com sucesso` });
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Erro ao deletar personagens",
      })
    );
};
