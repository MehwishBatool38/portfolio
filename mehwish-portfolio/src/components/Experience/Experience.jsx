import React from "react";

export default function Experience() {
  return (
    <section id="experience" className="section" style={{ borderTop:"1px solid var(--border)", background:"var(--cream2)" }}>
      <div className="container">
        {/* Section label */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", marginBottom:64 }}>
          <div className="label rv" style={{ marginBottom: 12, justifyContent: "center" }}>My Journey</div>
          <h2 className="display-sm rv rv-d1" style={{ marginBottom: 24 }}>Experience <span className="red">&amp; Education.</span></h2>
          <div className="rv rv-d2" style={{ width: 1, height: 40, background: "var(--border)" }} />
        </div>
        
        <div className="rv-r" style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ position:"relative" }}>
            {/* Vertical line */}
            <div style={{ position:"absolute", left:0, top:0, bottom:0, width:1, background:"var(--border)" }} />
            {[ 
              { period:"2022 — Present", role:"B.S. Software Engineering", company:"COMSATS University", desc:"Focusing on Web & Mobile development, Backend systems, and UI/UX.", accent:"var(--red)" },
              { period:"2024",           role:"Web Developer & Writer",    company:"Largify Solutions",    desc:"Internship — developing web applications and creating high-quality content.", accent:"var(--ink3)" },
              { period:"2023 — Present", role:"Freelance Developer",       company:"Self-Employed",        desc:"Building BMI calculators, Management systems, and Dice apps using Flutter & React.", accent:"var(--ink3)" },
            ].map((t, i) => (
              <div key={i} style={{ paddingLeft:28, paddingBottom: i < 2 ? 36 : 0, position:"relative" }}>
                <div style={{ position:"absolute", left:-4, top:4, width:9, height:9, borderRadius:"50%", background: i===0 ? "var(--red)" : "var(--muted2)", border:"2px solid var(--cream)" }} />
                <div style={{ fontSize:10, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--muted2)", marginBottom:6 }}>{t.period}</div>
                <div style={{ fontFamily:"var(--font-body)", fontSize:15, fontWeight:600, color:"var(--ink)", marginBottom:4 }}>{t.role}</div>
                <div style={{ fontSize:12, color: t.accent, fontWeight:600, letterSpacing:"0.04em", marginBottom:6 }}>{t.company}</div>
                <div style={{ fontSize:13, color:"var(--muted)", lineHeight:1.7 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
