module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define(
      "usuario",
      {
        usunome: { type: Sequelize.STRING },
        usuemail: { type: Sequelize.STRING },
        usudatanascimento: { type: Sequelize.DATEONLY },
        ususenha: { type: Sequelize.STRING },
        usuadmin: { type: Sequelize.BOOLEAN, defaultValue: false },
        usustatus: { type: Sequelize.STRING }
      },
      { freezeTableName: true }
    );
    return Usuario;
  };