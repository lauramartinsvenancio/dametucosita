import { NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'area51-secret-key';

export async function POST(req) {
    try {
        const { username, password } = await req.json();
        const pool = await getDbConnection();
        
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        const user = rows[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 401 });
        }

        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
        return NextResponse.json({ token, username: user.username });
    } catch (error) {
        return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
    }
}
