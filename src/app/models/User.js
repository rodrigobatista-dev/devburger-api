import Sequelize, { Model } from 'sequelize';

import bcrypt from 'bcrypt';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
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
    this.addHook('beforeSave', async (user) => {
      user.password_hash = await bcrypt.hash(user.password, 10);
    });
    return this;
  }

  async checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
