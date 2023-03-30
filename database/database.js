const mysql = require('mysql');

// Crea una conexión con la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tasks'
});

// Conecta con la base de datos
db.connect((err) => {
  if (err) {
    console.log('Error al conectarse a la base de datos: ' + err.message);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

module.exports = db;