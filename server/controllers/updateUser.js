var db_users = require('../db/users.js');

module.exports = async ctx => {
  var userInfo = ctx.request.body;
  await db_users.updateUser(userInfo);
  
}
