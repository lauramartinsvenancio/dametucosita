import mysql from 'mysql2/promise';

let pool;

export async function getDbConnection() {
    if (!pool) {
        // Primeiro conecta sem banco para criar se não existir
        const tempConn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: ''
        });
        
        await tempConn.query('CREATE DATABASE IF NOT EXISTS alien_db');
        await tempConn.end();

        pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'alien_db',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        // Criação das tabelas
        const conn = await pool.getConnection();
        await conn.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            )
        `);
        
        await conn.query(`
            CREATE TABLE IF NOT EXISTS tickets (
                id INT AUTO_INCREMENT PRIMARY KEY,
                userId INT,
                title VARCHAR(255) NOT NULL,
                status VARCHAR(50) DEFAULT 'ABERTO',
                FOREIGN KEY (userId) REFERENCES users(id)
            )
        `);

        await conn.query(`
            CREATE TABLE IF NOT EXISTS messages (
                id INT AUTO_INCREMENT PRIMARY KEY,
                ticketId INT,
                sender VARCHAR(50) NOT NULL,
                content TEXT NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (ticketId) REFERENCES tickets(id)
            )
        `);
        conn.release();
    }
    return pool;
}
