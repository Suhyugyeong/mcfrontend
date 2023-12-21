const Sequelize = require('sequelize')

class Comment extends Sequelize.Model {
  static initiate(sequelize){
    Comment.init({
      comment: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      create_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    },{
      sequelize,
      timestamps: false,
      underscored: false, 
      modelName: 'Comment',
      tableName: 'comments',
      paranoid: false,
      charset:'utf8',
      collate: 'utf8_general_ci'
    })
  }
  static associate(db){
    //1:n 관계에서 N 쪽은 belongsTo 로... 
    db.Comment.belongsTo(db.User, {foreignKey: 'commenter', targetKey:'id'})
  }
}

module.exports = Comment
