import { useState, useEffect } from "react";

const RAINBOW = ["#E04040", "#F08020", "#D4C020", "#40A040", "#4080D0", "#8040C0"];

const CHECKOUT_LINKS = {
  monthly: "https://www.queerolina.org/checkout/subscribe?cartToken=0NTikrmv4aGwBrnZFAxQWQWM0Mr3UIgIdJlzmBqA",
  annual: "https://www.queerolina.org/checkout/subscribe?cartToken=wx8Ec1zDviCAGWoIQ21asdfMtoYq4UF6lUIHMTjN",
};

function SignalIcon({ size = 60, animated = false }) {
  const arcs = [
    { r: 0.28, stroke: RAINBOW[0] },
    { r: 0.44, stroke: RAINBOW[1] },
    { r: 0.60, stroke: RAINBOW[2] },
    { r: 0.76, stroke: RAINBOW[3] },
    { r: 0.90, stroke: RAINBOW[4] },
  ];
  const cx = size / 2;
  const cy = size * 0.78;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: "visible" }}>
      <style>{`
        @keyframes arcPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        ${animated ? arcs.map((_, i) => `
          .arc-${i} { animation: arcPulse 2s ease-in-out infinite; animation-delay: ${i * 0.18}s; }
        `).join("") : ""}
      `}</style>
      <circle cx={cx} cy={cy} r={size * 0.055} fill="white" />
      {arcs.map((arc, i) => {
        const r = size * arc.r;
        const startX = cx - r * Math.cos(Math.PI / 6);
        const startY = cy - r * Math.sin(Math.PI / 6);
        const endX = cx + r * Math.cos(Math.PI / 6);
        const endY = cy - r * Math.sin(Math.PI / 6);
        const topX = cx;
        const topY = cy - r;
        return (
          <path
            key={i}
            className={animated ? `arc-${i}` : ""}
            d={`M ${startX} ${startY} Q ${topX} ${topY} ${endX} ${endY}`}
            fill="none"
            stroke={arc.stroke}
            strokeWidth={size * 0.038}
            strokeLinecap="round"
            opacity={1 - i * 0.08}
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
      padding: "18px 40px", borderBottom: "0.5px solid #1e1e1e",
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(8,8,8,0.92)", backdropFilter: "blur(12px)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <SignalIcon size={32} />
        <div>
          <div style={{ fontSize: 13, fontWeight: 500, letterSpacing: 5, color: "#fff", lineHeight: 1, fontFamily: "'Barlow', sans-serif" }}>QUEEROLINA</div>
          <div style={{ fontSize: 10, fontStyle: "italic", color: "#666", letterSpacing: 5, lineHeight: 1.6, fontFamily: "'Cormorant Garamond', serif" }}>tv</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        {["WATCH", "SHOWS", "ABOUT"].map(l => (
          <span key={l} style={{ fontSize: 11, letterSpacing: 2, color: "#666", cursor: "pointer", transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = "#fff"}
            onMouseLeave={e => e.target.style.color = "#666"}>{l}</span>
        ))}
        <button onClick={onSubscribe} style={{
          background: "#fff", color: "#080808", border: "none",
          padding: "9px 22px", fontSize: 11, fontWeight: 600, letterSpacing: 2,
          cursor: "pointer", borderRadius: 2, fontFamily: "'Barlow', sans-serif",
          transition: "opacity 0.2s",
        }}
          onMouseEnter={e => e.target.style.opacity = 0.85}
          onMouseLeave={e => e.target.style.opacity = 1}
        >SUBSCRIBE</button>
      </div>
    </nav>
  );
}

function Hero({ onSubscribe }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <section style={{
      minHeight: "88vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", textAlign: "center",
      padding: "80px 40px 60px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.9s ease, transform 0.9s ease",
        display: "flex", flexDirection: "column", alignItems: "center",
      }}>
        <div style={{ marginBottom: 28, opacity: visible ? 1 : 0, transition: "opacity 1.2s ease 0.2s" }}>
          <SignalIcon size={110} animated={true} />
        </div>

        <h1 style={{
          fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 500,
          letterSpacing: "clamp(8px, 2vw, 18px)", color: "#fff",
          margin: 0, lineHeight: 1, fontFamily: "'Barlow', sans-serif",
          opacity: visible ? 1 : 0, transition: "opacity 1s ease 0.4s",
        }}>QUEEROLINA</h1>

        <div style={{
          display: "flex", alignItems: "center", gap: 20, margin: "14px 0 40px",
          opacity: visible ? 1 : 0, transition: "opacity 1s ease 0.55s",
        }}>
          <div style={{ height: "0.5px", width: 80, background: "#2a2a2a" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontStyle: "italic", color: "#555", letterSpacing: 12 }}>tv</span>
          <div style={{ height: "0.5px", width: 80, background: "#2a2a2a" }} />
        </div>

        <p style={{
          fontSize: 11, letterSpacing: 3, color: "#555", margin: "0 0 48px",
          fontFamily: "'Barlow', sans-serif",
          opacity: visible ? 1 : 0, transition: "opacity 1s ease 0.7s",
        }}>QUEER CULTURE LIKE YOU'VE NEVER SEEN IT BEFORE</p>

        <div style={{
          display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center",
          opacity: visible ? 1 : 0, transition: "opacity 1s ease 0.85s",
        }}>
          <button onClick={onSubscribe} style={{
            background: "#fff", color: "#080808", border: "none",
            padding: "15px 40px", fontSize: 11, fontWeight: 600, letterSpacing: 2.5,
            cursor: "pointer", borderRadius: 2, fontFamily: "'Barlow', sans-serif",
            transition: "transform 0.15s",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >SUBSCRIBE NOW</button>
          <button style={{
            background: "transparent", color: "#fff", border: "0.5px solid #333",
            padding: "15px 40px", fontSize: 11, fontWeight: 500, letterSpacing: 2.5,
            cursor: "pointer", borderRadius: 2, fontFamily: "'Barlow', sans-serif",
            transition: "border-color 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#666"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#333"}
          >WATCH FREE EPISODE</button>
        </div>
      </div>
    </section>
  );
}

const SHOWS = [
  {
    title: "CODE XERO", subtitle: "DEBUT SERIES",
    desc: "An online drag competition unlike anything you've seen. Ten contestants. Eight weeks. One crown.",
    tag: "NOW STREAMING", accent: "#E04040",
    bg: "linear-gradient(135deg, #1a0a2e 0%, #0d1228 50%, #100a1a 100%)",
    featured: true,
  },
  {
    title: "THE QUEER VISION", subtitle: "PODCAST",
    desc: "Community conversations, big ideas, and queer perspectives from across the Carolinas.",
    tag: "AUDIO", accent: "#c06060",
    bg: "linear-gradient(135deg, #1a0a0a 0%, #200a0a 100%)",
  },
  {
    title: "NASTY QUEER", subtitle: "EVENT COVERAGE",
    desc: "Behind the scenes of Durham's wildest queer events. Raves, drag, and everything between.",
    tag: "COMING SOON", accent: "#4080D0",
    bg: "linear-gradient(135deg, #050d1a 0%, #0a1020 100%)",
  },
  {
    title: "MORE FROM\nQUEEROLINA", subtitle: "IN PRODUCTION",
    desc: "New shows, new voices, new worlds. The signal is just getting started.",
    tag: "2025", accent: "#8040C0",
    bg: "linear-gradient(135deg, #0a0510 0%, #100a15 100%)",
  },
];

function ShowCard({ show }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: show.featured ? "0 0 300px" : "0 0 220px",
        background: "#0f0f0f", borderRadius: 8,
        border: `0.5px solid ${hovered ? show.accent + "66" : "#1e1e1e"}`,
        overflow: "hidden", cursor: "pointer",
        transition: "border-color 0.3s, transform 0.3s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <div style={{
        height: show.featured ? 180 : 140, background: show.bg,
        display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
      }}>
        <div style={{ textAlign: "center" }}>
          {show.title.split("\n").map((line, i) => (
            <div key={i} style={{
              fontSize: show.featured ? 20 : 15, fontWeight: 500,
              letterSpacing: show.featured ? 6 : 4, color: "#fff",
              fontFamily: "'Barlow', sans-serif", lineHeight: 1.3,
            }}>{line}</div>
          ))}
          <div style={{ width: 36, height: 1, background: show.accent, margin: "10px auto 0" }} />
        </div>
        {show.featured && (
          <div style={{
            position: "absolute", top: 12, right: 12, background: show.accent,
            color: "#fff", fontSize: 9, letterSpacing: 2, padding: "4px 8px",
            fontFamily: "'Barlow', sans-serif", fontWeight: 600,
          }}>FEATURED</div>
        )}
      </div>
      <div style={{ padding: "14px 16px" }}>
        <div style={{ fontSize: 9, letterSpacing: 2.5, color: show.accent, marginBottom: 6, fontFamily: "'Barlow', sans-serif" }}>{show.tag}</div>
        <div style={{ fontSize: 11, color: "#888", lineHeight: 1.6, fontFamily: "'Barlow', sans-serif" }}>{show.desc}</div>
      </div>
    </div>
  );
}

function ShowsSection() {
  return (
    <section style={{ padding: "60px 40px 80px", borderTop: "0.5px solid #111" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 32 }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: "#444", fontFamily: "'Barlow', sans-serif" }}>NOW STREAMING</div>
        <div style={{ fontSize: 10, letterSpacing: 2, color: "#333", cursor: "pointer", fontFamily: "'Barlow', sans-serif" }}>VIEW ALL →</div>
      </div>
      <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8 }}>
        {SHOWS.map((show, i) => <ShowCard key={i} show={show} />)}
      </div>
    </section>
  );
}

function SubscribeModal({ onClose }) {
  const [plan, setPlan] = useState("monthly");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, padding: 24,
    }} onClick={onClose}>
      <div style={{
        background: "#0e0e0e", border: "0.5px solid #2a2a2a",
        borderRadius: 12, padding: "48px 40px", width: "100%", maxWidth: 480,
        position: "relative",
      }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 20, background: "none",
          border: "none", color: "#444", fontSize: 20, cursor: "pointer", lineHeight: 1,
        }}>×</button>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <SignalIcon size={60} animated />
            <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: 4, color: "#fff", margin: "24px 0 12px", fontFamily: "'Barlow', sans-serif" }}>YOU'RE IN.</div>
            <div style={{ fontSize: 12, color: "#555", letterSpacing: 1, fontFamily: "'Barlow', sans-serif" }}>Welcome to the signal. Check your inbox.</div>
          </div>
        ) : (
          <>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ fontSize: 11, letterSpacing: 3, color: "#555", marginBottom: 12, fontFamily: "'Barlow', sans-serif" }}>JOIN QUEEROLINA TV</div>
              <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: 6, color: "#fff", fontFamily: "'Barlow', sans-serif" }}>SUBSCRIBE</div>
            </div>

            <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
              {[
                { key: "monthly", label: "MONTHLY", price: "$4.99/mo" },
                { key: "annual", label: "ANNUAL", price: "$50/yr", note: "SAVE 17%" },
              ].map(p => (
                <div key={p.key} onClick={() => setPlan(p.key)} style={{
                  flex: 1, padding: "16px 12px",
                  border: `0.5px solid ${plan === p.key ? "#fff" : "#2a2a2a"}`,
                  borderRadius: 6, cursor: "pointer", textAlign: "center",
                  transition: "border-color 0.2s", position: "relative",
                }}>
                  {p.note && <div style={{
                    position: "absolute", top: -9, left: "50%", transform: "translateX(-50%)",
                    background: RAINBOW[3], color: "#fff", fontSize: 8, letterSpacing: 1.5,
                    padding: "2px 8px", fontFamily: "'Barlow', sans-serif", fontWeight: 600,
                  }}>{p.note}</div>}
                  <div style={{ fontSize: 9, letterSpacing: 2, color: "#555", marginBottom: 6, fontFamily: "'Barlow', sans-serif" }}>{p.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 500, color: "#fff", fontFamily: "'Barlow', sans-serif" }}>{p.price}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => window.open(CHECKOUT_LINKS[plan], "_blank")}
              style={{
                width: "100%", background: "#fff", color: "#080808", border: "none",
                padding: "14px", fontSize: 11, fontWeight: 600, letterSpacing: 2.5,
                cursor: "pointer", borderRadius: 2, fontFamily: "'Barlow', sans-serif",
                marginBottom: 14,
              }}>GET STARTED →</button>
            <div style={{ fontSize: 10, color: "#333", textAlign: "center", letterSpacing: 1, fontFamily: "'Barlow', sans-serif" }}>
              Cancel anytime. Made by us, for us.
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{
      borderTop: "0.5px solid #111", padding: "32px 40px",
      display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <SignalIcon size={22} />
        <span style={{ fontSize: 10, letterSpacing: 3, color: "#333", fontFamily: "'Barlow', sans-serif" }}>QUEEROLINA TV</span>
      </div>
      <div style={{ fontSize: 10, color: "#2a2a2a", letterSpacing: 1, fontFamily: "'Barlow', sans-serif" }}>
        © 2025 QUEEROLINA LLP · DURHAM, NC
      </div>
      <div style={{ display: "flex", gap: 20 }}>
        {[
          { label: "INSTAGRAM", url: "https://instagram.com/queerolina" },
          { label: "TIKTOK", url: "https://tiktok.com/@queerolina" },
          { label: "PATREON", url: "https://patreon.com/queerolina" },
        ].map(s => (
          <a key={s.label} href={s.url} target="_blank" rel="noreferrer" style={{
            fontSize: 10, letterSpacing: 1.5, color: "#333", cursor: "pointer",
            fontFamily: "'Barlow', sans-serif", textDecoration: "none", transition: "color 0.2s",
          }}
            onMouseEnter={e => e.target.style.color = "#fff"}
            onMouseLeave={e => e.target.style.color = "#333"}
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
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,400;1,400&display=swap" rel="stylesheet" />
      <div style={{ background: "#080808", minHeight: "100vh", color: "#fff" }}>
        <NavBar onSubscribe={() => setModalOpen(true)} />
        <Hero onSubscribe={() => setModalOpen(true)} />
        <ShowsSection />
        <Footer />
        {modalOpen && <SubscribeModal onClose={() => setModalOpen(false)} />}
      </div>
    </>
  );
}
