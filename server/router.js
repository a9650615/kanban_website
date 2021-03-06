const Router = require("koa-router");
const Model = require("./model");
// const Boom = require("boom");

module.exports = async function createRouter() {
  const router = new Router();

  // View endpoints
  router.get("/", async ctx => {
    if (ctx.cookies.get("userId") !== undefined) {
      ctx.redirect("/Home");
    } else {
      await ctx.render({
        screen: "index",
      });
    }
    // You can `await` or `return` the ctx.render function call
  });

  router.get("/home", async ctx => {
    if (ctx.cookies.get("userId") === undefined) {
      ctx.redirect("/");
    } else {
      // You can `await` or `return` the ctx.render function call
      await ctx.render({
        screen: "Home",
      });
    }
  });

  router.get("/login", async ctx => {
    // You can `await` or `return` the ctx.render function call
    await ctx.render({
      screen: "Login",
    });
  });

  router.get("/logout", async ctx => {
    ctx.cookies.set("userId", null);
    ctx.cookies.set("userName", null);
    // You can `await` or `return` the ctx.render function call
    await ctx.render({
      screen: "Logout",
    });
  });

  router.get("/Register", async ctx => {
    // You can `await` or `return` the ctx.render function call
    await ctx.render({
      screen: "Register",
    });
  });

  router.get("/Board/:id", async ctx => {
    if (ctx.cookies.get("userId") === undefined) {
      ctx.redirect("/");
    } else {
      // You can `await` or `return` the ctx.render function call
      await ctx.render({
        screen: "Board",
        props: {
          id: ctx.params.id,
        },
      });
    }
  });

  // router.get("/comments", async ctx => {
  //   const comments = ctx.session.comments || [];
  //   return ctx.render({
  //     screen: "Comments",
  //     props: { comments },
  //   });
  // });

  // API endpoints
  router.get("/api/user", async ctx => {
    const returnData = await Model.getUsers();
    ctx.body = returnData;
  });
  router.get("/api/user/:id/board", async ctx => {
    const returnData = await Model.getUserSharedBoards(ctx.params.id);
    ctx.body = returnData;
  });

  router.post("/api/user", async ctx => {
    const postData = ctx.request.body;
    const returnData = await Model.createUser(postData);
    ctx.body = returnData;
  });
  router.post("/api/user/login", async ctx => {
    const postData = ctx.request.body;
    const returnData = await Model.getUser(postData);
    ctx.body = returnData;
  });

  // boards
  router.post("/api/board", async ctx => {
    const owner = ctx.cookies.get("userId");
    const postData = { ...ctx.request.body, owner };
    const returnData = await Model.createBoard(postData);
    ctx.body = returnData;
  });
  router.get("/api/board", async ctx => {
    const returnData = await Model.getBoards();
    ctx.body = returnData;
  });
  router.get("/api/board/:id", async ctx => {
    const returnData = await Model.getBoards(ctx.params.id);
    ctx.body = returnData;
  });
  router.get("/api/board/id/:id", async ctx => {
    const returnData = await Model.getBoard(ctx.params.id);
    ctx.body = returnData;
  });
  router.put("/api/board/:id", async ctx => {
    const returnData = await Model.updateBoard(ctx.params.id, ctx.request.body);
    ctx.body = returnData;
  });
  router.delete("/api/board/:id", async ctx => {
    await Model.deleteBoard(ctx.params.id);
    ctx.body = { result: true };
  });
  router.get("/api/board/user/:boardId", async ctx => {
    const returnData = await Model.getUserOfBoard(ctx.params.boardId);
    ctx.body = returnData;
  });
  router.post("/api/board/user/:boardId", async ctx => {
    const returnData = await Model.addUserOfBoard(
      ctx.params.boardId,
      ctx.request.body.userId,
    );
    ctx.body = returnData;
  });
  router.delete("/api/board/user/:boardId/:userId", async ctx => {
    await Model.removeUserOfBoard(ctx.params.boardId, ctx.params.userId);
    ctx.body = { result: true };
  });

  // kanban
  router.post("/api/kanban/", async ctx => {
    const creator = ctx.cookies.get("userId");
    const returnData = await Model.createKanBan(creator, ctx.request.body);
    ctx.body = returnData;
  });

  router.put("/api/kanban/sort", async ctx => {
    const creator = ctx.cookies.get("userId");
    const returnData = await Model.resortKanBan(creator, ctx.request.body);
    ctx.body = returnData;
  });

  router.get("/api/kanban/:boardId", async ctx => {
    const boardId = ctx.params.boardId;
    const returnData = await Model.getKanbans(boardId);
    ctx.body = returnData;
  });

  // cards
  router.get("/api/cards/:id/", async ctx => {
    const returnData = await Model.getCard(ctx.params.id);
    ctx.body = returnData;
  });

  router.delete("/api/cards/:id/:boardId", async ctx => {
    const returnData = await Model.deleteCard(
      ctx.params.id,
      ctx.params.boardId,
    );
    ctx.body = returnData;
  });

  router.put("/api/cards/:id/finish", async ctx => {
    const returnData = await Model.finishCard(
      ctx.params.id,
      ctx.request.body.boardId,
    );
    ctx.body = returnData;
  });

  router.post("/api/cards/", async ctx => {
    const creator = ctx.cookies.get("userId");
    const returnData = await Model.createCard(creator, ctx.request.body);
    ctx.body = returnData;
  });

  router.put("/api/cards/:id/kanban", async ctx => {
    const returnData = await Model.moveCard(ctx.params.id, ctx.request.body.to);
    ctx.body = returnData;
  });

  // history
  router.get("/api/history/board/:boardId", async ctx => {
    const returnData = await Model.getBoardHistory(ctx.params.boardId);
    ctx.body = returnData;
  });

  router.get("/api/history/graph/:boardId", async ctx => {
    const returnData = await Model.getBoardHistoryGraph(ctx.params.boardId);
    ctx.body = returnData;
  });

  return router;
};
