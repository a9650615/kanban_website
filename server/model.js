const {
  User,
  Boards,
  BoardsUserRelation,
  KanBan,
  History,
  Cards,
} = require("./mysql");

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

  async getUserSharedBoards(userId) {
    const data = await BoardsUserRelation.where({
      user_Id: userId,
    }).fetchAll({
      withRelated: ["user", "board"],
    });
    return data;
    // .filter(async data => {
    //   const list = await data.fetch();

    //   console.log(list.board.get("owner"));
    //   // board.get("owner") !== userId
    //   return true;
    // });
  },

  createBoard: async ({ name, owner }) => {
    const board = { name, owner };
    const data = await Boards.forge(board).save();
    const relationData = await new BoardsUserRelation({
      board_id: data.get("ID"),
      user_Id: owner,
    }).save();
    return {
      ID: data.get("ID"),
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

  async getBoard(id) {
    const data = await Boards.where({
      ID: id,
    }).fetch({
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

  deleteBoard: async id => {
    const result = await new Boards()
      .where({
        ID: id,
      })
      .destroy();
    await new BoardsUserRelation()
      .where({
        board_id: id,
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
    })
      .orderBy("sort", "asc")
      .fetchAll({
        withRelated: ["cards"],
      });

    return data;
  },

  async resortKanBan(creator, { updateData, updateList }) {
    // eslint-disable-next-line guard-for-in
    for (const i in updateList) {
      // eslint-disable-next-line no-await-in-loop
      await KanBan.where({
        ID: updateList[i].id,
      }).save(
        {
          sort: updateList[i].sort,
        },
        {
          method: "update",
        },
      );
    }
  },

  // cards
  async getCard(cardId) {
    const data = await Cards.where({
      ID: cardId,
    }).fetch();
    return data;
  },

  async deleteCard(cardId) {
    const data = await Cards.where({
      ID: cardId,
    }).save(
      {
        status: 2,
      },
      {
        method: "update",
      },
    );
    return data;
  },

  async finishCard(cardId, boardId) {
    const data = await Cards.where({
      ID: cardId,
    }).save(
      {
        status: 1,
      },
      {
        method: "update",
      },
    );
    await new History({
      board_id: boardId,
      card_id: cardId,
      type: 1,
      from_text: "未完成",
      to_text: "已完成",
    }).save();
    return data;
  },

  createCard: async (
    creator,
    { kanbanId = 0, name = "", content = "", type = 0, color = 0, boardId = 0 },
  ) => {
    const data = await new Cards({
      kanban_id: kanbanId,
      name,
      content,
      type,
      color,
      creator,
    }).save();
    await new History({
      board_id: boardId,
      card_id: data.get("ID"),
      type: 2,
      from_text: "新增",
      to_text: "",
    }).save();
    return data;
  },

  async moveCard(cardId, toBoardId) {
    const data = await Cards.where({
      ID: cardId,
    }).save(
      {
        kanban_id: toBoardId,
      },
      {
        method: "update",
      },
    );

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

  // history
  async getBoardHistory(boardId) {
    const data = await History.where({
      board_id: boardId,
    })
      .orderBy("created_at", "desc")
      .fetchAll({
        pageSize: 15,
        page: 1,
        withRelated: ["card"],
      });
    return data;
  },

  async getBoardHistoryGraph(boardId) {
    const last30 = new Date();
    last30.setDate(last30.getDate() - 30);
    const all = await new History()
      .query(query => {
        query
          .select("updated_at")
          .count("* as count")
          .whereBetween("updated_at", [last30, new Date()])
          .groupByRaw("updated_at");
      })
      .where({
        board_id: boardId,
        // type: 2,
      })
      .fetchAll({
        // columns: ["updated_at"],
      });

    const finish = await new History()
      .query(query => {
        query
          .select("updated_at")
          .count("* as count")
          .whereBetween("updated_at", [last30, new Date()])
          .groupBy("updated_at");
      })
      .where({
        board_id: boardId,
        type: 1,
      })
      .fetchAll({
        // columns: ["updated_at"],
      });

    return {
      all,
      finish,
    };
  },
};

module.exports = Model;
