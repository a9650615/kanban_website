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
  idAttribute: "ID",
});

const Boards = bookshelf.Model.extend({
  tableName: "boards",
  owner_user() {
    return this.belongsTo(User, "owner");
  },
  hasTimestamps: ["created_at", "updated_at"],
});

module.exports = {
  User,
  Boards,
};
