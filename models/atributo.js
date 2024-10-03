module.exports = (sequelize, Sequelize) => {
    const Atributos = sequelize.define(
      "atributos",
      {
      atrforca: { type: Sequelize.INTEGER, defaultValue: 10 },
      atragilidade: { type: Sequelize.INTEGER, defaultValue: 10 },
      atrinteligencia: { type: Sequelize.INTEGER, defaultValue: 10 },
      atrresistencia: { type: Sequelize.INTEGER, defaultValue: 10 },
      atrsorte: { type: Sequelize.INTEGER, defaultValue: 10 },
      atrdestreza: { type: Sequelize.INTEGER, defaultValue: 10 },
      },
      { freezeTableName: true }
    );
    return Atributos;
  };