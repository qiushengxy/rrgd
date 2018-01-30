var db_topics = require('../db/topics.js');

module.exports = async (ctx, next) => {
  // 通过 Koa 中间件进行登录态校验之后
  // 登录信息会被存储到 ctx.state.$wxInfo
  // 具体查看：
  if (ctx.state.$wxInfo.loginState === 1) {
    ctx.state.data = await db_topics.getTopics();
  } else {
    ctx.state.code = -1
  }
}
