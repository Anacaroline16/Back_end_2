import msql from "mysql2/promise";

const pool = msql.createPool ({
    host: 'localhost',
    user: 'root',
    password:'Suporte99',
    database:'cadastroDados'
});
export default pool;
