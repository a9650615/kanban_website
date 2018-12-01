// eslint-disable-next-line import/no-unresolved
const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "task_managent",
    charset: "utf8",
  },
});

// eslint-disable-next-line import/no-unresolved
const bookshelf = require("bookshelf")(knex);

const User = bookshelf.Model.extend({
  tableName: "users",
});

module.exports = {
  User,
};
