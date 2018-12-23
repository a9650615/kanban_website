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

  getUsers: async () => {
    const data = await User.fetchAll();
    return data;
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

  deleteBoard: async id => {
    const result = await new Boards()
      .where({
        ID: id,
      })
      .destroy();
    return result;
  },

  // kanban
  createKanBan: async (creator, { name = "", boardId = 0 }) => {
    const data = await new KanBan({
      name,
      board_id: boardId,
      creator,
    }).save();

    return data;
  },

  getKanbans: async boardId => {
    const data = await KanBan.where({
      board_id: boardId,
    }).fetchAll({
      withRelated: ["cards"],
    });

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

  // user of board

  async getUserOfBoard(boardId) {
    const data = await BoardsUserRelation.where({
      board_id: boardId,
    }).fetchAll({
      withRelated: ["user"],
    });

    return data;
  },

  async addUserOfBoard(boardId, userId) {
    const existingModel = await BoardsUserRelation.forge({
      board_id: boardId,
      user_Id: userId,
    }).fetch();
    let data;
    if (existingModel) {
      data = await existingModel.fetch();
      return data;
      // return await existingModel.set(updateData).save();
    }
    data = await new BoardsUserRelation({
      board_id: boardId,
      user_Id: userId,
    }).save();
    return data;
  },

  async removeUserOfBoard(boardId, userId) {
    const result = await new BoardsUserRelation()
      .where({
        board_id: boardId,
        user_Id: userId,
      })
      .destroy();
    return result;
  },
};

module.exports = Model;
