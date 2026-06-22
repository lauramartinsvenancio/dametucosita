import { NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    try {
        const { username, password } = await req.json();
        if (!username || !password) return NextResponse.json({ error: 'Preencha usuário e senha.' }, { status: 400 });

        const pool = await getDbConnection();
        const hashed = await bcrypt.hash(password, 10);

        try {
            await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashed]);
            return NextResponse.json({ message: 'Agente recrutado!' });
        } catch (e) {
            return NextResponse.json({ error: 'Esse codinome já está em uso.' }, { status: 400 });
        }
    } catch (error) {
        if (error.message === 'MYSQL_OFF') {
            return NextResponse.json({ error: 'MySQL não está rodando. Inicie o XAMPP primeiro.' }, { status: 500 });
        }
        return NextResponse.json({ error: 'Erro interno: ' + error.message }, { status: 500 });
    }
}
