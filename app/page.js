"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, AlertTriangle, Radio, MapPin, Lock, LogIn, UserPlus } from "lucide-react";

export default function Home() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const doAuth = async (type) => {
    if (!user || !pass) return setMsg("Erro: Preencha todos os campos.");
    setLoading(true); setMsg("");
    try {
      const r = await fetch(`/api/${type}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: user, password: pass }) });
      const d = await r.json();
      if (r.ok) {
        if (type === "login") {
          localStorage.setItem("token", d.token);
          window.location.href = "/dashboard";
          return;
        }
        setMsg("Sucesso: Registrado com sucesso! Agora clique em Entrar.");
      } else setMsg("Erro: " + d.error);
    } catch { setMsg("Erro: Sem conexão. O servidor está rodando?"); }
    setLoading(false);
  };

  return (
    <main style={{ background: "#020502", color: "#e2e8f0", minHeight: "100vh" }}>

      
      <nav style={{ position: "fixed", top: 0, width: "100%", zIndex: 50, background: "rgba(2,5,2,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between h-14">
          <span className="font-bold text-[#39ff14] text-sm tracking-[2px]">DAME TU COSITA</span>
          <div className="hidden md:flex items-center gap-6 text-[13px] text-gray-400">
            <a href="#fenomeno" className="hover:text-white transition">O Fenômeno</a>
            <a href="#avistamentos" className="hover:text-white transition">Avistamentos</a>
            <a href="#timeline" className="hover:text-white transition">Cronologia</a>
            <a href="#acesso" className="px-4 py-1.5 border border-[#39ff14]/30 text-[#39ff14] rounded-full font-bold hover:bg-[#39ff14]/10 transition">ÁREA 51</a>
          </div>
        </div>
      </nav>

      
      <div className="section" style={{ paddingTop: 120, textAlign: "center" }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute -inset-6 bg-[#39ff14]/10 rounded-full blur-[40px]" />
              <img src="https://media.tenor.com/XgGokgOlMbUAAAAC/dame-tu-cosita-alien.gif" alt="Dame Tu Cosita Dançando" className="relative w-48 md:w-56 rounded-2xl border border-white/5" />
            </div>
          </div>
          <span className="inline-block text-[11px] font-bold text-[#39ff14] tracking-[3px] border border-[#39ff14]/20 px-4 py-1 rounded-full mb-6">ALERTA GLOBAL — JUNHO 2026</span>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4 text-white">
            A ameaça que <span className="text-[#39ff14]">dança</span> chegou à Terra
          </h1>
          <p className="text-[15px] text-gray-400 max-w-lg mx-auto mb-8 leading-relaxed">
            A entidade <strong className="text-white">Dame Tu Cosita</strong> foi avistada em 14 países nos últimos 6 meses. O governo nega. Nós temos provas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#fenomeno" className="px-6 py-3 bg-[#39ff14] text-black font-bold rounded-lg text-sm hover:bg-[#32e011] transition">Ver Dossiê</a>
            <a href="#acesso" className="px-6 py-3 border border-white/10 text-white rounded-lg text-sm hover:bg-white/5 transition">Área Restrita</a>
          </div>
        </div>
      </div>

      
      <div id="fenomeno" className="section" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <p className="text-[#39ff14] text-[11px] font-bold tracking-[3px] mb-2">DOSSIÊ #001</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">Entendendo o Fenômeno</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Eye size={20} />, t: "Quem é ele?", d: "Entidade bípede de 1,20m com pele verde bioluminescente e olhos ovais negros. Identificado em 2018 quando um arquivo classificado vazou na internet como vídeo viral." },
              { icon: <AlertTriangle size={20} />, t: "Qual a ameaça?", d: "Quem ouve sua frequência vocal por mais de 8 segundos sente necessidade incontrolável de dançar. Há registros de pessoas dançando por 72 horas sem parar." },
              { icon: <Radio size={20} />, t: "O que ele quer?", d: "Alimenta-se de energia cinética gerada pela dança humana. Quanto mais pessoas dançam ao redor dele, mais forte ele fica. Não vieram em paz — vieram em ritmo." },
            ].map((c, i) => (
              <div key={i} className="card p-7 hover:-translate-y-1 transition-transform">
                <div className="w-10 h-10 bg-[#39ff14]/10 rounded-xl flex items-center justify-center text-[#39ff14] mb-4">{c.icon}</div>
                <h3 className="text-[15px] font-bold text-white mb-2">{c.t}</h3>
                <p className="text-[13px] text-gray-400 leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <div id="avistamentos" className="section section-dark" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <p className="text-[#39ff14] text-[11px] font-bold tracking-[3px] mb-2">RELATÓRIOS CONFIRMADOS</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">Avistamentos Recentes</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { img: "/images/city-sighting.png", loc: "Varginha, Brasil", dt: "Jan 2026", d: "Moradores avistaram a entidade dançando ao lado de um poste de luz que derreteu minutos depois do contato." },
              { img: "https://pbs.twimg.com/media/GGgiFuKWkAAvtgW.jpg", loc: "Antioquia, Colômbia", dt: "Fev 2024", d: "Piloto captura nave em pleno voo. Como disse a testemunha: 'não tem jeito rapaziada, eles tão de olho em nois'." },
              { img: "/images/crop-circle.png", loc: "Wiltshire, UK", dt: "Mai 2026", d: "Trigo amassado com padrão geométrico. Visto de cima, as marcas formavam a frase 'AH AH'." },
            ].map((s, i) => (
              <div key={i} className="card overflow-hidden hover:-translate-y-1 transition-transform flex flex-col">
                <div className="h-48 bg-black overflow-hidden relative flex items-center justify-center">
                  <img src={s.img} alt={s.loc} className="w-full h-full object-contain opacity-90" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex items-center gap-1.5 text-[13px] font-bold text-white">
                      <MapPin size={14} className="text-[#39ff14]" />{s.loc}
                    </span>
                    <span className="text-[10px] bg-[#39ff14]/10 text-[#39ff14] px-2 py-0.5 rounded-full font-bold">{s.dt}</span>
                  </div>
                  <p className="text-[13px] text-gray-400 leading-relaxed flex-1">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <div id="timeline" className="section" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-[700px] mx-auto px-6">
          <p className="text-[#39ff14] text-[11px] font-bold tracking-[3px] mb-2">CRONOLOGIA</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-12">A História da Invasão</h2>

          <div className="border-l-2 border-[#39ff14]/20 pl-6 flex flex-col gap-10">
            {[
              { y: "1947", t: "Incidente de Roswell", d: "Destroços recuperados no Novo México. Sons rítmicos relatados. Governo classifica tudo como 'balão meteorológico'." },
              { y: "1996", t: "O Caso de Varginha", d: "Criatura verde avistada em Minas Gerais. Militares isolam a área e negam tudo." },
              { y: "2018", t: "O Vídeo Viral", d: "Arquivo secreto vaza na internet como vídeo musical. Bilhões de views. O mundo ri, sem saber da verdade." },
              { y: "2024", t: "Sinais de Rádio", d: "Transmissão de 120 BPM captada vinda de Alpha Centauri. Cientistas não conseguem explicar." },
              { y: "2026", t: "A Invasão Começa", d: "Avistamentos em 14 países. ONU convoca sessão de emergência. A entidade está mais forte." },
            ].map((e, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[32px] top-1 w-3.5 h-3.5 rounded-full border-2 border-[#39ff14] bg-[#020502]" />
                <p className="text-[#39ff14] text-[11px] font-bold tracking-[2px] mb-1">{e.y}</p>
                <h3 className="text-[16px] font-bold text-white mb-2">{e.t}</h3>
                <p className="text-[13px] text-gray-400 leading-relaxed">{e.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <div id="acesso" className="section section-dark" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-[440px] mx-auto px-6">
          <div className="card p-8">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-[#39ff14]/10 rounded-full flex items-center justify-center">
                <Lock size={22} className="text-[#39ff14]" />
              </div>
            </div>
            <h3 className="text-[20px] font-bold text-center text-white mb-2">Acesse a Área 51</h3>
            <p className="text-center text-gray-400 text-[12px] mb-6">Primeiro registre-se, depois faça login para acessar.</p>

            {msg && <p className={`text-center text-[13px] px-4 py-2.5 rounded-lg mb-6 font-medium ${msg.startsWith('Erro') ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-[#39ff14]/10 text-[#39ff14] border border-[#39ff14]/20'}`}>{msg}</p>}

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1.5">CODINOME</label>
                <input type="text" value={user} onChange={e => setUser(e.target.value)} placeholder="Ex: Mulder"
                  className="w-full bg-[#020502] border border-white/10 focus:border-[#39ff14]/50 rounded-lg px-3.5 py-2.5 text-[14px] text-white outline-none transition" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1.5">SENHA</label>
                <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••"
                  className="w-full bg-[#020502] border border-white/10 focus:border-[#39ff14]/50 rounded-lg px-3.5 py-2.5 text-[14px] text-white outline-none transition" />
              </div>
              <div className="flex gap-3 mt-2">
                <button onClick={() => doAuth("register")} disabled={loading}
                  className="flex-1 py-2.5 border border-white/10 bg-transparent text-gray-300 hover:text-white font-bold rounded-lg text-[13px] cursor-pointer flex items-center justify-center gap-2 transition hover:bg-white/5">
                  <UserPlus size={16} /> Registrar
                </button>
                <button onClick={() => doAuth("login")} disabled={loading}
                  className="flex-1 py-2.5 bg-[#39ff14] text-black font-bold rounded-lg text-[13px] cursor-pointer flex items-center justify-center gap-2 transition hover:bg-[#32e011]">
                  <LogIn size={16} /> Entrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: "24px 0", textAlign: "center", color: "#555", fontSize: 12 }}>
        Feito por EstamosDeOlhoNaLilian da Silva.
      </footer>
    </main>
  );
}
