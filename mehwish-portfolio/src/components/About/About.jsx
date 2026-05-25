
import PropTypes from "prop-types";

const ABOUT_SUMMARY =
  "Software Engineering student at COMSATS and a full-stack web developer passionate about crafting seamless web experiences. Skilled in both frontend and backend technologies, with additional expertise in Flutter for mobile development. Eager to build innovative digital products that make a difference.";

function About({ info }) {
  return (
    <section id="about" className="section" style={{ borderTop:"1px solid var(--border)" }}>
      <div className="container">

        {/* Section label */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", marginBottom:64 }}>
          <div className="label rv" style={{ marginBottom: 12, justifyContent: "center" }}>Who I Am</div>
          <h2 className="display-sm rv rv-d1" style={{ marginBottom: 24 }}>About <span className="red">Me.</span></h2>
          <div className="rv rv-d2" style={{ width: 1, height: 40, background: "var(--border)" }} />
        </div>

        <div className="about-grid" style={{ display:"grid", gridTemplateColumns:"1fr", gap:80, alignItems:"start" }}>
          {/* Left */}
          <div>
            <p style={{ fontSize:20, fontFamily:"var(--font-serif)", fontStyle:"italic", color:"var(--ink2)", lineHeight:1.75, marginBottom:40 }} className="rv">
              "{info?.bio}"
            </p>
            <p style={{ fontSize:16, color:"var(--ink)", lineHeight:1.6, marginBottom:40 }} className="rv">{ABOUT_SUMMARY}</p>
            <hr className="hr" style={{ marginBottom:36 }} />
            <div className="about-info-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:0 }}>
              {[
                { l:"University", v: info?.university, i:"🎓" },
                { l:"Location",   v: info?.location,   i:"📍" },
                { l:"Email",      v: info?.email,      i:"✉️" },
                { l:"Experience", v:`${info?.years_exp ?? 2}+ Years`, i:"⚡" },
              ].map((item, idx) => (
                <div key={item.l} className="rv" style={{
                  padding:"20px 0",
                  borderBottom:"1px solid var(--border)",
                  borderRight: idx % 2 === 0 ? "1px solid var(--border)" : "none",
                  paddingRight: idx % 2 === 0 ? 24 : 0,
                  paddingLeft: idx % 2 === 1 ? 24 : 0,
                  animationDelay: `${idx * 0.1}s`,
                }}>
                  <div style={{ fontSize:10, fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--muted)", marginBottom:6 }}>{item.l}</div>
                  <div style={{ fontSize:14, color:"var(--ink)", fontWeight:500, wordBreak:"break-word" }}>{item.v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop:36 }} className="rv rv-d2">
              <a href={info?.github} target="_blank" rel="noreferrer" className="btn-dark">
                <span>View GitHub</span><span>↗</span>
              </a>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}

About.propTypes = {
  info: PropTypes.shape({
    bio: PropTypes.string,
    university: PropTypes.string,
    location: PropTypes.string,
    email: PropTypes.string,
    years_exp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    github: PropTypes.string,
  }),
};

export default About;
