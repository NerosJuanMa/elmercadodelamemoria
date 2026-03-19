import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const user = mysql.createConnection({
  
  user: process.env.USUARIO,
  password: process.env.PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


export default user;

