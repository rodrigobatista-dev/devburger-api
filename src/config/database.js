module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'devburger',
  define: {
    timestamps: true, // serve para adicionar as colunas created_at e updated_at hora e data de criação e atualização
    underscored: true, // serve para transformar os nomes das colunas em snake_case
    underscoredAll: true, // serve para transformar todos os nomes das colunas em snake_case
  },
};
