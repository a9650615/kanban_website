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

  router.get("/Register", async ctx => {
    // You can `await` or `return` the ctx.render function call
    await ctx.render({
      screen: "Register",
    });
  });

  router.get("/Board", async ctx => {
    if (ctx.cookies.get("userId") === undefined) {
      ctx.redirect("/");
    } else {
      // You can `await` or `return` the ctx.render function call
      await ctx.render({
        screen: "Board",
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
  router.put("/api/board/:id", async ctx => {
    const returnData = await Model.updateBoard(ctx.params.id, ctx.request.body);
    ctx.body = returnData;
  });

  return router;
};
