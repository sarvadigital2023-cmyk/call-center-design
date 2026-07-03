"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ─── Color palette ─────────────────────────────────────────────────────────────
const BLUE   = "#00b4ff";
const RED    = "#ff3a3a";
const GREEN  = "#00ff9d";
const GOLD   = "#ffd700";
const PURPLE = "#b44fff";

// ─── Operators data ────────────────────────────────────────────────────────────
const OPERATORS = [
  { name: "Алина К.",  dept: "RX",  calls: 47, active: true,  color: GREEN  },
  { name: "Марина В.", dept: "OTC", calls: 53, active: true,  color: BLUE   },
  { name: "Карина Л.", dept: "VIP", calls: 61, active: true,  color: GOLD   },
  { name: "Дарья Т.",  dept: "RX",  calls: 39, active: false, color: RED    },
  { name: "Анна Ф.",   dept: "OTC", calls: 44, active: true,  color: PURPLE },
];

// ─── Animated count-up hook ────────────────────────────────────────────────────
function useCount(target: number, duration = 2200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setVal(Math.round(target * t));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return val;
}

// ─── Slow sine parallax hook ───────────────────────────────────────────────────
function useParallax() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  useEffect(() => {
    let t = 0;
    const id = setInterval(() => {
      t += 0.008;
      setOffset({ x: Math.sin(t * 0.7) * 6, y: Math.sin(t * 0.5) * 4 });
    }, 30);
    return () => clearInterval(id);
  }, []);
  return offset;
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function LightRay({
  color, angle, x, opacity = 0.18, width = 120,
}: { color: string; angle: number; x: string; opacity?: number; width?: number }) {
  return (
    <motion.div
      className="absolute top-0 pointer-events-none"
      style={{
        left: x, width, height: "70%",
        background: `linear-gradient(180deg, ${color}00 0%, ${color} 15%, ${color}88 50%, ${color}00 100%)`,
        transform: `rotate(${angle}deg) translateX(-50%)`,
        transformOrigin: "top center",
        filter: "blur(18px)",
        opacity,
      }}
      animate={{ opacity: [opacity, opacity * 0.55, opacity, opacity * 0.7, opacity] }}
      transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function Particle({ color, startX, startY, size = 2 }: { color: string; startX: string; startY: string; size?: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: startX, top: startY, width: size, height: size, background: color, boxShadow: `0 0 ${size * 2}px ${color}` }}
      animate={{ y: [0, -30, -60, -40, 0], x: [0, 8, -5, 12, 0], opacity: [0, 0.8, 0.4, 0.6, 0] }}
      transition={{ duration: 5 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5, ease: "easeInOut" }}
    />
  );
}

function CallPing({ color, delay = 0, top, left }: { color: string; delay?: number; top: string; left: string }) {
  return (
    <div className="absolute" style={{ top, left }}>
      <motion.div
        className="w-2 h-2 rounded-full"
        style={{ background: color, boxShadow: `0 0 6px ${color}` }}
        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, delay, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 rounded-full border"
        style={{ borderColor: color }}
        animate={{ scale: [1, 3], opacity: [0.6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, delay, ease: "easeOut" }}
      />
    </div>
  );
}

function DataStream({ color, speed = 1 }: { color: string; speed?: number }) {
  const chars = "01PHARMACY24/7ABXYZ<>{}[]";
  const [rows, setRows] = useState<string[][]>([]);
  useEffect(() => {
    const build = () =>
      Array.from({ length: 5 }, () =>
        Array.from({ length: 18 }, () => chars[Math.floor(Math.random() * chars.length)])
      );
    setRows(build());
    const id = setInterval(() => setRows(build()), 180 / speed);
    return () => clearInterval(id);
  }, [speed]);
  return (
    <div className="font-mono text-[7px] leading-[1.4] select-none pointer-events-none overflow-hidden">
      {rows.map((row, i) => (
        <div key={i} style={{ color, opacity: 0.15 + i * 0.1 }}>{row.join(" ")}</div>
      ))}
    </div>
  );
}

function Waveform({ color, bars = 16, active = true }: { color: string; bars?: number; active?: boolean }) {
  return (
    <div className="flex items-center gap-[1.5px]" style={{ height: 20 }}>
      {Array.from({ length: bars }, (_, i) => (
        <motion.div
          key={i}
          className="rounded-full flex-1"
          style={{ background: color, minWidth: 1.5 }}
          animate={active
            ? { height: [`${2 + Math.random() * 2}px`, `${6 + Math.random() * 12}px`, `${2 + Math.random() * 2}px`] }
            : { height: "2px" }
          }
          transition={active ? { duration: 0.25 + Math.random() * 0.35, repeat: Infinity, delay: i * 0.018 } : {}}
        />
      ))}
    </div>
  );
}

function HUDCorners({ color = BLUE, size = 10 }: { color?: string; size?: number }) {
  const corners = [
    { pos: "top-0 left-0",     d: `M0 ${size} L0 0 L${size} 0` },
    { pos: "top-0 right-0",    d: `M${size} ${size} L${size} 0 L0 0` },
    { pos: "bottom-0 left-0",  d: `M0 0 L0 ${size} L${size} ${size}` },
    { pos: "bottom-0 right-0", d: `M${size} 0 L${size} ${size} L0 ${size}` },
  ];
  return (
    <>
      {corners.map((c, i) => (
        <div key={i} className={`absolute ${c.pos}`}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
            <path d={c.d} stroke={color} strokeWidth="1.5" opacity="0.7" />
          </svg>
        </div>
      ))}
    </>
  );
}

function ScreenPanel({ title, color, children, className = "" }: { title: string; color: string; children?: React.ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-lg border bg-black/75 backdrop-blur p-2.5 overflow-hidden ${className}`} style={{ borderColor: color + "44" }}>
      <HUDCorners color={color} />
      <div className="text-[8px] font-mono uppercase tracking-widest mb-1.5" style={{ color: color + "99" }}>{title}</div>
      {children}
    </div>
  );
}

function CallQueue() {
  const calls = [
    { id: "Q-001", num: "+7 495 ***-12-34", wait: "00:09", pri: "VIP"  },
    { id: "Q-002", num: "+7 812 ***-56-78", wait: "00:27", pri: "NORM" },
    { id: "Q-003", num: "+7 343 ***-90-12", wait: "00:44", pri: "NORM" },
  ];
  return (
    <div className="space-y-1">
      {calls.map((c, i) => (
        <motion.div
          key={c.id}
          className="flex items-center justify-between text-[8px] font-mono px-1.5 py-1 rounded border border-white/5"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.7 }}
        >
          <span className="text-white/40">{c.id}</span>
          <span className="text-white/60">{c.num}</span>
          <span style={{ color: GOLD }}>{c.wait}</span>
          <span className="px-1 rounded" style={{ color: c.pri === "VIP" ? RED : "rgba(255,255,255,0.3)", background: c.pri === "VIP" ? RED + "22" : "transparent" }}>
            {c.pri}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────────
export default function NeonCallCenterScene() {
  const [time, setTime] = useState("");
  const parallax   = useParallax();
  const callCount  = useCount(1247);

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("ru-RU"));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const particles = [
    { color: RED,    x: "15%", y: "60%", size: 2 },
    { color: GREEN,  x: "30%", y: "70%", size: 2 },
    { color: GOLD,   x: "50%", y: "55%", size: 3 },
    { color: BLUE,   x: "70%", y: "65%", size: 2 },
    { color: PURPLE, x: "85%", y: "60%", size: 2 },
    { color: RED,    x: "8%",  y: "75%", size: 1 },
    { color: GREEN,  x: "92%", y: "72%", size: 1 },
    { color: GOLD,   x: "40%", y: "80%", size: 2 },
  ];

  return (
    <div className="relative min-h-screen bg-[#000510] overflow-hidden flex flex-col select-none">

      {/* Background image with slow parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ transform: `translate(${parallax.x}px, ${parallax.y}px) scale(1.04)` }}
      >
        <img
          src="/callcenter-scene-c6.png"
          alt="Pharmacy Call Center"
          className="w-full h-full object-cover object-[50%_20%] landscape:object-[50%_10%]"
          style={{ opacity: 0.92 }}
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#000510]/98 via-[#000510]/10 to-[#000510]/55 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#000510]/70 to-transparent h-24 pointer-events-none" />

      {/* Colored volumetric light rays */}
      <LightRay color={RED}    angle={-12} x="18%" opacity={0.20} width={100} />
      <LightRay color={GOLD}   angle={5}   x="45%" opacity={0.16} width={130} />
      <LightRay color={GREEN}  angle={14}  x="75%" opacity={0.20} width={100} />
      <LightRay color={BLUE}   angle={-5}  x="60%" opacity={0.12} width={80}  />
      <LightRay color={PURPLE} angle={8}   x="30%" opacity={0.13} width={90}  />

      {/* Floating ambient particles */}
      {particles.map((p, i) => (
        <Particle key={i} color={p.color} startX={p.x} startY={p.y} size={p.size} />
      ))}

      {/* Incoming call pings */}
      <CallPing color={GREEN} top="28%" left="38%" delay={0}   />
      <CallPing color={RED}   top="32%" left="55%" delay={0.8} />
      <CallPing color={GOLD}  top="24%" left="64%" delay={1.6} />
      <CallPing color={BLUE}  top="30%" left="44%" delay={2.4} />

      {/* Scanline sweep */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] pointer-events-none z-10"
        style={{ background: `linear-gradient(90deg, transparent 0%, ${BLUE}44 30%, ${BLUE}88 50%, ${BLUE}44 70%, transparent 100%)` }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      />

      {/* CRT scanline texture */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,180,255,0.012) 3px, rgba(0,180,255,0.012) 4px)" }}
      />

      {/* ── All foreground content ── */}
      <div className="relative z-20 flex flex-col min-h-screen">

        {/* Top HUD bar */}
        <header
          className="flex items-center justify-between px-5 py-2.5 border-b backdrop-blur-sm"
          style={{ borderColor: BLUE + "22", background: "rgba(0,5,16,0.75)" }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="w-7 h-7 rounded border-2 flex items-center justify-center text-xs font-black font-mono"
              style={{ borderColor: RED, color: RED, background: RED + "22" }}
              animate={{ boxShadow: [`0 0 6px ${RED}66`, `0 0 14px ${RED}cc`, `0 0 6px ${RED}66`] }}
              transition={{ duration: 2, repeat: Infinity }}
            >Rx</motion.div>
            <div>
              <div className="font-mono font-bold text-xs tracking-widest" style={{ color: BLUE }}>
                ONLINE PHARMACY — VOICE AGENT CONTROL
              </div>
              <div className="text-[8px] font-mono uppercase tracking-widest text-white/25">
                CINEMATIC HQ · AI POWERED · LIVE
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5">
            {[
              { v: callCount.toLocaleString(), l: "ЗВОНКОВ",   c: GREEN },
              { v: "6 / 8",                    l: "ОПЕРАТОРОВ", c: BLUE  },
              { v: "98.7%",                    l: "SLA",        c: GOLD  },
            ].map((s) => (
              <div key={s.l} className="text-right">
                <div className="font-mono font-bold text-sm" style={{ color: s.c, textShadow: `0 0 8px ${s.c}88` }}>{s.v}</div>
                <div className="text-[8px] text-white/30 font-mono uppercase">{s.l}</div>
              </div>
            ))}

            <motion.div
              className="text-xs font-mono px-2.5 py-1 rounded border"
              style={{ color: GREEN, borderColor: GREEN + "55", background: GREEN + "11" }}
              animate={{ opacity: [1, 0.5, 1], boxShadow: [`0 0 6px ${GREEN}44`, `0 0 12px ${GREEN}88`, `0 0 6px ${GREEN}44`] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >● LIVE</motion.div>

            <div className="font-mono font-bold text-sm" style={{ color: BLUE, textShadow: `0 0 8px ${BLUE}66` }}>
              {time}
            </div>
          </div>
        </header>

        {/* Left side panel */}
        <div className="absolute left-4 landscape:left-2 top-16 landscape:top-12 w-44 landscape:w-36 space-y-2 z-30">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <ScreenPanel title="МЕТРИКИ" color={GREEN}>
              <div className="space-y-1.5">
                {[
                  { l: "ВХОДЯЩИЕ", v: 1247, max: 1500, c: GREEN },
                  { l: "ИСХОДЯЩИЕ", v: 342,  max: 500,  c: BLUE  },
                  { l: "ГОЛОС БОТ", v: 891,  max: 1000, c: GOLD  },
                ].map((m) => (
                  <div key={m.l} className="space-y-0.5">
                    <div className="flex justify-between text-[7px] font-mono">
                      <span style={{ color: m.c + "99" }}>{m.l}</span>
                      <span style={{ color: m.c }}>{m.v}</span>
                    </div>
                    <div className="h-0.5 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: m.c }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(m.v / m.max) * 100}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </ScreenPanel>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
            <ScreenPanel title="ОЧЕРЕДЬ" color={GOLD}>
              <CallQueue />
            </ScreenPanel>
          </motion.div>
        </div>

        {/* Right side panel */}
        <div className="absolute right-4 landscape:right-2 top-16 landscape:top-12 w-44 landscape:w-36 space-y-2 z-30">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <ScreenPanel title="ДАННЫЕ ЭКРАНА" color={BLUE}>
              <DataStream color={BLUE} speed={1.5} />
            </ScreenPanel>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
            <ScreenPanel title="СОБЫТИЯ" color={PURPLE}>
              <div className="space-y-1">
                {[
                  { msg: "Алина → заказ принят",  c: GREEN, t: "00:23" },
                  { msg: "VIP клиент → Карина",   c: GOLD,  t: "01:07" },
                  { msg: "Бот → оператор",         c: BLUE,  t: "01:44" },
                  { msg: "RX рецепт → одобрен",   c: GREEN, t: "02:11" },
                ].map((e, i) => (
                  <motion.div key={i} className="flex gap-1.5 items-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 + i * 0.25 }}>
                    <div className="w-1 h-1 rounded-full mt-1 shrink-0" style={{ background: e.c }} />
                    <div className="text-[7px] font-mono text-white/50 flex-1 leading-tight">{e.msg}</div>
                    <div className="text-[7px] font-mono text-white/20">{e.t}</div>
                  </motion.div>
                ))}
              </div>
            </ScreenPanel>
          </motion.div>
        </div>

        <div className="flex-1" />

        {/* Bottom section */}
        <div className="relative z-20 px-5 pb-4 pt-10 landscape:pt-3 landscape:pb-2 bg-gradient-to-t from-[#000510]/95 via-[#000510]/60 to-transparent">

          {/* Neon title */}
          <div className="text-center mb-4 landscape:mb-1">
            <motion.div
              className="text-4xl landscape:text-2xl font-black font-mono tracking-widest"
              style={{ color: RED, fontFamily: "'Courier New', monospace" }}
              animate={{ textShadow: [
                `0 0 8px ${RED}, 0 0 20px ${RED}88, 0 0 50px ${RED}44`,
                `0 0 12px ${RED}, 0 0 30px ${RED}bb, 0 0 70px ${RED}55`,
                `0 0 6px ${RED}cc, 0 0 15px ${RED}66, 0 0 40px ${RED}33`,
                `0 0 12px ${RED}, 0 0 28px ${RED}99, 0 0 60px ${RED}44`,
                `0 0 8px ${RED}, 0 0 20px ${RED}88, 0 0 50px ${RED}44`,
              ]}}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >PHARMACY</motion.div>
            <motion.div
              className="text-2xl landscape:text-base font-black font-mono tracking-[0.4em] landscape:tracking-[0.25em]"
              style={{ color: BLUE, fontFamily: "'Courier New', monospace" }}
              animate={{ textShadow: [`0 0 8px ${BLUE}, 0 0 20px ${BLUE}88`, `0 0 14px ${BLUE}, 0 0 35px ${BLUE}cc`, `0 0 8px ${BLUE}, 0 0 20px ${BLUE}88`] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >24 / 7</motion.div>
          </div>

          {/* Operator cards */}
          <div className="flex gap-2 mb-3 landscape:mb-1.5 justify-center">
            {OPERATORS.map((op, i) => (
              <motion.div
                key={op.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 * i, type: "spring", stiffness: 200, damping: 22 }}
                className="flex-1 max-w-[120px] rounded-xl border bg-black/75 backdrop-blur p-2.5 landscape:p-1.5 relative overflow-hidden"
                style={{ borderColor: op.color + "44", boxShadow: `0 0 16px ${op.color}18` }}
              >
                {op.active && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 50% 110%, ${op.color}18, transparent 70%)` }}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                  />
                )}
                <div className="flex items-center gap-1.5 mb-1.5">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: op.active ? op.color : "rgba(255,255,255,0.2)" }}
                    animate={op.active ? { opacity: [1, 0.3, 1] } : {}}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
                  />
                  <div className="text-[9px] font-bold text-white truncate">{op.name}</div>
                </div>
                <div className="flex justify-between items-baseline mb-1.5">
                  <div className="text-base font-bold font-mono" style={{ color: op.color }}>{op.calls}</div>
                  <div className="text-[7px] font-mono px-1 rounded" style={{ color: op.color, background: op.color + "22" }}>{op.dept}</div>
                </div>
                <Waveform color={op.color} bars={16} active={op.active} />
              </motion.div>
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-5 gap-2 mb-3 landscape:mb-1.5">
            {[
              { label: "ЗВОНКОВ",   value: callCount.toLocaleString(), color: GREEN  },
              { label: "НА ЛИНИИ",  value: "4",                        color: BLUE   },
              { label: "ОЧЕРЕДЬ",   value: "3",                        color: GOLD   },
              { label: "SLA",       value: "98.7%",                    color: RED    },
              { label: "AVG ОТВЕТ", value: "4.2с",                     color: PURPLE },
            ].map((s) => (
              <div key={s.label} className="rounded-lg border bg-black/70 backdrop-blur py-1.5 text-center relative overflow-hidden" style={{ borderColor: s.color + "44" }}>
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 100%, ${s.color}11, transparent 70%)` }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2 }}
                />
                <div className="font-mono font-bold text-sm relative" style={{ color: s.color, textShadow: `0 0 8px ${s.color}88` }}>{s.value}</div>
                <div className="text-[8px] text-white/30 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Scrolling ticker */}
          <div className="overflow-hidden rounded-lg border border-white/10 bg-black/60 backdrop-blur py-1">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              className="whitespace-nowrap inline-block"
            >
              {[
                { text: "PHARMACY 24/7",          color: RED    },
                { text: "VOICE AGENT ONLINE",     color: GREEN  },
                { text: "ONLINE PHARMACY",         color: BLUE   },
                { text: "SLA 98.7%",               color: GOLD   },
                { text: "AI POWERED",              color: PURPLE },
                { text: "ЗВОНКОВ: 1,247",          color: GREEN  },
                { text: "ВРЕМЯ ОТВЕТА: 4.2 СЕК",  color: BLUE   },
              ].flatMap((item, i) => [
                <span key={`a${i}`} className="font-mono text-[9px] tracking-widest px-3" style={{ color: item.color + "88" }}>{item.text}</span>,
                <span key={`da${i}`} className="text-white/20 mx-1 font-mono text-[9px]">·</span>,
              ]).concat(
                [
                  { text: "PHARMACY 24/7",          color: RED    },
                  { text: "VOICE AGENT ONLINE",     color: GREEN  },
                  { text: "ONLINE PHARMACY",         color: BLUE   },
                  { text: "SLA 98.7%",               color: GOLD   },
                  { text: "AI POWERED",              color: PURPLE },
                  { text: "ЗВОНКОВ: 1,247",          color: GREEN  },
                  { text: "ВРЕМЯ ОТВЕТА: 4.2 СЕК",  color: BLUE   },
                ].flatMap((item, i) => [
                  <span key={`b${i}`} className="font-mono text-[9px] tracking-widest px-3" style={{ color: item.color + "88" }}>{item.text}</span>,
                  <span key={`db${i}`} className="text-white/20 mx-1 font-mono text-[9px]">·</span>,
                ])
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
