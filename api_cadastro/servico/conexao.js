import msql from "mysql2/promise";

const pool = msql.createPool ({
    host: 'localhost',
    user: 'root',
    password:'Cordeiropereira@123',
    database:'cadastrodados'
});
export default pool;
