"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ShieldAlert, LogOut, FileText, Send, Radio } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }
    loadMessages();
  }, []);

  const loadMessages = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/chat", {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      setMessages(data);
    } else {
      localStorage.removeItem("token");
      router.push("/");
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = { sender: "user", content: input };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setLoading(true);

    const token = localStorage.getItem("token");
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({ message: newMsg.content })
    });

    if (res.ok) {
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", content: data.botResponse }]);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#020502] text-white flex">
      
      {/* Sidebar Lateral */}
      <aside className="w-64 border-r border-green-500/20 bg-[#050a05] p-6 hidden md:flex flex-col">
        <div className="flex items-center gap-3 mb-12">
          <ShieldAlert className="text-green-500 w-8 h-8" />
          <span className="font-black text-xl tracking-wider text-green-500">ÁREA 51</span>
        </div>
        
        <nav className="flex-1 space-y-4">
          <div className="flex items-center gap-3 text-green-500 bg-green-500/10 p-3 rounded-lg border border-green-500/20 cursor-pointer">
            <FileText className="w-5 h-5" />
            <span className="font-bold">Dossiê Principal</span>
          </div>
          <div className="flex items-center gap-3 text-gray-500 p-3 rounded-lg hover:text-white cursor-pointer transition">
            <Radio className="w-5 h-5" />
            <span className="font-bold">Sinais Captados</span>
          </div>
        </nav>

        <button onClick={handleLogout} className="flex items-center gap-3 text-red-500 p-3 hover:bg-red-500/10 rounded-lg transition font-bold mt-auto">
          <LogOut className="w-5 h-5" />
          Desconectar
        </button>
      </aside>

      {/* Conteúdo Central */}
      <main className="flex-1 p-8 md:p-12 relative overflow-y-auto">
        
        <header className="mb-12 flex justify-between items-center md:hidden">
          <span className="font-black text-2xl tracking-wider text-green-500">ÁREA 51</span>
          <button onClick={handleLogout} className="text-red-500"><LogOut /></button>
        </header>

        <h1 className="text-4xl font-bold mb-2">Painel de Monitoramento</h1>
        <p className="text-green-500/80 mb-12 font-mono">Status da Entidade: ATIVA E DANÇANDO</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1 */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#050a05] border border-green-500/20 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3"><ShieldAlert className="text-green-500" /> Manual de Proteção</h2>
            <p className="text-gray-400 mb-4 leading-relaxed">
              O sujeito da classe "Dame Tu Cosita" possui habilidades de hipnose rítmica. A recomendação da agência é o uso imediato de fones de ouvido. Evite ritmos caribenhos.
            </p>
            <div className="w-full h-40 rounded-xl overflow-hidden mt-6">
               <img src="https://media1.tenor.com/m/f2E0E7iG5CgAAAAd/dame-tu-cosita-dance.gif" className="w-full h-full object-cover opacity-50 grayscale" />
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#050a05] border border-green-500/20 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3"><Radio className="text-green-500" /> Frequências Vazadas</h2>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Registramos anomalias em torres de rádio na Flórida. Uma transmissão em repetição "Ah ah toma toma" causou apagões locais.
            </p>
            <div className="p-4 bg-black rounded-xl border border-green-500/10 font-mono text-sm text-green-500/60 h-40 overflow-hidden">
              {`> Iniciando descriptografia...
> Sinal interceptado: 120BPM
> Origem: Desconhecida
> Conteúdo: [DADOS CORROMPIDOS]... Ah ah...`}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Widget do Chat (Bot) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        
        <AnimatePresence>
          {isChatOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-80 md:w-96 h-[500px] bg-[#050a05] border border-green-500/30 rounded-2xl mb-4 flex flex-col shadow-[0_0_40px_rgba(34,197,94,0.15)] overflow-hidden"
            >
              <div className="p-4 bg-green-500/10 border-b border-green-500/20 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img src="https://media1.tenor.com/m/f2E0E7iG5CgAAAAd/dame-tu-cosita-dance.gif" className="w-10 h-10 rounded-full border border-green-500 object-cover" />
                  <div>
                    <h3 className="font-bold text-white leading-tight">Dame Tu Cosita</h3>
                    <p className="text-xs text-green-500 font-mono">IA Capturada</p>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-white transition">✖</button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                {messages.length === 0 && (
                  <p className="text-center text-gray-500 text-sm mt-10">Conexão neural estabelecida. Tente extrair informações do alienígena.</p>
                )}
                {messages.map((msg, idx) => (
                  <div key={idx} className={`p-3 max-w-[80%] rounded-xl text-sm ${msg.sender === "user" ? "bg-green-500 text-black self-end rounded-br-sm font-medium" : "bg-[#111] text-green-100 border border-green-500/20 self-start rounded-bl-sm"}`}>
                    {msg.content}
                  </div>
                ))}
                {loading && <div className="p-3 bg-[#111] text-green-500 self-start rounded-xl text-sm italic">Digitando...</div>}
              </div>

              <form onSubmit={sendMessage} className="p-3 border-t border-green-500/20 bg-black flex gap-2">
                <input 
                  type="text" 
                  value={input} onChange={(e) => setInput(e.target.value)} 
                  placeholder="Pergunte ao alien..." 
                  className="flex-1 bg-[#111] border border-green-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500 transition text-sm"
                />
                <button type="submit" className="bg-green-500 text-black p-2 rounded-lg hover:bg-green-400 transition"><Send className="w-5 h-5" /></button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:scale-110 transition overflow-hidden p-1"
        >
          <img src="https://media1.tenor.com/m/f2E0E7iG5CgAAAAd/dame-tu-cosita-dance.gif" className="w-full h-full rounded-full object-cover" />
        </button>
      </div>
      
    </div>
  );
}
