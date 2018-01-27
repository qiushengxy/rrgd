var mysql = require('mysql');

var config = {
  host: 'localhost',
  user: 'root',
  password: 'wxd45bb002101f3b72',
  port: '3306',
  database: 'rrgd',
};

var db_users = {
    getAllUsers: function() {
      var connection = mysql.createConnection(config);
      connection.connect();
      var sql = 'SELECT * FROM users';
      //查
      connection.query(sql, function (err, result) {
        if (err) {
          console.log('[SELECT ERROR] - ', err.message);
          return;
        }

        console.log('--------------------------SELECT----------------------------');
        console.log(result);
        console.log('------------------------------------------------------------\n\n');
      });
      connection.end();
    },

    addOrUpdateUser: function (userInfo) {
      return new Promise((resolve, reject) => {
      var connection = mysql.createConnection(config);
      connection.connect();

      var select = 'SELECT * FROM users where wx_open_id=\'' + userInfo.openId + '\'';
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
          // New User, add this user to table
          var insert = 'INSERT INTO users (wx_open_id, name, gender, country, state, city, last_login) VALUES (' +
            '\'' + userInfo.openId + '\',' +
            '\'' + userInfo.nickName + '\',' +
            userInfo.gender + ',' +
            '\'' + userInfo.country + '\',' +
            '\'' + userInfo.province + '\',' +
            '\'' + userInfo.city + '\',' +
            'NOW());';
          
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
            resolve(userInfo);
            return;
          });
        } else {
          // Existing User, update last_login timestamp
          var update = 'UPDATE users SET last_login = NOW() where wx_open_id=\'' + userInfo.openId + '\'';

          connection.query(update, function (err, result) {
            if (err) {
              console.log('[UPDATE ERROR] - ', err.message);
              reject(err);
              return;
            }
            console.log('--------------------------UPDATE----------------------------');
            console.log(result);
            console.log('------------------------------------------------------------\n\n');
            resolve(userInfo);
            connection.end();
          });
        }
      });
      });
    }

}

module.exports = db_users;