import mysql from 'mysql2/promise';

let pool;

export async function getDbConnection() {
    if (!pool) {
        try {
            const tempConn = await mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: ''
            });
            await tempConn.query('CREATE DATABASE IF NOT EXISTS alien_db');
            await tempConn.end();
        } catch (err) {
            throw new Error('MYSQL_OFF');
        }

        pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'alien_db',
            waitForConnections: true,
            connectionLimit: 10
        });

        const conn = await pool.getConnection();
        await conn.query(`CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        )`);
        await conn.query(`CREATE TABLE IF NOT EXISTS messages (
            id INT AUTO_INCREMENT PRIMARY KEY,
            sender VARCHAR(50) NOT NULL,
            content TEXT NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);
        conn.release();
    }
    return pool;
}
