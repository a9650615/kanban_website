const { User, Boards, BoardsUserRelation, KanBan, Cards } = require("./mysql");

const Model = {
  createUser: async ({ acc, ps, name }) => {
    const user = { acc, ps, name };
    const hasOne = await User.where({ acc }).count();
    if (hasOne > 0) {
      return { error: "帳號已有人使用" };
    }

    const data = await User.forge(user).save();
    return { name: data.get("name"), id: data.get("id") };
  },

  getUser: async ({ acc, ps }) => {
    const user = { acc, ps };
    try {
      const userData = await User.where(user).fetch();
      return { id: userData.get("ID"), name: userData.get("name") };
    } catch (e) {
      return { error: "沒有此帳號" };
    }
  },

  createBoard: async ({ name, owner }) => {
    const board = { name, owner };
    const data = await Boards.forge(board).save();
    const relationData = new BoardsUserRelation({
      board_id: data.get("id"),
      user_Id: owner,
    }).save();
    return {
      ID: data.get("id"),
      name: data.get("name"),
      owner: data.get("owner"),
      relationData,
    };
  },

  getBoards: async id => {
    let data = {};
    if (id) {
      data = await Boards.where({
        owner: id,
      }).fetchAll({
        withRelated: ["owner_user"],
      });
    } else {
      data = await Boards.fetchAll({
        withRelated: ["owner_user"],
      });
    }

    return data;
  },

  updateBoard: async (id, { name = "" }) => {
    const data = await Boards.where({
      id,
    }).save(
      {
        name,
      },
      {
        method: "update",
      },
    );

    return data;
  },

  createKanBan: async (creator, { name = "", boardId = 0 }) => {
    const data = await new KanBan({
      name,
      board_id: boardId,
      creator,
    }).save();

    return data;
  },

  // cards
  createCard: async (
    creator,
    { kanbanId = 0, name = "", content = "", type = 0, color = 0 },
  ) => {
    const data = await new Cards({
      kanban_id: kanbanId,
      name,
      content,
      type,
      color,
      creator,
    }).save();

    return data;
  },
};

module.exports = Model;
