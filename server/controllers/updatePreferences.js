var db_preferences = require('../db/preferences.js');

module.exports = async ctx => {
  var preferences = ctx.request.body;
  await db_preferences.updatePreferences(preferences);

}
