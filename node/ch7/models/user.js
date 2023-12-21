//유저 모델을 정의하는 파일..
//모델이란 데이터를 구성하는 객체... 
//클래스로 선언하는데.. sequalizer 에게 어떻게 데이터베이스랑 매핑해야 한다는 정보를 설정해서..
//sequalizer 는 ORM 을 제공하고.. ORM 에 의해 데이터베이스 연동을 조금더 편하게 할수는 있지만..
//최소한의 정보는 줘야.. User 클래스의 데이터가 데이터베이스에 어떻게 매핑이 되어야 하는지..
const Sequelize = require('sequelize')

class User extends Sequelize.Model {
  //어디선가.. User 초기화를 위해서 호출... - 이 모델의 데이터를 저장하기 위한 테이블이 자동으로
  static initiate(sequelize){
    User.init({
      name:{
        type: Sequelize.STRING(20),
        allowNull: false,
        unique:true
      },
      age: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      married: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
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
      modelName: 'User',
      tableName: 'users',
      paranoid: false,
      charset:'utf8',
      collate: 'utf8_general_ci'
    })
  }
  //이 모델과 다른 모델이 관계가 있다면.. 관계 설정해야 한다..
  //결국.. db 적으로 보면 foreign key 같은 설정.. 
  static associate(db){
    //User - Comment : 1:n
    db.User.hasMany(db.Comment, {foreignKey: 'commenter', sourceKey:'id'})
  }
}

module.exports = User
