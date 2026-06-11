'use client';

import { useEffect, useState, useRef } from 'react';

type Message = {
  id: number;
  text: string;
  from: 'patient' | 'bot';
  time: string;
};

const MESSAGES: Message[] = [
  { id: 1, from: 'patient', text: 'Hola! Tienen disponibilidad esta semana para una consulta?', time: '14:02' },
  { id: 2, from: 'bot',     text: 'Hola! 👋 Sí, tenemos turnos disponibles. ¿Qué día te queda mejor?', time: '14:02' },
  { id: 3, from: 'patient', text: 'El miércoles o jueves estaría perfecto', time: '14:03' },
  { id: 4, from: 'bot',     text: 'Tenemos:\n📅 Miérc 14 — 10:00 hs y 15:30 hs\n📅 Juev 15 — 09:00 hs\n¿Cuál preferís?', time: '14:03' },
  { id: 5, from: 'patient', text: 'El miércoles a las 10, perfecto!', time: '14:04' },
  { id: 6, from: 'bot',     text: '✅ Turno confirmado!\nMiérc 14 · 10:00 hs · Dra. Martínez\nTe enviamos recordatorio 24hs antes. 🗓️', time: '14:04' },
];

const DELAYS = [0, 1400, 2800, 4200, 5800, 7200];
const TOTAL_CYCLE = 11000;

export default function WhatsAppPreview() {
  const [visible, setVisible] = useState<number[]>([]);
  const [typing, setTyping]   = useState(false);
  const timerRefs       = useRef<ReturnType<typeof setTimeout>[]>([]);
  const containerRef    = useRef<HTMLDivElement>(null);
  const inViewRef       = useRef(true);
  const pendingRef      = useRef(false);

  const clearTimers = () => timerRefs.current.forEach(clearTimeout);

  const runSequence = () => {
    clearTimers();
    setVisible([]);
    setTyping(false);
    timerRefs.current = [];

    MESSAGES.forEach((msg, i) => {
      if (msg.from === 'bot') {
        const t1 = setTimeout(() => setTyping(true), DELAYS[i] - 700);
        timerRefs.current.push(t1);
      }
      const t2 = setTimeout(() => {
        setTyping(false);
        setVisible(prev => [...prev, msg.id]);
      }, DELAYS[i]);
      timerRefs.current.push(t2);
    });

    // R9 — only reschedule if still in viewport
    const tReset = setTimeout(() => {
      if (inViewRef.current) {
        runSequence();
      } else {
        pendingRef.current = true;
      }
    }, TOTAL_CYCLE);
    timerRefs.current.push(tReset);
  };

  useEffect(() => {
    // R2 — if reduced motion: show all messages statically, no loop
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setVisible(MESSAGES.map(m => m.id));
      return;
    }

    // R9 — IntersectionObserver to pause loop when off-screen
    const el = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting && pendingRef.current) {
          pendingRef.current = false;
          runSequence();
        }
      },
      { threshold: 0.1 }
    );
    if (el) observer.observe(el);

    runSequence();

    return () => {
      clearTimers();
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // R3 — aria-hidden: componente ilustrativo, no contenido real para screen readers
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        width: '100%',
        maxWidth: '320px',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
        fontFamily: 'DM Sans, sans-serif',
        background: '#0B1014',
      }}>
      {/* Header */}
      <div style={{
        background: '#1F2C33',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{
          width: '38px', height: '38px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #00FBFB 0%, #00a8a8 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '15px', fontWeight: 800, color: '#0B1014', flexShrink: 0,
        }}>G</div>
        <div>
          <div style={{ color: '#E9EDEF', fontSize: '14px', fontWeight: 600 }}>Galia IA</div>
          <div style={{ color: '#8696A0', fontSize: '11px' }}>Clínica Médica · en línea</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '16px', color: '#8696A0' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S2.9 6 2.9 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-4.9-5.2zm-6.2 0C7.1 14.3 4 11.2 4 7.4s3.1-6.9 5.7-6.9 5.7 3.1 5.7 6.9-2.5 6.9-6 6.9z"/></svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>
        </div>
      </div>

      {/* Chat body */}
      <div style={{
        background: '#0B1014',
        padding: '12px 10px',
        minHeight: '320px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        position: 'relative',
      }}>
        <div style={{
          textAlign: 'center', fontSize: '11px', color: '#8696A0',
          background: 'rgba(255,255,255,0.05)', borderRadius: '8px',
          padding: '3px 10px', margin: '0 auto 6px', width: 'fit-content',
        }}>Hoy</div>

        {MESSAGES.map((msg) => {
          const isVisible = visible.includes(msg.id);
          const isBot = msg.from === 'bot';
          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                justifyContent: isBot ? 'flex-start' : 'flex-end',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
              }}
            >
              <div style={{
                maxWidth: '78%',
                padding: '7px 10px 5px',
                borderRadius: isBot ? '0 10px 10px 10px' : '10px 0 10px 10px',
                background: isBot ? '#1F2C33' : '#005C4B',
                position: 'relative',
              }}>
                <div style={{ color: '#E9EDEF', fontSize: '13px', lineHeight: '1.45', whiteSpace: 'pre-line' }}>
                  {msg.text}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '3px', marginTop: '3px' }}>
                  <span style={{ color: '#8696A0', fontSize: '10px' }}>{msg.time}</span>
                  {!isBot && (
                    <svg width="14" height="10" viewBox="0 0 16 11" fill="#53BDEB">
                      <path d="M11.071.653a.75.75 0 0 1 .082 1.057l-5.5 6.5a.75.75 0 0 1-1.12.024l-2.5-2.75a.75.75 0 1 1 1.114-1.006l1.938 2.133 4.93-5.876a.75.75 0 0 1 1.056-.082z"/>
                      <path d="M14.071.653a.75.75 0 0 1 .082 1.057l-5.5 6.5a.75.75 0 0 1-1.056.082.75.75 0 0 0 1.056-.082l5.5-6.5A.75.75 0 0 0 14.071.653z" opacity=".5"/>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing indicator — R2: animation handled via .typing-dot CSS class in globals.css */}
        {typing && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              padding: '10px 14px',
              borderRadius: '0 10px 10px 10px',
              background: '#1F2C33',
              display: 'flex', gap: '4px', alignItems: 'center',
            }}>
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="typing-dot"
                  style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: '#8696A0',
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div style={{
        background: '#1F2C33',
        padding: '8px 10px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{
          flex: 1, background: '#2A3942', borderRadius: '20px',
          padding: '8px 14px', color: '#8696A0', fontSize: '13px',
        }}>
          Escribí un mensaje...
        </div>
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%',
          background: '#00A884',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
