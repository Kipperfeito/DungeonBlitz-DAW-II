const db = require("../models");
const Atributos = db.atributo;
const Op = db.Sequelize.Op;

// Criar atributos para um personagem
exports.create = (req, res) => {
  const atributos = {
    atrforca: req.body.atrforca || 10,
    atragilidade: req.body.atragilidade || 10,
    atrinteligencia: req.body.atrinteligencia || 10,
    atrresistencia: req.body.atrresistencia || 10,
    atrsorte: req.body.atrsorte || 10,
    atrdestreza: req.body.atrdestreza || 10,
    personagemId: req.body.personagemId,
  };

  Atributos.create(atributos)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro ao criar atributos",
      });
    });
};

// Buscar todos os atributos
exports.findAll = (req, res) => {
  Atributos.findAll()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Erro ao buscar atributos",
      })
    );
};

// Buscar atributos de um personagem específico
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Atributos.findByPk(id)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Não foi possível encontrar atributos com id ${id}`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || `Erro ao buscar atributos com id ${id}`,
        });
      });
  };
  
  // Atualizar atributos
  exports.update = (req, res) => {
    const id = req.params.id;
  
    Atributos.update(req.body, {
      where: { id: id },
    })
      .then((num) => {
        if (num[0] === 1) {
          res.send({ message: "Atributos atualizados com sucesso" });
        } else {
          res.send({
            message: `Não foi possível atualizar os atributos com id ${id}. Talvez o atributos não tenha sido encontrado ou req.body esteja vazio`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || `Erro ao atualizar os atributos com id ${id}`,
        });
      });
  };
  
  // Deletar atributos
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Atributos.destroy({ where: { id: id } })
      .then((num) => {
        if (num === 1) {
          res.send({ message: "Atributos deletados com sucesso!" });
        } else {
          res.send({
            message: `Não foi possível deletar os atributos com id ${id}. Talvez o atributos não tenha sido encontrado`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Erro ao deletar atributos com id=" + id,
        });
      });
  };

  exports.deleteAll = (req, res) => {
    Atributos.destroy({
      where: {},
      truncate: false,
    })
      .then((nums) => {
        res.send({ message: `${nums} atributos foram deletados com sucesso` });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Erro ao deletar atributos",
        });
      });
  };