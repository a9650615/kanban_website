const { User } = require("./mysql");

class Model {
  // eslint-disable-next-line class-methods-use-this
  async createUser({ acc, ps, name }) {
    const user = { acc, ps, name };
    const hasOne = await User.where({ acc }).count();
    if (hasOne > 0) {
      return { error: "帳號已有人使用" };
    }

    const data = await User.forge(user).save();
    return { acc: data.get("acc"), id: data.get("id") };
  }
}

module.exports = new Model();
