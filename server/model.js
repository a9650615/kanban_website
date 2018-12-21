const { User, Boards } = require("./mysql");

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
    return {
      id: data.get("id"),
      name: data.get("name"),
      owner: data.get("owner"),
    };
  },

  getBoards: async () => {
    const data = await Boards.fetchAll({
      withRelated: ["owner_user"],
    });

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
};

module.exports = Model;
