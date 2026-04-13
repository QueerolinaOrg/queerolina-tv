import { useState, useEffect, useRef } from "react";

const CHECKOUT_LINKS = {
  monthly: "https://www.queerolina.org/checkout/subscribe?cartToken=0NTikrmv4aGwBrnZFAxQWQWM0Mr3UIgIdJlzmBqA",
  annual: "https://www.queerolina.org/checkout/subscribe?cartToken=wx8Ec1zDviCAGWoIQ21asdfMtoYq4UF6lUIHMTjN",
};

const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Permanent+Marker&family=Special+Elite&family=Architects+Daughter&display=swap');
`;

// hand-drawn wobbly border via SVG filter
const WOBBLE_FILTER = `
  <svg style="position:absolute;width:0;height:0">
    <defs>
      <filter id="wobble">
        <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" seed="2"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
      <filter id="wobble2">
        <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="2" result="noise" seed="8"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
      <filter id="scrawl">
        <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="noise" seed="5"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
    </defs>
  </svg>
`;

// Doodle components
function Star({ x, y, size = 20, color = "#E04040", rotate = 0 }) {
  return (
    <svg style={{ position: "absolute", left: x, top: y, transform: `rotate(${rotate}deg)`, pointerEvents: "none" }} width={size} height={size} viewBox="0 0 24 24">
      <path d="M12 2 L13.5 9 L20 9 L14.5 13 L16.5 20 L12 16 L7.5 20 L9.5 13 L4 9 L10.5 9 Z"
        fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" filter="url(#scrawl)" />
    </svg>
  );
}

function Squiggle({ x, y, width = 80, color = "#4080D0", rotate = 0 }) {
  return (
    <svg style={{ position: "absolute", left: x, top: y, transform: `rotate(${rotate}deg)`, pointerEvents: "none" }} width={width} height={20} viewBox={`0 0 ${width} 20`}>
      <path d={`M 0 10 Q ${width * 0.25} 2 ${width * 0.5} 10 Q ${width * 0.75} 18 ${width} 10`}
        fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" filter="url(#scrawl)" />
    </svg>
  );
}

function Arrow({ x, y, rotate = 0, color = "#40A040", size = 40 }) {
  return (
    <svg style={{ position: "absolute", left: x, top: y, transform: `rotate(${rotate}deg)`, pointerEvents: "none" }} width={size} height={size} viewBox="0 0 40 40">
      <path d="M 5 20 Q 20 8 32 20 M 32 20 L 26 14 M 32 20 L 26 26"
        fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" filter="url(#scrawl)" />
    </svg>
  );
}

function Circle({ x, y, size = 30, color = "#F08020" }) {
  return (
    <svg style={{ position: "absolute", left: x, top: y, pointerEvents: "none" }} width={size} height={size} viewBox="0 0 30 30">
      <circle cx="15" cy="15" r="12" fill="none" stroke={color} strokeWidth="2" filter="url(#wobble)" />
    </svg>
  );
}

function Asterisk({ x, y, color = "#8040C0", size = 24, rotate = 0 }) {
  return (
    <svg style={{ position: "absolute", left: x, top: y, transform: `rotate(${rotate}deg)`, pointerEvents: "none" }} width={size} height={size} viewBox="0 0 24 24">
      <path d="M12 2 L12 22 M2 12 L22 12 M4 4 L20 20 M20 4 L4 20"
        stroke={color} strokeWidth="2" strokeLinecap="round" filter="url(#scrawl)" />
    </svg>
  );
}

function Heart({ x, y, color = "#E04040", size = 24 }) {
  return (
    <svg style={{ position: "absolute", left: x, top: y, pointerEvents: "none" }} width={size} height={size} viewBox="0 0 24 24">
      <path d="M12 21 C12 21 3 14 3 8 C3 5 5 3 8 3 C10 3 12 5 12 5 C12 5 14 3 16 3 C19 3 21 5 21 8 C21 14 12 21 12 21Z"
        fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" filter="url(#scrawl)" />
    </svg>
  );
}

function Lightning({ x, y, color = "#D4C020", size = 28, rotate = 0 }) {
  return (
    <svg style={{ position: "absolute", left: x, top: y, transform: `rotate(${rotate}deg)`, pointerEvents: "none" }} width={size} height={size} viewBox="0 0 24 24">
      <path d="M13 2 L6 13 L11 13 L11 22 L18 11 L13 11 Z"
        fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" filter="url(#scrawl)" />
    </svg>
  );
}

function Spiral({ x, y, color = "#4080D0", size = 36 }) {
  return (
    <svg style={{ position: "absolute", left: x, top: y, pointerEvents: "none" }} width={size} height={size} viewBox="0 0 36 36">
      <path d="M18 18 Q18 12 24 12 Q30 12 30 18 Q30 26 22 26 Q12 26 12 18 Q12 8 22 8 Q32 8 33 18"
        fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" filter="url(#wobble)" />
    </svg>
  );
}

function WobblyButton({ children, onClick, style = {}, color = "#E04040" }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", background: hovered ? color : "transparent",
        color: hovered ? "#fff" : "#1a1a1a", border: `2.5px solid ${color}`,
        padding: "12px 28px", fontSize: 16, fontFamily: "'Caveat', cursive",
        fontWeight: 700, cursor: "pointer", letterSpacing: 1,
        filter: "url(#wobble2)", transition: "background 0.2s, color 0.2s",
        transform: hovered ? "scale(1.04) rotate(-1deg)" : "rotate(-1deg)",
        ...style,
      }}
    >{children}</button>
  );
}

function TapeStrip({ color, rotate = 0, style = {} }) {
  return (
    <div style={{
      width: 60, height: 18, background: color, opacity: 0.55,
      transform: `rotate(${rotate}deg)`, filter: "url(#wobble)",
      ...style,
    }} />
  );
}

function PaperTexture() {
  return (
    <div style={{
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
      backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(0,0,0,0.03) 28px),
        repeating-linear-gradient(90deg, transparent, transparent 27px, rgba(0,0,0,0.015) 28px)
      `,
    }} />
  );
}

function SignalDoodle({ size = 80 }) {
  const cx = size / 2;
  const cy = size * 0.72;
  const RAINBOW = ["#E04040", "#F08020", "#D4C020", "#40A040", "#4080D0", "#8040C0"];
  const arcs = [0.24, 0.38, 0.52, 0.66, 0.80];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: "visible", filter: "url(#scrawl)" }}>
      <circle cx={cx} cy={cy} r={size * 0.052} fill="#1a1a1a" />
      {arcs.map((r, i) => {
        const radius = size * r;
        const startX = cx - radius * Math.cos(Math.PI / 5.5);
        const startY = cy - radius * Math.sin(Math.PI / 5.5);
        const endX = cx + radius * Math.cos(Math.PI / 5.5);
        const endY = cy - radius * Math.sin(Math.PI / 5.5);
        return (
          <path key={i}
            d={`M ${startX} ${startY} Q ${cx} ${cy - radius} ${endX} ${endY}`}
            fill="none" stroke={RAINBOW[i]} strokeWidth={size * 0.042}
            strokeLinecap="round" opacity={0.9 - i * 0.05}
          />
        );
      })}
    </svg>
  );
}

function NavBar({ onSubscribe }) {
  return (
    <nav style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "16px 40px", borderBottom: "2px solid #1a1a1a",
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(253,249,240,0.95)", backdropFilter: "blur(8px)",
      filter: "url(#wobble)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, filter: "none" }}>
        <SignalDoodle size={38} />
        <div>
          <div style={{ fontSize: 20, fontFamily: "'Permanent Marker', cursive", color: "#1a1a1a", lineHeight: 1, letterSpacing: 1 }}>Queerolina</div>
          <div style={{ fontSize: 13, fontFamily: "'Caveat', cursive", color: "#888", letterSpacing: 2, lineHeight: 1.2, fontStyle: "italic" }}>tv ✦</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
        {["watch", "shows", "about"].map(l => (
          <span key={l} style={{
            fontSize: 18, fontFamily: "'Caveat', cursive", fontWeight: 600,
            color: "#555", cursor: "pointer", transition: "color 0.15s",
            textDecoration: "underline", textDecorationStyle: "wavy",
            textDecorationColor: "transparent",
          }}
            onMouseEnter={e => { e.target.style.color = "#E04040"; e.target.style.textDecorationColor = "#E04040"; }}
            onMouseLeave={e => { e.target.style.color = "#555"; e.target.style.textDecorationColor = "transparent"; }}
          >{l}</span>
        ))}
        <WobblyButton onClick={onSubscribe} color="#E04040" style={{ padding: "8px 20px", fontSize: 15 }}>
          subscribe! $4.99/mo
        </WobblyButton>
      </div>
    </nav>
  );
}

function Hero({ onSubscribe }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 120); }, []);

  return (
    <section style={{
      minHeight: "90vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", textAlign: "center",
      padding: "80px 40px 60px", position: "relative", overflow: "hidden",
    }}>
      {/* scattered background doodles */}
      <Star x={40} y={60} size={28} color="#E04040" rotate={15} />
      <Star x={120} y={140} size={18} color="#F08020" rotate={-20} />
      <Circle x={60} y={200} size={40} color="#4080D0" />
      <Squiggle x={20} y={320} width={100} color="#40A040" rotate={-10} />
      <Arrow x={180} y={80} color="#8040C0" rotate={30} />
      <Heart x={90} y={380} color="#E04040" size={28} />
      <Lightning x={160} y={250} color="#D4C020" size={32} rotate={-15} />
      <Spiral x={30} y={460} color="#4080D0" size={44} />
      <Asterisk x={140} y={500} color="#F08020" size={20} rotate={22} />

      <Star x="calc(100% - 80px)" y={80} size={32} color="#40A040" rotate={-10} />
      <Circle x="calc(100% - 120px)" y={160} size={36} color="#E04040" />
      <Arrow x="calc(100% - 160px)" y={280} color="#F08020" rotate={150} />
      <Squiggle x="calc(100% - 200px)" y={360} width={90} color="#8040C0" rotate={8} />
      <Lightning x="calc(100% - 100px)" y={420} color="#4080D0" size={28} rotate={20} />
      <Heart x="calc(100% - 80px)" y={500} color="#D4C020" size={24} />
      <Asterisk x="calc(100% - 140px)" y={120} color="#E04040" size={22} rotate={-15} />
      <Spiral x="calc(100% - 170px)" y={480} color="#40A040" size={38} />

      <div style={{
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0) rotate(-1deg)" : "translateY(32px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
        display: "flex", flexDirection: "column", alignItems: "center", position: "relative",
      }}>
        {/* tape strips on signal icon */}
        <div style={{ position: "relative", marginBottom: 20 }}>
          <TapeStrip color="#E04040" rotate={-12} style={{ position: "absolute", top: -8, left: -16, zIndex: 2 }} />
          <TapeStrip color="#4080D0" rotate={8} style={{ position: "absolute", top: -6, right: -14, zIndex: 2 }} />
          <SignalDoodle size={120} />
        </div>

        {/* main title */}
        <div style={{ position: "relative", marginBottom: 4 }}>
          <h1 style={{
            fontSize: "clamp(52px, 9vw, 96px)", fontFamily: "'Permanent Marker', cursive",
            color: "#1a1a1a", margin: 0, lineHeight: 0.9, letterSpacing: -1,
            transform: "rotate(-2deg)",
          }}>Queerolina</h1>
          <Star x="calc(100% + 4px)" y={-10} size={22} color="#E04040" rotate={10} />
        </div>

        <div style={{
          fontSize: "clamp(32px, 5vw, 56px)", fontFamily: "'Caveat', cursive", fontWeight: 700,
          color: "#E04040", transform: "rotate(1.5deg)", marginBottom: 24, letterSpacing: 2,
        }}>tv ✦</div>

        {/* wavy underline doodle */}
        <svg width="320" height="16" viewBox="0 0 320 16" style={{ marginBottom: 28, filter: "url(#scrawl)" }}>
          <path d="M 0 8 Q 40 2 80 8 Q 120 14 160 8 Q 200 2 240 8 Q 280 14 320 8"
            fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />
        </svg>

        {/* tagline on sticky note */}
        <div style={{
          background: "#FFF176", padding: "16px 28px", transform: "rotate(-1.5deg)",
          marginBottom: 40, position: "relative", boxShadow: "3px 4px 0px rgba(0,0,0,0.15)",
          filter: "url(#wobble)",
        }}>
          <TapeStrip color="#F08020" rotate={-8} style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%) rotate(-8deg)", zIndex: 2 }} />
          <p style={{
            fontSize: 20, fontFamily: "'Caveat', cursive", fontWeight: 600,
            color: "#1a1a1a", margin: 0, letterSpacing: 0.5,
          }}>queer culture like you've never seen it before</p>
        </div>

        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
          <WobblyButton onClick={onSubscribe} color="#E04040" style={{ fontSize: 18, transform: "rotate(-2deg)" }}>
            ★ subscribe now! ★
          </WobblyButton>
          <WobblyButton onClick={() => {}} color="#4080D0" style={{ fontSize: 18, transform: "rotate(1.5deg)" }}>
            watch free ep →
          </WobblyButton>
        </div>
      </div>
    </section>
  );
}

const SHOWS = [
  {
    title: "Code Xero", subtitle: "debut series!!",
    desc: "A drag competition unlike ANYTHING you've seen. Ten contestants. Eight weeks. One crown.",
    tag: "NOW STREAMING 🎬", accent: "#E04040",
    bg: "#FFE0E0", tape: "#E04040", rotate: -1.5, featured: true,
  },
  {
    title: "The Queer Vision", subtitle: "podcast",
    desc: "Community conversations + big queer ideas from across the Carolinas.",
    tag: "🎙 audio", accent: "#8040C0",
    bg: "#EDE0FF", tape: "#8040C0", rotate: 1.2,
  },
  {
    title: "Nasty Queer", subtitle: "event coverage",
    desc: "Behind the scenes of Durham's wildest nights. Raves, drag, everything.",
    tag: "🔜 coming soon", accent: "#4080D0",
    bg: "#E0EEFF", tape: "#4080D0", rotate: -0.8,
  },
  {
    title: "More soon!", subtitle: "in production ✦",
    desc: "New shows, new voices, new worlds. The signal is just getting started.",
    tag: "👀 stay tuned", accent: "#40A040",
    bg: "#E0FFE8", tape: "#40A040", rotate: 1.8,
  },
];

function ShowCard({ show }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: show.featured ? "0 0 280px" : "0 0 220px",
        background: show.bg, position: "relative",
        border: `2.5px solid #1a1a1a`, padding: "20px 16px 16px",
        cursor: "pointer", filter: "url(#wobble2)",
        transform: hovered
          ? `rotate(${show.rotate * -0.5}deg) scale(1.04) translateY(-6px)`
          : `rotate(${show.rotate}deg)`,
        transition: "transform 0.25s ease",
        boxShadow: hovered ? "5px 6px 0px rgba(0,0,0,0.18)" : "3px 4px 0px rgba(0,0,0,0.12)",
      }}
    >
      <TapeStrip color={show.tape} rotate={-6} style={{
        position: "absolute", top: -10, left: "50%",
        transform: "translateX(-50%) rotate(-6deg)", zIndex: 2,
      }} />

      <div style={{
        fontSize: show.featured ? 22 : 17, fontFamily: "'Permanent Marker', cursive",
        color: "#1a1a1a", marginBottom: 4, lineHeight: 1.1,
      }}>{show.title}</div>

      <div style={{
        fontSize: 13, fontFamily: "'Caveat', cursive", fontWeight: 600,
        color: show.accent, marginBottom: 10, letterSpacing: 0.5,
      }}>{show.subtitle}</div>

      <div style={{
        width: "100%", height: 1.5, background: "#1a1a1a",
        marginBottom: 10, filter: "url(#scrawl)",
      }} />

      <div style={{
        fontSize: 14, fontFamily: "'Architects Daughter', cursive",
        color: "#333", lineHeight: 1.5, marginBottom: 12,
      }}>{show.desc}</div>

      <div style={{
        display: "inline-block", fontSize: 12, fontFamily: "'Caveat', cursive",
        fontWeight: 700, background: "#1a1a1a", color: "#fff",
        padding: "3px 10px", letterSpacing: 0.5,
        filter: "url(#wobble)",
      }}>{show.tag}</div>
    </div>
  );
}

function ShowsSection() {
  return (
    <section style={{ padding: "40px 40px 80px", borderTop: "2.5px solid #1a1a1a", position: "relative" }}>
      <Star x={20} y={20} size={22} color="#F08020" rotate={5} />
      <Squiggle x={60} y={30} width={120} color="#E04040" rotate={-5} />

      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 40 }}>
        <div style={{ position: "relative" }}>
          <h2 style={{
            fontSize: 36, fontFamily: "'Permanent Marker', cursive",
            color: "#1a1a1a", margin: 0, transform: "rotate(-1deg)",
            display: "inline-block",
          }}>now streaming ↓</h2>
          <Squiggle x={0} y={38} width={260} color="#E04040" />
        </div>
        <span style={{
          fontSize: 18, fontFamily: "'Caveat', cursive", fontWeight: 700,
          color: "#4080D0", cursor: "pointer", textDecoration: "underline",
          textDecorationStyle: "wavy",
        }}>see everything →</span>
      </div>

      <div style={{
        display: "flex", gap: 32, overflowX: "auto", paddingBottom: 24,
        paddingTop: 16, alignItems: "flex-start",
      }}>
        {SHOWS.map((show, i) => <ShowCard key={i} show={show} />)}
      </div>
    </section>
  );
}

function SubscribeModal({ onClose }) {
  const [plan, setPlan] = useState("monthly");

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, padding: 24,
    }} onClick={onClose}>
      <div style={{
        background: "#FDF9F0", border: "3px solid #1a1a1a",
        padding: "48px 40px", width: "100%", maxWidth: 460,
        position: "relative", filter: "url(#wobble2)",
        boxShadow: "8px 8px 0px rgba(0,0,0,0.2)",
        transform: "rotate(-0.5deg)",
      }} onClick={e => e.stopPropagation()}>
        <TapeStrip color="#E04040" rotate={-10} style={{ position: "absolute", top: -12, left: "30%", zIndex: 2 }} />
        <TapeStrip color="#4080D0" rotate={8} style={{ position: "absolute", top: -10, right: "25%", zIndex: 2 }} />

        <button onClick={onClose} style={{
          position: "absolute", top: 14, right: 18, background: "none",
          border: "none", fontSize: 24, cursor: "pointer", fontFamily: "'Caveat', cursive",
          color: "#888",
        }}>✕</button>

        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <SignalDoodle size={50} />
          <h2 style={{
            fontSize: 32, fontFamily: "'Permanent Marker', cursive",
            color: "#1a1a1a", margin: "12px 0 4px", transform: "rotate(-1.5deg)",
            display: "inline-block",
          }}>join the signal!</h2>
          <div style={{ fontSize: 15, fontFamily: "'Caveat', cursive", color: "#888" }}>
            queer culture like you've never seen it ✦
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
          {[
            { key: "monthly", label: "monthly", price: "$4.99/mo", color: "#E04040" },
            { key: "annual", label: "annual", price: "$50/yr", note: "save 17%!", color: "#40A040" },
          ].map(p => (
            <div key={p.key} onClick={() => setPlan(p.key)} style={{
              flex: 1, padding: "16px 12px", border: `2.5px solid ${plan === p.key ? p.color : "#ccc"}`,
              cursor: "pointer", textAlign: "center", position: "relative",
              background: plan === p.key ? p.color + "15" : "transparent",
              filter: "url(#wobble2)", transition: "border-color 0.2s, background 0.2s",
              boxShadow: plan === p.key ? `3px 3px 0px ${p.color}55` : "none",
            }}>
              {p.note && (
                <div style={{
                  position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)",
                  background: "#40A040", color: "#fff", fontSize: 11,
                  fontFamily: "'Caveat', cursive", fontWeight: 700,
                  padding: "2px 10px", filter: "url(#wobble)",
                }}>{p.note}</div>
              )}
              <div style={{ fontSize: 14, fontFamily: "'Caveat', cursive", color: "#888", marginBottom: 4 }}>{p.label}</div>
              <div style={{ fontSize: 24, fontFamily: "'Permanent Marker', cursive", color: "#1a1a1a" }}>{p.price}</div>
            </div>
          ))}
        </div>

        <WobblyButton
          onClick={() => window.open(CHECKOUT_LINKS[plan], "_blank")}
          color="#E04040"
          style={{ width: "100%", fontSize: 20, padding: "14px", marginBottom: 12, display: "block" }}
        >
          let's go! ★
        </WobblyButton>

        <div style={{
          fontSize: 13, fontFamily: "'Caveat', cursive", color: "#aaa",
          textAlign: "center", letterSpacing: 0.5,
        }}>cancel anytime ~ made by us, for us 🏳️‍🌈</div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{
      borderTop: "2.5px solid #1a1a1a", padding: "28px 40px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: 16, position: "relative",
      background: "#FDF9F0",
    }}>
      <Star x={10} y={10} size={18} color="#F08020" rotate={12} />
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <SignalDoodle size={28} />
        <span style={{ fontSize: 18, fontFamily: "'Permanent Marker', cursive", color: "#1a1a1a" }}>
          Queerolina tv
        </span>
      </div>
      <div style={{ fontSize: 15, fontFamily: "'Caveat', cursive", color: "#aaa" }}>
        © 2025 Queerolina LLP · Durham, NC ✦
      </div>
      <div style={{ display: "flex", gap: 20 }}>
        {[
          { label: "instagram ✦", url: "https://instagram.com/queerolina" },
          { label: "tiktok", url: "https://tiktok.com/@queerolina" },
          { label: "patreon ♥", url: "https://patreon.com/queerolina" },
        ].map(s => (
          <a key={s.label} href={s.url} target="_blank" rel="noreferrer" style={{
            fontSize: 16, fontFamily: "'Caveat', cursive", fontWeight: 700,
            color: "#888", textDecoration: "none", transition: "color 0.2s",
          }}
            onMouseEnter={e => e.target.style.color = "#E04040"}
            onMouseLeave={e => e.target.style.color = "#888"}
          >{s.label}</a>
        ))}
      </div>
    </footer>
  );
}

export default function QueerOlinaTV() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <style>{FONTS}</style>
      <div dangerouslySetInnerHTML={{ __html: WOBBLE_FILTER }} />
      <PaperTexture />
      <div style={{ background: "#FDF9F0", minHeight: "100vh", color: "#1a1a1a", position: "relative" }}>
        <NavBar onSubscribe={() => setModalOpen(true)} />
        <Hero onSubscribe={() => setModalOpen(true)} />
        <ShowsSection />
        <Footer />
        {modalOpen && <SubscribeModal onClose={() => setModalOpen(false)} />}
      </div>
    </>
  );
}
