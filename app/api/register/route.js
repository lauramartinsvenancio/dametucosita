import { NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    try {
        const { username, password } = await req.json();
        if (!username || !password) return NextResponse.json({ error: 'Credenciais ausentes.' }, { status: 400 });

        const pool = await getDbConnection();
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
            return NextResponse.json({ message: 'Agente recrutado com sucesso!' });
        } catch (e) {
            return NextResponse.json({ error: 'Usuário já existe.' }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
    }
}
