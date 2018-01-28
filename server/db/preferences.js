var mysql = require('mysql');

var config = {
  host: 'localhost',
  user: 'root',
  password: 'wxd45bb002101f3b72',
  port: '3306',
  database: 'rrgd',
};

var db_preferences = {
  
  addOrGetPreferences: function (userInfo) {
    return new Promise((resolve, reject) => {
      var connection = mysql.createConnection(config);
      connection.connect();

      var select = 'SELECT * FROM preferences where wx_open_id=\'' + userInfo.openId + '\'';
      connection.query(select, function (err, result) {
        if (err) {
          console.log('[SELECT ERROR] - ', err.message);
          reject(err);
          return;
        }

        console.log('--------------------------SELECT----------------------------');
        console.log(result);
        console.log('------------------------------------------------------------\n\n');

        if (result.length === 0) {
          // New User, add this user's preferences to table
          var preferences = {
            openId: userInfo.openId,
            allowPush: false,
            local: false,
            ent: false,
            sport: false,
            economy: false,
            tech: false,
            history: false,
            house: false
          }
          var insert = 'INSERT INTO preferences (wx_open_id) VALUES (\'' + userInfo.openId + '\');';

          connection.query(insert, function (err, result) {
            if (err) {
              console.log('[INSERT ERROR] - ', err.message);
              reject(err);
              return;
            }
            console.log('--------------------------INSERT----------------------------');
            console.log(result);
            console.log('------------------------------------------------------------\n\n');
            connection.end();
            resolve(preferences);
            return;
          });
        } else {
          // Existing User
          var db_preferences = result[0];
          var preferences = {
            openId: db_preferences.wx_open_id,
            allowPush: db_preferences.allow_push,
            local: db_preferences.local,
            ent: db_preferences.ent,
            sport: db_preferences.sport,
            economy: db_preferences.economy,
            tech: db_preferences.tech,
            history: db_preferences.history,
            house: db_preferences.house
          };
          resolve(preferences);
        }
      });
    });
  },

  updatePreferences: function (preferences) {
    return new Promise((resolve, reject) => {
      var connection = mysql.createConnection(config);
      connection.connect();
      var update = 'UPDATE preferences SET ' +
        'allow_push=' + preferences.allowPush + ', ' +
        'local=\'' + preferences.local + '\', ' +
        'ent=\'' + preferences.ent + '\', ' +
        'sport=\'' + preferences.sport + '\', ' +
        'economy=' + preferences.economy + ', ' +
        'tech=' + preferences.tech + ', ' +
        'history=' + preferences.history + ', ' +
        'house=' + preferences.house +
        ' where wx_open_id=\'' + preferences.openId + '\'';
      connection.query(update, function (err, result) {
        if (err) {
          console.log('[UPDATE ERROR] - ', err.message);
          reject(err);
          return;
        }
        console.log('--------------------------UPDATE----------------------------');
        console.log(result);
        console.log('------------------------------------------------------------\n\n');
        resolve(result);
        connection.end();
      });
    });
  }

}

module.exports = db_preferences;