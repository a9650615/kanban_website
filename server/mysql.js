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

bookshelf.plugin("virtuals");
bookshelf.plugin("visibility");

const User = bookshelf.Model.extend({
  tableName: "users",
  idAttribute: "ID",
  hidden: ["ps"],
});

const Boards = bookshelf.Model.extend({
  tableName: "boards",
  idAttribute: "ID",
  owner_user() {
    return this.belongsTo(User, "owner");
  },
  hasTimestamps: ["created_at", "updated_at"],
});

const BoardsUserRelation = bookshelf.Model.extend({
  tableName: "board_users",
  user() {
    return this.belongsTo(User, "user_id");
  },
  board() {
    return this.belongsTo(Boards, "board_id");
  },
});

const KanBan = bookshelf.Model.extend({
  tableName: "kanban",
  idAttribute: "ID",
  hidden: ["name"],
  virtuals: {
    // id() {
    //   return this.get("ID");
    // },
    title() {
      return this.get("name");
    },
  },
  board_id() {
    return this.belongsTo(Boards);
  },
  cards() {
    return this.hasMany(Cards, "kanban_id");
  },
  hasTimestamps: ["created_at", "updated_at"],
});

const Cards = bookshelf.Model.extend({
  tableName: "cards",
  idAttribute: "ID",
  hidden: ["name"],
  virtuals: {
    // id() {
    //   return this.get("ID");
    // },
    title() {
      return this.get("name");
    },
  },
  board() {
    return this.belongsTo(KanBan, "kanban_id");
  },
  // kanban_id() {
  //   return this.belongsTo(KanBan);
  // },
  hasTimestamps: ["created_at", "updated_at"],
});

const History = bookshelf.Model.extend({
  tableName: "history",
  card() {
    return this.belongsTo(Cards, "card_id");
  },
  hasTimestamps: ["created_at", "updated_at"],
});

module.exports = {
  User,
  Boards,
  BoardsUserRelation,
  KanBan,
  Cards,
  History,
  knex,
};
