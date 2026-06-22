import { NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'area51-secret-key';

export async function POST(req) {
    try {
        const { username, password } = await req.json();
        if (!username || !password) return NextResponse.json({ error: 'Preencha usuário e senha.' }, { status: 400 });

        const pool = await getDbConnection();
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        const user = rows[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json({ error: 'Usuário ou senha incorretos.' }, { status: 401 });
        }

        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '2h' });
        return NextResponse.json({ token, username: user.username });
    } catch (error) {
        if (error.message === 'MYSQL_OFF') {
            return NextResponse.json({ error: 'MySQL não está rodando. Inicie o XAMPP primeiro.' }, { status: 500 });
        }
        return NextResponse.json({ error: 'Erro interno: ' + error.message }, { status: 500 });
    }
}
