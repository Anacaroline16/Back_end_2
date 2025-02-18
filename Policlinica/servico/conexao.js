// Conexão com o banco
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'Cordeiropereira@123',
    database : 'clinica'
});
const conexao = await pool.getConnection();
export default pool;