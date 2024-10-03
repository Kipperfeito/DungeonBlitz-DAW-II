module.exports = (sequelize, Sequelize) => {
    const Personagem = sequelize.define(
      "personagem",
      {
        pernome: { type: Sequelize.STRING },
        perclasse: { type: Sequelize.STRING }, 
        perimagem: { type: Sequelize.STRING }, 
        perexperiencia: { type: Sequelize.INTEGER, defaultValue: 0 }, 
        perpontosvida: { type: Sequelize.INTEGER, defaultValue: 100 }, 
        permana: { type: Sequelize.INTEGER, defaultValue: 50 },  
      },
      {
        freezeTableName: true,
      }
    );
    return Personagem;
  };