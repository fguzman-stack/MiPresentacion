import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";
import { NebulaMap } from "./components/NebulaMap";
import { LangContext, t, type Lang } from "./lib/i18n";

export default function App() {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("lang") as Lang) || "es");
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang as string) === "ar" ? "rtl" : "ltr";
  }, [lang]);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    let rafId: number;
    const raf = (time: number) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // stats counter animation for hero
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".stat-number");
    els.forEach((el) => {
      const target = parseInt(el.dataset.count || "0");
      let start: number | null = null;
      const duration = 2000;
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.floor(ease * target));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <div className="min-h-screen bg-[#02020a] text-[#f4f1ff]">
        {/* Stars background */}
        <div id="stars" className="fixed inset-0 pointer-events-none opacity-35" style={{
          backgroundImage: `radial-gradient(circle at 12% 18%, rgba(255,255,255,0.9) 0 1px, transparent 1.5px), radial-gradient(circle at 62% 8%, rgba(180,210,255,0.75) 0 1px, transparent 1.5px)`,
          backgroundSize: "260px 260px, 340px 340px"
        }} />
        <div className="fixed -top-[210px] -right-[200px] w-[650px] h-[650px] rounded-full blur-[85px] opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, #7e5cff, transparent 68%)" }} />

        {/* Navbar */}
        <nav className={`fixed top-0 inset-x-0 z-[1000] transition-all duration-300 ${scrolled ? "py-3 bg-[rgba(3,3,12,0.72)] border-b border-[rgba(151,127,255,0.16)] backdrop-blur-[20px] shadow-[0_12px_30px_rgba(0,0,0,0.2)]" : "py-4 bg-transparent border-transparent"}`}>
          <div className="max-w-[1200px] mx-auto flex items-center justify-between px-5">
            <a href="#" className="font-['Orbitron'] text-[1.28rem] font-black tracking-tighter bg-gradient-to-r from-[#8b6cff] via-[#d66bff] to-[#ff78ae] bg-clip-text text-transparent">{"<FG />"}</a>
            <div className={`flex items-center gap-1 max-[768px]:absolute max-[768px]:top-[calc(100%+8px)] max-[768px]:inset-x-4 max-[768px]:flex-col max-[768px]:p-3 max-[768px]:bg-[rgba(9,8,29,0.93)] max-[768px]:border max-[768px]:border-white/10 max-[768px]:rounded-[18px] ${navOpen ? "max-[768px]:flex" : "max-[768px]:hidden"} md:flex`}>
              <a href="#inicio" className="px-3.5 py-2 rounded-[9px] text-sm font-semibold text-[#b8b1d0] hover:text-white hover:bg-[rgba(142,108,255,0.12)]">{t(lang, "nav_inicio")}</a>
              <a href="#apps" className="px-3.5 py-2 rounded-[9px] text-sm font-semibold text-[#b8b1d0] hover:text-white hover:bg-[rgba(142,108,255,0.12)]">{t(lang, "nav_apps")}</a>
              <a href="#habilidades" className="px-3.5 py-2 rounded-[9px] text-sm font-semibold text-[#b8b1d0] hover:text-white hover:bg-[rgba(142,108,255,0.12)]">{t(lang, "nav_habilidades")}</a>
              <a href="#contacto" className="px-3.5 py-2 rounded-[9px] text-sm font-semibold text-[#b8b1d0] hover:text-white hover:bg-[rgba(142,108,255,0.12)]">{t(lang, "nav_contacto")}</a>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-[9px] bg-white/[0.035] border border-white/10 text-sm text-[#b8b1d0] hover:text-white">
                  <span className="text-xs">🌐</span> {lang.toUpperCase()} ▾
                </button>
                {langOpen && (
                  <div className="absolute top-[calc(100%+10px)] right-0 w-[205px] p-1.5 bg-[rgba(9,8,29,0.9)] border border-white/10 rounded-[14px] shadow-xl backdrop-blur-xl max-h-[320px] overflow-y-auto z-50">
                    {[
                      ["es","🇪🇸 Español"],["en","🇺🇸 English"],["fr","🇫🇷 Français"],["de","🇩🇪 Deutsch"],["it","🇮🇹 Italiano"],["pt","🇧🇷 Português"],["ja","🇯🇵 日本語"],["zh","🇨🇳 中文"],["ko","🇰🇷 한국어"],["ru","🇷🇺 Русский"],["ar","🇸🇦 العربية"],["hi","🇮🇳 हिन्दी"],["nl","🇳🇱 Nederlands"],["tr","🇹🇷 Türkçe"],["pl","🇵🇱 Polski"],
                    ].map(([code, label]) => (
                      <button key={code} onClick={() => { setLang(code as Lang); setLangOpen(false); }} className="w-full text-left px-3 py-2 rounded-[8px] text-sm text-[#b8b1d0] hover:text-white hover:bg-[rgba(142,108,255,0.12)]">{label}</button>
                    ))}
                  </div>
                )}
              </div>
              <button onClick={() => setNavOpen(!navOpen)} className="hidden max-[768px]:flex flex-col gap-[5px] p-1.5">
                <span className="w-[22px] h-[2px] bg-white rounded-full" /><span className="w-[22px] h-[2px] bg-white rounded-full" /><span className="w-[22px] h-[2px] bg-white rounded-full" />
              </button>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section id="inicio" className="relative z-10 min-h-screen flex items-center justify-center px-5 pt-[100px] pb-20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="absolute w-[140px] h-[1px] opacity-0 bg-gradient-to-r from-transparent via-white/90 to-white rounded-full" style={{
                top: `${10 + Math.random()*60}%`,
                left: `${10 + Math.random()*80}%`,
                animation: `shoot ${3+Math.random()*4}s linear infinite`,
                animationDelay: `${Math.random()*12}s`,
                transform: "rotate(-32deg)",
              }} />
            ))}
          </div>
          <div className="relative z-10 max-w-[830px] mx-auto text-center w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-[19px] py-[9px] rounded-full bg-[rgba(142,108,255,0.11)] border border-[rgba(177,142,255,0.26)] text-[#c4b5fd] text-sm font-semibold mb-6">
              🚀 {t(lang, "hero_badge")}
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 28, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.9, ease: [0.16,0.85,0.3,1] }} className="font-['Orbitron'] text-[clamp(2.3rem,7vw,4.4rem)] font-black leading-[1.14] tracking-tighter mb-5 bg-gradient-to-r from-[#6f4cff] via-[#b37aff] via-[#ff88c0] to-[#54dcff] bg-clip-text text-transparent">
              Francisco Guzmán
            </motion.h1>
            <p className="max-w-[620px] mx-auto text-[#b8b1d0] text-[clamp(1rem,2vw,1.22rem)] leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: t(lang, "hero_sub") }} />
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <a href="#apps" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[13px] bg-gradient-to-r from-[#8b6cff] via-[#d66bff] to-[#ff78ae] text-white font-bold shadow-[0_8px_24px_rgba(126,91,255,0.28)] hover:translate-y-[-3px] transition-transform">
                🚀 {t(lang, "hero_btn_apps")}
              </a>
              <a href="#contacto" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[13px] bg-white/[0.025] border border-[rgba(192,175,255,0.22)] text-white font-bold hover:bg-[rgba(140,106,255,0.1)]">
                ✉️ {t(lang, "hero_btn_contacto")}
              </a>
            </div>
            <div className="flex gap-10 justify-center mx-auto w-fit">
              <div className="text-center min-w-[90px]"><span className="stat-number block font-['Orbitron'] text-[2.5rem] font-black bg-gradient-to-r from-[#8b6cff] to-[#ff78ae] bg-clip-text text-transparent" data-count="3">3</span><span className="text-[0.83rem] text-[#817a9e]">{t(lang,"stat_apps")}</span></div>
              <div className="text-center min-w-[90px]"><span className="stat-number block font-['Orbitron'] text-[2.5rem] font-black bg-gradient-to-r from-[#8b6cff] to-[#ff78ae] bg-clip-text text-transparent" data-count="15">15</span><span className="text-[0.83rem] text-[#817a9e]">{t(lang,"stat_proyectos")}</span></div>
              <div className="text-center min-w-[90px]"><span className="stat-number block font-['Orbitron'] text-[2.5rem] font-black bg-gradient-to-r from-[#8b6cff] to-[#ff78ae] bg-clip-text text-transparent" data-count="40">40</span><span className="text-[0.83rem] text-[#817a9e]">{t(lang,"stat_web")}</span></div>
            </div>
          </div>
        </section>

        {/* Nebula Map 2.0 */}
        <NebulaMap lang={lang} />

        {/* Habilidades */}
        <section id="habilidades" className="max-w-[1200px] mx-auto px-5 py-[110px]">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(142,108,255,0.1)] border border-[rgba(167,137,255,0.24)] text-[#c4b5fd] text-xs font-bold uppercase tracking-widest">Stack Tecnológico</span>
            <h2 className="font-['Orbitron'] text-[clamp(2rem,5vw,3.2rem)] font-extrabold tracking-tight mt-3" dangerouslySetInnerHTML={{ __html: t(lang,"hab_title") }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: t(lang,"cat_mobile"), items: [["Kotlin","#7F52FF"],["Jetpack Compose","#4285F4"],["Android SDK","#FF6F00"],["Room DB","#02569B"],["Firebase","#FFCA28"]] },
              { title: t(lang,"cat_frontend"), items: [["HTML5","#E44D26"],["CSS3 / Tailwind","#1572B6"],["JavaScript","#F7DF1E"],["React","#61DAFB"],["Next.js","#000000"]] },
              { title: t(lang,"cat_backend"), items: [["PHP","#777BB4"],["Python","#3776AB"],["Django","#092E20"],["FastAPI","#009688"],["MySQL","#4479A1"]] },
            ].map((cat) => (
              <div key={cat.title} className="p-7 rounded-[18px] bg-[rgba(14,14,37,0.76)] border border-[rgba(151,127,255,0.16)] backdrop-blur-xl">
                <h3 className="font-['Orbitron'] font-extrabold mb-5 flex items-center gap-2">{cat.title}</h3>
                <div className="flex flex-col gap-2.5">
                  {cat.items.map(([name, color]) => (
                    <div key={name} className="flex items-center gap-3 p-3 rounded-[11px] bg-white/[0.025] border border-transparent hover:border-white/10 hover:bg-[rgba(142,108,255,0.09)] transition-colors">
                      <div className="w-9 h-9 rounded-[9px] flex items-center justify-center text-white text-sm" style={{ background: color as string }}>◆</div>
                      <span className="flex-1 text-sm font-semibold">{name}</span>
                      <span className="text-xs px-2 py-1 rounded-[6px] bg-[rgba(142,108,255,0.12)] border border-white/10 text-[#c4b5fd]">{t(lang,"nivel_av")}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto" className="max-w-[660px] mx-auto px-5 py-[110px] text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(142,108,255,0.1)] border border-white/10 text-[#c4b5fd] text-xs font-bold uppercase tracking-widest">{t(lang,"cont_label")}</span>
          <h2 className="font-['Orbitron'] text-[clamp(2rem,5vw,3.2rem)] font-extrabold tracking-tight mt-3" dangerouslySetInnerHTML={{ __html: t(lang,"cont_title") }} />
          <p className="text-[#b8b1d0] mt-3 mb-8">{t(lang,"cont_desc")}</p>
          <div className="grid grid-cols-2 max-[460px]:grid-cols-1 gap-4">
            <a href="https://github.com/fguzman-stack" target="_blank" rel="noopener" className="p-7 rounded-[18px] bg-[rgba(14,14,37,0.76)] border border-white/10 backdrop-blur-xl hover:-translate-y-1 transition-transform">
              <div className="text-2xl mb-2">★</div><div className="font-bold">GitHub</div><div className="text-sm text-white/50">fguzman-stack</div>
            </a>
            <a href="https://linkedin.com/in/fguzman-stack" target="_blank" rel="noopener" className="p-7 rounded-[18px] bg-[rgba(14,14,37,0.76)] border border-white/10 backdrop-blur-xl hover:-translate-y-1 transition-transform">
              <div className="text-2xl mb-2">◎</div><div className="font-bold">LinkedIn</div><div className="text-sm text-white/50">fguzman-stack</div>
            </a>
            <a href="mailto:familiazv2016@gmail.com" className="p-7 rounded-[18px] bg-[rgba(14,14,37,0.76)] border border-white/10 backdrop-blur-xl hover:-translate-y-1 transition-transform">
              <div className="text-2xl mb-2">✉️</div><div className="font-bold">{t(lang,"cont_email_tit")}</div><div className="text-sm text-white/50">familiazv2016@gmail.com</div>
            </a>
            <a href="https://wa.me/56939439403" target="_blank" rel="noopener" className="p-7 rounded-[18px] bg-[rgba(14,14,37,0.76)] border border-white/10 backdrop-blur-xl hover:-translate-y-1 transition-transform">
              <div className="text-2xl mb-2">💬</div><div className="font-bold">{t(lang,"cont_phone_tit")}</div><div className="text-sm text-white/50">+56 9 3943 9403</div>
            </a>
          </div>
        </section>

        <footer className="text-center py-12 border-t border-white/10">
          <div className="font-['Orbitron'] font-black bg-gradient-to-r from-[#8b6cff] to-[#ff78ae] bg-clip-text text-transparent">{"<FG />"}</div>
          <p className="text-sm text-white/40 mt-2">{t(lang,"footer_text")}</p>
        </footer>
      </div>
    </LangContext.Provider>
  );
}
