"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Radio, FileText, Send, LogOut, AlertTriangle, Zap, Users, Eye, X, MessageCircle, Home } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!localStorage.getItem("token")) { router.push("/"); return; }
    loadMessages();
  }, []);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const auth = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

  const loadMessages = async () => {
    try {
      const res = await fetch("/api/chat", { headers: auth() });
      if (res.ok) setMessages(await res.json());
      else if (res.status === 401) { localStorage.removeItem("token"); router.push("/"); }
    } catch {}
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const text = input.trim();
    setMessages(p => [...p, { sender: "user", content: text }]);
    setInput(""); setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json", ...auth() },
        body: JSON.stringify({ message: text }),
      });
      if (res.ok) {
        const d = await res.json();
        setTimeout(() => { setMessages(p => [...p, { sender: "bot", content: d.botResponse }]); setLoading(false); }, 500);
      }
    } catch { setLoading(false); }
  };

  const logout = () => { localStorage.removeItem("token"); router.push("/"); };
  const goHome = () => { router.push("/"); };

  const [activeTab, setActiveTab] = useState("Painel Central");


  const menuItems = [
    { icon: <FileText className="w-4 h-4" />, label: "Painel Central" },
    { icon: <Shield className="w-4 h-4" />, label: "Defesa" },
    { icon: <Radio className="w-4 h-4" />, label: "Interceptações" },
  ];

  return (
    <div className="min-h-screen bg-[#020502] text-white flex">

      
      <aside className="w-56 border-r border-white/5 bg-[#060d06] p-5 hidden lg:flex flex-col shrink-0">
        <div className="flex items-center gap-2 mb-10">
          <span className="font-black text-[#39ff14] tracking-wider text-sm">ÁREA 51</span>
        </div>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item, i) => (
            <div key={i} onClick={() => setActiveTab(item.label)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition ${
              activeTab === item.label ? "bg-[#39ff14]/10 text-[#39ff14]" : "text-gray-600 hover:text-gray-300"
            }`}>{item.icon} {item.label}</div>
          ))}
        </nav>

        <div className="flex flex-col gap-1 border-t border-white/5 pt-4 mt-4">
          <button onClick={goHome} className="flex items-center gap-2 text-gray-600 hover:text-white text-sm px-3 py-2 transition">
            <Home className="w-4 h-4" /> Portal
          </button>
          <button onClick={logout} className="flex items-center gap-2 text-gray-600 hover:text-red-400 text-sm px-3 py-2 transition">
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </aside>

      
      <main className="flex-1 overflow-y-auto relative">

        
        <header className="lg:hidden border-b border-white/5 p-4 flex justify-between items-center bg-[#060d06]">
          <span className="font-black text-[#39ff14] text-sm flex items-center gap-2">ÁREA 51</span>
          <div className="flex items-center gap-4">
            <select className="bg-transparent text-sm font-bold text-[#39ff14] outline-none" value={activeTab} onChange={(e) => setActiveTab(e.target.value)}>
              {menuItems.map(m => <option key={m.label} value={m.label} className="bg-[#020502] text-white">{m.label}</option>)}
            </select>
            <div className="flex items-center gap-3">
              <button onClick={goHome} className="text-gray-500 hover:text-white"><Home className="w-5 h-5" /></button>
              <button onClick={logout} className="text-gray-500 hover:text-red-400"><LogOut className="w-5 h-5" /></button>
            </div>
          </div>
        </header>

        <div className="p-6 md:p-10 max-w-[1100px] mx-auto">

          
          {activeTab === "Painel Central" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              
              <div className="relative rounded-2xl overflow-hidden mb-10 h-48 md:h-56">
                <img src="/images/area51.png" alt="Interior da Área 51" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#020502] via-[#020502]/70 to-transparent flex items-center px-8 md:px-12">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-black mb-2">Painel de Monitoramento</h1>
                    <p className="text-gray-400 text-sm font-mono">Status: <span className="text-[#39ff14]">ENTIDADE ATIVA E DANÇANDO</span></p>
                  </div>
                </div>
              </div>

              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {[
                  { icon: <Eye className="w-5 h-5" />, label: "Avistamentos", value: "147", color: "text-[#39ff14]" },
                  { icon: <AlertTriangle className="w-5 h-5" />, label: "Nível Ameaça", value: "ALTO", color: "text-red-400" },
                  { icon: <Users className="w-5 h-5" />, label: "Agentes", value: "89", color: "text-blue-400" },
                  { icon: <Zap className="w-5 h-5" />, label: "Sinais", value: "2.3k", color: "text-amber-400" },
                ].map((s, i) => (
                  <div key={i} className="bg-[#0a120a] border border-white/5 rounded-xl p-5">
                    <div className="text-gray-600 mb-2">{s.icon}</div>
                    <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
                    <p className="text-gray-600 text-xs mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                
                <div className="bg-[#0a120a] border border-white/5 rounded-2xl p-7">
                  <h2 className="text-lg font-bold mb-5 flex items-center gap-2 text-white">
                    <Shield className="w-5 h-5 text-[#39ff14]" /> Protocolos Ativos
                  </h2>
                  <ul className="space-y-4">
                    <li className="flex gap-3 items-start"><span className="text-[#39ff14] text-sm mt-0.5">▸</span><div><p className="font-semibold text-white text-sm">Isolamento Acústico</p><p className="text-gray-600 text-xs leading-relaxed mt-0.5">Fones anti-ruído obrigatórios no setor 4.</p></div></li>
                    <li className="flex gap-3 items-start"><span className="text-[#39ff14] text-sm mt-0.5">▸</span><div><p className="font-semibold text-white text-sm">Camuflagem Rítmica</p><p className="text-gray-600 text-xs leading-relaxed mt-0.5">Treinamento de valsa para agentes de campo.</p></div></li>
                  </ul>
                  <button onClick={() => setActiveTab("Defesa")} className="mt-5 text-[#39ff14] text-xs font-bold hover:underline">Ver Manual Completo →</button>
                </div>

                
                <div className="bg-[#0a120a] border border-white/5 rounded-2xl p-7">
                  <h2 className="text-lg font-bold mb-5 flex items-center gap-2 text-white">
                    <Radio className="w-5 h-5 text-[#39ff14]" /> Últimas Transmissões
                  </h2>
                  <div className="space-y-5">
                    <div className="pb-4 border-b border-white/5"><span className="text-[10px] px-2 py-0.5 rounded font-bold bg-red-500/10 text-red-400">URGENTE</span><h3 className="font-semibold text-white text-sm mt-2">Apagão na Flórida</h3></div>
                    <div><span className="text-[10px] px-2 py-0.5 rounded font-bold bg-[#39ff14]/10 text-[#39ff14]">SIGILO</span><h3 className="font-semibold text-white text-sm mt-2">Sinal de Alpha Centauri</h3></div>
                  </div>
                  <button onClick={() => setActiveTab("Interceptações")} className="mt-5 text-[#39ff14] text-xs font-bold hover:underline">Ouvir Interceptações →</button>
                </div>
              </div>
            </motion.div>
          )}

          
          {activeTab === "Defesa" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center"><Shield size={24} /></div>
                <div>
                  <h1 className="text-2xl font-black text-white">Defesa Planetária</h1>
                  <p className="text-gray-500 text-sm">Protocolos oficiais de sobrevivência e combate.</p>
                </div>
              </div>

              <div className="bg-[#0a120a] border border-red-500/20 rounded-2xl p-8 mb-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5"><AlertTriangle size={150} /></div>
                <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2"><AlertTriangle size={20}/> Manual de Sobrevivência</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-white font-bold mb-2">1. Isolamento Auditivo</h4>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">A principal arma da entidade é a frequência de 120 BPM da música 'Dame Tu Cosita'. Se você ouvir, sentirá espasmos pélvicos. Use tampões industriais.</p>
                    
                    <h4 className="text-white font-bold mb-2">2. Contramedida Sonora</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">Reproduzir sertanejo universitário ou pagode romântico dos anos 90 confunde o sistema neurológico do alienígena, deixando-o atordoado.</p>
                  </div>
                  <div>
                    <img src="/images/alien-hero.png" alt="Ameaça" className="w-full h-72 object-cover object-top rounded-xl border border-white/10 opacity-70 grayscale" />
                    <p className="text-center text-xs text-gray-600 mt-2">Alvo prioritário. Não encare os olhos.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          
          {activeTab === "Interceptações" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center"><Radio size={24} /></div>
                <div>
                  <h1 className="text-2xl font-black text-white">Central de Interceptações</h1>
                  <p className="text-gray-500 text-sm">Acesso a transmissões e arquivos classificados.</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { tag: "AUDIO LOG 04", date: "Ontem 03:47", title: "Apagão na Flórida", desc: "Torres de rádio foram hackeadas para reproduzir 'Dame tu cosita' por 4 horas seguidas. 200 mil pessoas afetadas foram vistas dançando nas ruas.", status: "CONFIRMADO" },
                  { tag: "SINAL ESPACIAL", date: "12/05/2026", title: "Transmissão de 120 BPM", desc: "Antena parabólica SETI capta sinal repetitivo vindo de Alpha Centauri. Padrão rítmico idêntico à batida do reggaeton.", status: "INVESTIGANDO" },
                  { tag: "SATÉLITE", date: "02/05/2026", title: "Agroglifos no Texas", desc: "Plantação de trigo amassada formando letras perfeitas. Visto de cima, lia-se 'AH AH'. O alienígena está provocando.", status: "CLASSIFICADO" },
                ].map((item, i) => (
                  <div key={i} className="bg-[#0a120a] border border-white/5 rounded-xl p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] bg-white/10 text-white px-2 py-0.5 rounded font-mono">{item.tag}</span>
                        <span className="text-xs text-gray-500 font-mono">{item.date}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="px-4 py-2 border border-white/10 rounded-lg text-xs font-bold font-mono text-[#39ff14] bg-[#39ff14]/5">
                      STATUS: {item.status}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </main>

      
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

        <AnimatePresence>
          {chatOpen && (
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-80 md:w-[380px] h-[480px] bg-[#0a120a] border border-[#39ff14]/20 rounded-2xl mb-4 flex flex-col shadow-[0_8px_40px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              
              <div className="p-4 border-b border-white/5 bg-[#060d06] flex justify-between items-center shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#39ff14]/20 flex items-center justify-center text-lg">X</div>
                  <div>
                    <h3 className="font-bold text-sm text-white leading-tight">Dame Tu Cosita</h3>
                    <p className="text-[10px] text-[#39ff14] font-mono">Prisioneiro C-137 • Online</p>
                  </div>
                </div>
                <button onClick={() => setChatOpen(false)} className="text-gray-600 hover:text-white transition">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-3 bg-[#060d06]/50 border-b border-white/5 text-center">
                <p className="text-[11px] text-gray-500">Pergunte sobre: <span className="text-gray-400">proteção, planeta, avistamentos, objetivo, nave</span></p>
              </div>

              
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 hide-scrollbar">
                {messages.length === 0 && (
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-700 text-xs text-center px-6 gap-3">
                    <MessageCircle className="w-8 h-8" />
                    <p>Conexão neural estabelecida.<br/>Extraia informações do alienígena.</p>
                  </div>
                )}
                {messages.map((m, i) => (
                  <div key={i} className={`px-3.5 py-2.5 max-w-[80%] rounded-2xl text-[13px] leading-relaxed ${
                    m.sender === "user"
                      ? "bg-[#39ff14] text-black self-end rounded-br-md font-medium"
                      : "bg-[#122012] text-green-100 self-start rounded-bl-md border border-[#39ff14]/10"
                  }`}>{m.content}</div>
                ))}
                {loading && (
                  <div className="bg-[#122012] text-[#39ff14]/50 self-start px-3.5 py-2.5 rounded-2xl rounded-bl-md text-[13px] border border-[#39ff14]/10 italic">
                    Traduzindo...
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              
              <form onSubmit={sendMessage} className="p-3 border-t border-white/5 bg-[#060d06] flex gap-2 shrink-0">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Pergunte ao alien..."
                  className="flex-1 bg-[#020502] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#39ff14]/40 transition placeholder-gray-700" />
                <button type="submit" disabled={loading}
                  className="bg-[#39ff14] text-black p-2.5 rounded-lg hover:brightness-110 transition disabled:opacity-50">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        
        <button onClick={() => setChatOpen(!chatOpen)}
          className="w-14 h-14 bg-[#39ff14] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:shadow-[0_0_30px_rgba(57,255,20,0.5)] hover:scale-110 transition-all text-2xl"
        >
          {chatOpen ? <X className="w-6 h-6 text-black" /> : <MessageCircle className="w-6 h-6 text-black" />}
        </button>
      </div>
    </div>
  );
}
