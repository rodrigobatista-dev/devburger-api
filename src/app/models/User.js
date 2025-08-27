import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        admin: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        tableName: 'users', // nome da tabela
        timestamps: true, // ativa createdAt e updatedAt
        createdAt: 'created_at', // mapeia para a coluna created_at
        updatedAt: 'updated_at', // mapeia para a coluna updated_at
      },
    );
  }
}

export default User;
