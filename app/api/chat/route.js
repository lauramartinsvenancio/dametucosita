import { NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'area51-secret-key';

function verifyToken(req) {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) return null;
    const token = authHeader.split(' ')[1];
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch {
        return null;
    }
}

export async function POST(req) {
    const user = verifyToken(req);
    if (!user) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });

    try {
        const { message } = await req.json();
        const pool = await getDbConnection();

        // Salvar mensagem do usuário
        await pool.query('INSERT INTO messages (sender, content) VALUES (?, ?)', ['user', message]);

        // Lógica do Bot (Dame Tu Cosita)
        const text = message.toLowerCase();
        let botResponse = "Bip bop... Dame tu cosita ah ah! Eu só sei dançar, não entendi sua pergunta.";

        if (text.includes('planeta') || text.includes('onde')) {
            botResponse = "Vim do Planeta Reggaeton-99, onde a gravidade te obriga a requebrar.";
        } else if (text.includes('paz') || text.includes('quer') || text.includes('objetivo')) {
            botResponse = "Não vim em paz, vim no ritmo! Minha missão é espalhar meus passos de dança pelo universo.";
        } else if (text.includes('proteger') || text.includes('seguro')) {
            botResponse = "Para se proteger, basta ouvir sertanejo universitário. É a única fraqueza do meu molejo.";
        } else if (text.includes('visto') || text.includes('aparição')) {
            botResponse = "Fui visto ontem na Flórida roubando um rádio tocando El Chombo.";
        }

        // Salvar resposta do bot
        await pool.query('INSERT INTO messages (sender, content) VALUES (?, ?)', ['bot', botResponse]);

        return NextResponse.json({ botResponse });
    } catch (error) {
        return NextResponse.json({ error: 'Erro interno no comunicador.' }, { status: 500 });
    }
}

export async function GET(req) {
    const user = verifyToken(req);
    if (!user) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });

    try {
        const pool = await getDbConnection();
        const [rows] = await pool.query('SELECT sender, content FROM messages ORDER BY createdAt ASC LIMIT 50');
        return NextResponse.json(rows);
    } catch (e) {
        return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
    }
}
