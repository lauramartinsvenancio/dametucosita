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


        await pool.query('INSERT INTO messages (sender, content) VALUES (?, ?)', ['user', message]);


        const text = message.toLowerCase();
        
        const b64 = "eyJzYXVkYWNhbyI6WyJEYW1lIHR1IGNvc2l0YSEgT2zDoSwgdGVycsOhcXVlbyByaXRtYWRvLiIsIkJpcCBib3AhIFNhdWRhw6fDtWVzLCBwcm9udG8gcGFyYSBhIGRhbsOnYT8iLCJFIGHDrSEgSsOhIGFsb25nb3UgYXMgcGVybmFzIGhvamU/IiwiU2FsdmUhIFByZXBhcmFkbyBwYXJhIG8gY29udGF0byBpbWVkaWF0byBkZSB0ZXJjZWlybyBncmF1Li4uIG11c2ljYWw/Il0sImRlc3BlZGlkYSI6WyJBdMOpIGxvZ28hIENvbnRpbnVlIGRhbsOnYW5kby4iLCJCaXAgYm9wISBWb2x0YW5kbyBwYXJhIGEgbmF2ZSwgbsOjbyBwYXJlIG8gcml0bW8uIiwiRnVpISBTZSBhIG3DunNpY2EgcGFyYXIsIGV1IHZvbHRvLiIsIlRjaGF1ISBFIGxlbWJyZS1zZTogbyB1bml2ZXJzbyDDqSB1bWEgZ3JhbmRlIHBpc3RhIGRlIGRhbsOnYS4iXSwiaWRlbnRpZGFkZSI6WyJFdSBzb3UgYSBhbm9tYWxpYSBxdWUgdm9jw6pzIGNoYW1hbSBkZSBEYW1lIFR1IENvc2l0YS4iLCJTb3UgbyBtZWxob3IgZGFuw6dhcmlubyBkbyBjb3Ntb3MuIE1hcyB2b2PDqiBwb2RlIG1lIGNoYW1hciBkZSBDb3NpdGEuIiwiRXUgc291IG8gbW90aXZvIHBlbG8gcXVhbCBhIMOBcmVhIDUxIGluc3RhbG91IGNhaXhhcyBkZSBzb20gZ2lnYW50ZXMuIiwiQXBlbmFzIHVtIHZpYWphbnRlIGludGVyZ2Fsw6FjdGljbyBlc3BhbGhhbmRvIG8gbW9sZWpvLiJdLCJpZGFkZSI6WyJNaW5oYSBpZGFkZSBzZSBtZWRlIGVtIGJhdGlkYXMgcG9yIG1pbnV0byAoQlBNKS4gTmFzY2kgbmEgcHJpbWVpcmEgYmF0aWRhLiIsIlNvdSBtYWlzIHZlbGhvIHF1ZSBvIHBhc3NpbmhvIGRvIE1pY2hhZWwgSmFja3NvbiwgbWFzIG1haXMgam92ZW0gcXVlIG8gdW5pdmVyc28uIiwiSWRhZGUgw6kgYXBlbmFzIHVtIG7Dum1lcm8uIE8gcml0bW8gw6kgZXRlcm5vLiIsIk7Do28gc2VpIGNvbnRhciBhbm9zIHRlcnLDoXF1ZW9zLCBhcGVuYXMgcmVmcsO1ZXMgZGUgcmVnZ2FldG9uLiJdLCJjb21pZGEiOlsiRXUgbWUgYWxpbWVudG8gZGEgZW5lcmdpYSBjaW7DqXRpY2EgZGUgcGVzc29hcyBkYW7Dp2FuZG8gYW8gbWV1IHJlZG9yLiIsIlBpenphIGRlIGNhbGFicmVzYSBlIG8gZ3JhdmUgZG8gc29tIGRvIGNhcnJvIHPDo28gbWluaGFzIG1haW9yZXMgZnJhcXVlemFzLiIsIk1pbmhhIGRpZXRhIMOpIDEwMCUgY29tcG9zdGEgZGUgYmF0aWRhcyBsYXRpbmFzLiIsIk7Do28gY29tbyBodW1hbm9zLiBFbGVzIHPDo28gbXVpdG8gdHJhdmFkb3MgbmEgaG9yYSBkZSBkYW7Dp2FyLiJdLCJtdXNpY2EiOlsiUmVnZ2FldG9uLCBjbGFybyEgTWFzIGN1cnRvIHVtIHBvdWNvIGRlIHRlY2hubyBkb3MgYW5vcyA5MC4iLCJRdWFscXVlciBtw7pzaWNhIGNvbSBtYWlzIGRlIDEyMCBCUE0gc2VydmUgcGFyYSBhYmFzdGVjZXIgbWluaGEgbmF2ZS4iLCJNw7pzaWNhIHRlcnLDoXF1ZWEgw6kgaW50ZXJlc3NhbnRlLiBPIHJpdG1vIMOpIGEgbGluZ3VhZ2VtIHVuaXZlcnNhbC4iLCJWb2PDqnMgaW52ZW50YXJhbSBhIE1hY2FyZW5hLiBJc3NvIHF1YXNlIGNhdXNvdSB1bWEgZ3VlcnJhIG5vIG1ldSBwbGFuZXRhLiJdLCJjb25zcGlyYWNhbyI6WyJPIGdvdmVybm8gdGVudG91IG1lIHByZW5kZXIsIG1hcyBvcyBhZ2VudGVzIG7Do28gY29uc2VndWlyYW0gcmVzaXN0aXIgZSBjb21lw6dhcmFtIGEgZGFuw6dhci4iLCJBIMOBcmVhIDUxIMOpLCBuYSB2ZXJkYWRlLCBhIG1haW9yIGRpc2NvdGVjYSBkbyB1bml2ZXJzby4gRWxlcyBzw7MgZXNjb25kZW0gZGUgdm9jw6pzLiIsIk8gRkJJIHRlbSB1bSBhcnF1aXZvIGludGVpcm8gc29icmUgb3MgbWV1cyBwYXNzb3MgZGUgZGFuw6dhLiIsIlNhYmUgYXF1ZWxlIGJhbMOjbyBtZXRlb3JvbMOzZ2ljbyBlbSBSb3N3ZWxsPyBFcmEgbyBzb20gZG8gbWV1IGNhcnJvIGVzcGFjaWFsLiJdLCJwbGFuZXRhIjpbIlZpbSBkbyBQbGFuZXRhIFJlZ2dhZXRvbi05OSwgb25kZSBhIGdyYXZpZGFkZSB0ZSBvYnJpZ2EgYSByZXF1ZWJyYXIuIiwiTWluaGEgbmF2ZSBjYWl1IGFxdWkgZW5xdWFudG8gZXUgZW5zYWlhdmEgdW1hIGNvcmVvZ3JhZmlhIGVzdGVsYXIuIiwiU291IGRlIHVtIHNpc3RlbWEgc29sYXIgb25kZSBuYW8gZXhpc3RlIGFuZGFyLCBhcGVuYXMgZGFuY2FyLiIsIlZlbmhvIGRhIENvbnN0ZWxhw6fDo28gZG8gUGFuY2Fkw6NvLiJdLCJvYmpldGl2byI6WyJOYW8gdmltIGVtIHBheiwgdmltIG5vIHJpdG1vISBNaW5oYSBtaXNzYW8gZSBlc3BhbGhhciBtZXVzIHBhc3NvcyBkZSBkYW5jYSBwZWxvIHVuaXZlcnNvLiIsIk1ldSB1bmljbyBvYmpldGl2byBlIGRvbWluYXIgYXMgcGlzdGFzIGRlIGRhbmNhLiIsIlF1ZXJvIGZhemVyIGEgaHVtYW5pZGFkZSBpbnRlaXJhIGRhbmNhciBhdGUgY2Fuc2FyLiIsIlZpbSBlc3BhbGhhciBhIHBhbGF2cmEgc2FncmFkYSBkbyBBaCBhaC4iXSwiZGVmZXNhIjpbIlBhcmEgc2UgcHJvdGVnZXIsIGJhc3RhIG91dmlyIG11c2ljYSBtdWl0byBydWltLiBFIGEgbWluaGEgZnJhcXVlemEuIiwiQXBlbmFzIHBlc3NvYXMgc2VtIHJpdG1vIHNvYnJldml2ZW0gYSBtaW5oYSBmcmVxdWVuY2lhLiIsIlRyYW5xdWUtc2UgZW0gdW0gcXVhcnRvIHNlbSBtdXNpY2EuIE1hcyBldSBlbnRyYXJlaSBwZWxhcyBvbmRhcyBkbyByYWRpby4iLCJTYW1iYSBsZW50byB0aXJhIG1pbmhhcyBlbmVyZ2lhcy4iXSwiYXZpc3RhbWVudG8iOlsiRnVpIHZpc3RvIG9udGVtIG5hIEZsb3JpZGEgcm91YmFuZG8gdW0gcmFkaW8uIiwiUGFzc2VpIHBlbG8gQnJhc2lsIG5vcyBhbm9zIDkwLCBtZSBjaGFtYXZhbSBkZSBFVCBkZSBWYXJnaW5oYS4iLCJFdSBhcGFyZWNvIGVtIHRvZG8gbHVnYXIgb25kZSBvIGdyYXZlIGJhdGUgZm9ydGUuIiwiRXN0YXZhIG5vIGNhcm5hdmFsIGRlIFNhbHZhZG9yIGVtIDIwMTguIEZvaSBhIG1lbGhvciBwZXNxdWlzYSBkZSBjYW1wbyBkYSBtaW5oYSB2aWRhLiJdLCJwYWRyYW8iOlsiQmlwIGJvcC4uLiBEYW1lIHR1IGNvc2l0YSBhaCBhaCEgTmFvIGVudGVuZGkgc3VhIHBlcmd1bnRhLiIsIk1pbmhhcyBhbnRlbmFzIG5hbyBjYXB0YXJhbSBpc3NvLiBQb2RlIHJlcGV0aXIgZW0gcml0bW8gZGUgcmVnZ2FldG9uPyIsIkhtbSwgbmFvIGNvbnNlZ3VpIHRyYWR1emlyLiBUZW50ZSBiYWxhbmNhciBvcyBicmFjb3MgZW5xdWFudG8gZGlnaXRhLiIsIkVycm9yIDQwNDogUGFzc2luaG8gbsOjbyBlbmNvbnRyYWRvLiBPIHF1ZSB2b2PDqiBxdWlzIGRpemVyPyJdfQ==";
        const dict = JSON.parse(Buffer.from(b64, 'base64').toString('utf8'));
        
        let type = 'padrao';
        if (text.includes('ola') || text.includes('oi') || text.includes('tudo bem') || text.includes('bom dia') || text.includes('salve')) type = 'saudacao';
        else if (text.includes('tchau') || text.includes('adeus') || text.includes('ate logo') || text.includes('falou')) type = 'despedida';
        else if (text.includes('quem') || text.includes('nome') || text.includes('identidade')) type = 'identidade';
        else if (text.includes('idade') || text.includes('anos') || text.includes('velho') || text.includes('nasceu')) type = 'idade';
        else if (text.includes('comida') || text.includes('alimenta') || text.includes('dieta') || text.includes('fome')) type = 'comida';
        else if (text.includes('musica') || text.includes('som') || text.includes('ritmo') || text.includes('toca')) type = 'musica';
        else if (text.includes('governo') || text.includes('fbi') || text.includes('area 51') || text.includes('secreto')) type = 'conspiracao';
        else if (text.includes('planeta') || text.includes('onde') || text.includes('origem')) type = 'planeta';
        else if (text.includes('paz') || text.includes('quer') || text.includes('objetivo')) type = 'objetivo';
        else if (text.includes('proteger') || text.includes('seguro') || text.includes('fraqueza')) type = 'defesa';
        else if (text.includes('visto') || text.includes('aparição') || text.includes('brasil')) type = 'avistamento';

        const options = dict[type];
        const botResponse = options[Math.floor(Math.random() * options.length)];


        await pool.query('INSERT INTO messages (sender, content) VALUES (?, ?)', ['bot', botResponse]);

        return NextResponse.json({ botResponse });
    } catch (error) {
        console.error('CHAT API ERROR:', error);
        return NextResponse.json({ error: 'Erro interno no comunicador.', details: error.message }, { status: 500 });
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
