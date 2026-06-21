"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldAlert, Fingerprint, Search } from "lucide-react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async (type) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        if (type === "login") {
          localStorage.setItem("token", data.token);
          router.push("/dashboard");
        } else {
          alert(data.message);
        }
      } else {
        alert(data.error);
      }
    } catch (e) {
      alert("Erro de conexão.");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#020502] text-white overflow-hidden selection:bg-green-500 selection:text-black">
      
      {/* Navbar Simplificada */}
      <nav className="fixed w-full p-6 flex justify-between items-center z-50 backdrop-blur-md border-b border-green-500/20">
        <div className="flex items-center gap-3">
          <ShieldAlert className="text-green-500 w-8 h-8" />
          <span className="font-bold text-xl tracking-widest text-green-500">M.I.B. PROTOCOL</span>
        </div>
        <a href="#login" className="px-6 py-2 bg-green-500/10 text-green-500 border border-green-500/50 rounded-full hover:bg-green-500 hover:text-black transition font-bold text-sm tracking-wide">
          ACESSO RESTRITO
        </a>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4">
        {/* Fundo abstrato com Framer Motion */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900 via-[#020502] to-[#020502]"
        />
        
        <div className="z-10 max-w-4xl space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
            className="inline-block p-4 rounded-full bg-green-500/10 border border-green-500/30 mb-4"
          >
            <img src="https://media1.tenor.com/m/f2E0E7iG5CgAAAAd/dame-tu-cosita-dance.gif" alt="Alien" className="w-24 h-24 rounded-full object-cover shadow-[0_0_30px_rgba(34,197,94,0.5)]" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}
            className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-green-500"
          >
            A AMEAÇA QUE DANÇA
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
            className="text-xl md:text-2xl text-green-300/80 max-w-2xl mx-auto font-light"
          >
            A entidade conhecida como "Dame Tu Cosita" foi avistada novamente. O governo nega, mas nós temos as provas.
          </motion.p>
        </div>
      </section>

      {/* Login Section */}
      <section id="login" className="py-32 flex items-center justify-center px-4 relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="w-full max-w-md bg-[#050a05]/80 backdrop-blur-xl p-10 rounded-3xl border border-green-500/30 shadow-[0_0_50px_rgba(34,197,94,0.1)]"
        >
          <div className="flex justify-center mb-6">
            <Fingerprint className="w-16 h-16 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-center mb-2">Login de Agente</h2>
          <p className="text-center text-gray-500 mb-8 text-sm">Insira suas credenciais para acessar a intranet da Área 51.</p>
          
          <div className="space-y-5">
            <div>
              <label className="text-green-500 text-xs font-bold uppercase tracking-wider mb-2 block">Identificação</label>
              <input 
                type="text" 
                value={username} onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black border border-green-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition"
                placeholder="Ex: Fox Mulder"
              />
            </div>
            <div>
              <label className="text-green-500 text-xs font-bold uppercase tracking-wider mb-2 block">Senha</label>
              <input 
                type="password" 
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-green-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition"
                placeholder="••••••••"
              />
            </div>
            
            <div className="flex gap-4 pt-4">
              <button 
                onClick={() => handleAuth("login")} disabled={loading}
                className="flex-1 bg-green-500 text-black font-bold py-3 rounded-lg hover:bg-green-400 transition"
              >
                Acessar
              </button>
              <button 
                onClick={() => handleAuth("register")} disabled={loading}
                className="flex-1 bg-transparent border border-green-500 text-green-500 font-bold py-3 rounded-lg hover:bg-green-500/10 transition"
              >
                Registrar
              </button>
            </div>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
