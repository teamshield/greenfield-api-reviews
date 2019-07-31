const pg = require('pg');

var connection = mysql.createConnection({
  user:'root', 
  password:'ewew', 
  database:'chats'
})

connection.connect((err) => {
  if(err) {
      console.error('error connection: ' + err.stick);
      return;
  }

  console.log('connected as id ' + connection.threadId);
});

exports.connection = connection;