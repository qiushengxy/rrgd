var mysql = require('mysql');

var config = {
  host: 'localhost',
  user: 'root',
  password: 'wxd45bb002101f3b72',
  port: '3306',
  database: 'rrgd',
};

var db_topics = {

  getTopics: function () {
    return new Promise((resolve, reject) => {
      var connection = mysql.createConnection(config);
      connection.connect();

      var select = 'SELECT id, subject, question, votes, creation, categories, images FROM topics';
      connection.query(select, function (err, result) {
        if (err) {
          console.log('[SELECT ERROR] - ', err.message);
          reject(err);
          return;
        }

        console.log('--------------------------SELECT----------------------------');
        console.log(result);
        console.log('------------------------------------------------------------\n\n');

        resolve(result);
        return;
      });
    });
  },

  getTopic: function (key) {
    return new Promise((resolve, reject) => {
      var connection = mysql.createConnection(config);
      connection.connect();

      var select = 'SELECT * FROM topics where id=' + key;
      connection.query(select, function (err, result) {
        if (err) {
          console.log('[SELECT ERROR] - ', err.message);
          reject(err);
          return;
        }

        console.log('--------------------------SELECT----------------------------');
        console.log(result);
        console.log('------------------------------------------------------------\n\n');

        resolve(result);
        return;
      });
    });
  }
}

module.exports = db_topics;