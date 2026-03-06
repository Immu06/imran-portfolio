import { useState, useEffect } from "react";

// ─── RESPONSIVE CSS ──────────────────────────────────────────────────────────
const MOBILE_CSS = `
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: #060f1a; }

  .hero-grid { display: grid; grid-template-columns: 1fr 220px; gap: 28px; align-items: start; margin-bottom: 20px; }
  .hero-profile-card { display: block; }
  .hero-tags { display: grid; grid-template-columns: repeat(auto-fill, minmax(185px,1fr)); gap: 10px; margin-bottom: 10px; }
  .hero-stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; }
  .about-top { display: grid; grid-template-columns: 1fr; gap: 16px; }
  .about-stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; }
  .about-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .mobile-profile { display: none; }
  .hero-ctas { display: flex; flex-wrap: wrap; gap: 10px; }

  @media (max-width: 640px) {
    .hero-grid { grid-template-columns: 1fr; gap: 16px; margin-bottom: 16px; }
    .hero-profile-card { display: none !important; }

    .hero-tags { grid-template-columns: 1fr 1fr; gap: 8px; }
    .hero-tag-item { padding: 12px 14px !important; }
    .hero-tag-icon { width: 32px !important; height: 32px !important; border-radius: 8px !important; }
    .hero-tag-icon svg { width: 15px !important; height: 15px !important; }
    .hero-tag-label { font-size: 11px !important; }

    .hero-stats { grid-template-columns: repeat(2,1fr); gap: 8px; }
    .hero-stat-item { padding: 14px 10px !important; }

    .hero-ctas { gap: 8px; }
    .hero-cta-btn { padding: 10px 16px !important; font-size: 11px !important; flex: 1; min-width: 0; justify-content: center; }

    .about-top { grid-template-columns: 1fr; gap: 14px; }
    .about-stats { grid-template-columns: repeat(3,1fr); gap: 8px; }
    .about-two-col { grid-template-columns: 1fr; gap: 14px; }
    .mobile-profile { display: block; }

    .hero-name { font-size: clamp(38px, 12vw, 56px) !important; }
    .hero-desc { font-size: 14px !important; max-width: 100% !important; }
  }
`;

// ─── DATA ───────────────────────────────────────────────────────────────────

const skillsData = [
  { id: 1,  name: "IT Support (L1/L2)",    level: 90 },
  { id: 2,  name: "Windows & macOS",        level: 85 },
  { id: 3,  name: "Active Directory",       level: 78 },
  { id: 4,  name: "Office 365",             level: 80 },
  { id: 5,  name: "Computer Networks",      level: 75 },
  { id: 6,  name: "Ticketing Systems",      level: 85 },
  { id: 7,  name: "Hardware Troubleshoot",  level: 88 },
  { id: 8,  name: "Endpoint Security",      level: 72 },
  { id: 9,  name: "AWS Solutions Arch.",    level: 45 },
  { id: 10, name: "TCP/IP Networking",      level: 70 },
  { id: 11, name: "System Maintenance",     level: 80 },
  { id: 12, name: "Customer Support",       level: 88 },
];

const experienceData = [
  {
    id: 1, date: "Dec 2025 – Present", tenure: "Present", title: "IT Support Analyst",
    org: "Max Spare Limited", location: "Thane, MH", type: "Full-time", current: true,
    color: "#2563eb", accentGrad: "linear-gradient(90deg,#2563eb,#0d9488)",
    metrics: [{ val: "100+", lbl: "Users" }, { val: "99%", lbl: "SLA" }, { val: "L1/L2", lbl: "Support" }],
    highlights: [
      "Deliver L1/L2 IT support to 100+ end users, maintaining 99%+ uptime across hardware, software, and network systems.",
      "Resolve tickets within SLA targets using ServiceNow, achieving consistently high user satisfaction scores.",
      "Spearheaded system patching cycles that reduced security vulnerabilities by enforcing endpoint compliance.",
      "Onboard new joiners end-to-end — account provisioning, device setup, and access configuration.",
    ],
    skills: ["IT Support", "ServiceNow", "Windows 10/11", "SLA Management", "Endpoint Security", "Patch Management"],
  },
  {
    id: 2, date: "Dec 2022 – Nov 2025", tenure: "3 yrs", title: "Assistant IT",
    org: "Max Spare Limited", location: "Thane, MH", type: "Full-time", current: false,
    color: "#0d9488", accentGrad: null,
    metrics: [{ val: "AD", lbl: "Built from scratch" }, { val: "O365", lbl: "Managed" }, { val: "3 yrs", lbl: "Tenure" }],
    highlights: [
      "Built and deployed the company's Active Directory infrastructure — OU design, user provisioning, and group policies.",
      "Provided frontline desktop support, resolving hardware, software, and connectivity issues with minimal escalation.",
      "Managed Office 365 configuration and Outlook troubleshooting for all staff.",
      "Maintained endpoint security through antivirus checks, system backups, and patch management.",
    ],
    skills: ["Active Directory", "Group Policy", "Office 365", "Outlook", "RBAC", "Backup & Recovery"],
  },
  {
    id: 3, date: "Jun 2019 – Nov 2022", tenure: "3.5 yrs", title: "IT Assistant",
    org: "Trans-Net Technologies", location: "Mumbai, MH", type: "Full-time", current: false,
    color: "#6366f1", accentGrad: null,
    metrics: [{ val: "Multi", lbl: "Client Sites" }, { val: "Fast", lbl: "Turnaround" }, { val: "3.5 yrs", lbl: "Tenure" }],
    highlights: [
      "Supported senior engineers configuring desktops, laptops, and network devices across multiple client sites.",
      "Built reputation for reliable, fast-turnaround support with high user satisfaction.",
      "Maintained accurate asset inventory and documentation, streamlining audit processes.",
      "Assisted in network upgrades and troubleshooting activities improving overall system stability.",
    ],
    skills: ["Desktop Support", "Network Devices", "Asset Management", "Documentation", "LAN Troubleshooting"],
  },
];

const projectsData = [
  {
    id: 1,
    svgPath: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    color: "#2563eb",
    title: "Active Directory Infrastructure Build",
    org: "Max Spare Limited · 2023–2024",
    desc: "Designed and deployed a full Active Directory environment from scratch. Structured OUs to reflect department hierarchy, provisioned user accounts, assigned role-based permissions and group policies, and enforced access controls for secure resource access.",
    tags: ["Active Directory", "Windows Server", "OU Design", "Group Policy", "RBAC", "Access Control"],
  },
];

const educationData = [
  {
    id: 1, date: "2023 – 2025", title: "Master of Computer Applications", short: "MCA",
    org: "University of Mumbai", badge: "Completed", color: "#7c3aed", accentBg: "#4c1d95",
    svgPath: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
    focus: "Advanced IT Systems, Cloud Computing & Software Engineering",
    subjects: ["Operating Systems", "Computer Networks", "Cloud Architecture", "Database Management", "Software Engineering", "Cyber Security"],
  },
  {
    id: 2, date: "2018 – 2021", title: "Bachelor of Commerce", short: "B.Com",
    org: "University of Mumbai", badge: null, color: "#6366f1", accentBg: "#312e81",
    svgPath: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
    focus: "Business fundamentals with strong analytical and communication skills",
    subjects: ["Accountancy", "Business Economics", "IT in Business", "Management", "Financial Markets"],
  },
];

const certsData = [
  {
    id: 1, name: "AWS Solutions Architect", detail: "Training Program", issuer: "Edureka", year: "2024",
    color: "#d97706", status: "Trained",
    svgPath: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
    skills: ["EC2", "S3", "IAM", "VPC", "Cloud Architecture"],
    nextStep: "Targeting AWS SAA Exam",
  },
  {
    id: 2, name: "Hardware & Networking", detail: "Professional Certificate", issuer: "Jetking Thane", year: "2019",
    color: "#0d9488", status: "Certified",
    svgPath: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
    skills: ["PC Assembly", "LAN / WAN", "Troubleshooting", "Network Devices", "OS Installation"],
    nextStep: null,
  },
];

const toolsData = [
  { category: "OS & Platforms", color: "#2563eb", bg: "#1e3a8a",
    svgPath: "M3 5a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 0v8m18-8v8M3 9h18",
    tools: [{ name: "Windows 10/11", level: 95 }, { name: "Windows Server 2019", level: 85 }, { name: "macOS", level: 75 }, { name: "Ubuntu Linux", level: 60 }] },
  { category: "Identity & Access", color: "#7c3aed", bg: "#4c1d95",
    svgPath: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    tools: [{ name: "Active Directory", level: 90 }, { name: "Azure AD / Entra ID", level: 55 }, { name: "Group Policy (GPO)", level: 85 }, { name: "RBAC", level: 80 }] },
  { category: "Productivity & Collab", color: "#0891b2", bg: "#164e63",
    svgPath: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    tools: [{ name: "Office 365", level: 90 }, { name: "Outlook", level: 92 }, { name: "Microsoft Teams", level: 85 }, { name: "SharePoint", level: 65 }] },
  { category: "Networking", color: "#0d9488", bg: "#134e4a",
    svgPath: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9",
    tools: [{ name: "TCP/IP", level: 80 }, { name: "DNS & DHCP", level: 78 }, { name: "LAN / Wi-Fi", level: 85 }, { name: "VPN", level: 70 }, { name: "Cisco basics", level: 55 }] },
  { category: "Security & Backup", color: "#dc2626", bg: "#7f1d1d",
    svgPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    tools: [{ name: "Endpoint Antivirus", level: 88 }, { name: "Windows Defender", level: 90 }, { name: "System Backup", level: 85 }, { name: "Patch Management", level: 82 }] },
  { category: "Ticketing & ITSM", color: "#d97706", bg: "#78350f",
    svgPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
    tools: [{ name: "ServiceNow", level: 75 }, { name: "Jira Service Desk", level: 70 }, { name: "Freshdesk", level: 65 }, { name: "SLA Management", level: 88 }] },
  { category: "Scripting & Automation", color: "#16a34a", bg: "#14532d",
    svgPath: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    tools: [{ name: "PowerShell", level: 55 }, { name: "Batch Scripts", level: 65 }, { name: "Task Scheduler", level: 75 }] },
  { category: "Cloud", color: "#6366f1", bg: "#312e81",
    svgPath: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
    tools: [{ name: "AWS EC2 / S3", level: 45 }, { name: "AWS IAM", level: 50 }, { name: "Azure basics", level: 40 }] },
];

const goalsInit = [
  { id: 1, text: "Complete AWS Solutions Architect Associate certification", done: false },
  { id: 2, text: "Earn CompTIA Network+ certification", done: false },
  { id: 3, text: "Build hands-on lab experience with Azure or GCP", done: false },
  { id: 4, text: "Transition into a Cloud / Infrastructure Engineer role", done: false },
  { id: 5, text: "Complete MCA with a strong final year IT systems project", done: true },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function getLvl(p) {
  if (p <= 30) return { label: "Beginner",   color: "#94a3b8" };
  if (p <= 55) return { label: "Developing", color: "#f59e0b" };
  if (p <= 80) return { label: "Proficient", color: "#0d9488" };
  return             { label: "Expert",      color: "#2563eb" };
}

// Reusable SVG icon
const Icon = ({ path, size = 16, color = "currentColor", strokeWidth = 1.8, extra = null }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d={path} />
    {extra}
  </svg>
);

// Coloured icon box used throughout
const IconBox = ({ path, color, size = 36, iconSize = 17, extra = null }) => (
  <div style={{ width: size, height: size, borderRadius: Math.round(size * 0.28), background: `${color}18`, border: `1px solid ${color}35`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <Icon path={path} size={iconSize} color={color} extra={extra} />
  </div>
);

function SkillBar({ level }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(level), 300); return () => clearTimeout(t); }, [level]);
  const { color } = getLvl(level);
  return (
    <div style={{ height: 5, background: "rgba(255,255,255,0.07)", borderRadius: 3, overflow: "hidden" }}>
      <div style={{ height: "100%", width: w + "%", background: color, borderRadius: 3, transition: "width 0.9s cubic-bezier(.4,0,.2,1)" }} />
    </div>
  );
}

// Shared section card wrapper
const DarkCard = ({ children, accent = null, style = {} }) => (
  <div style={{ background: "#0f1e2e", borderRadius: 14, border: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden", ...style }}>
    {accent && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: accent }} />}
    {children}
  </div>
);

const SectionTag = ({ label, color = "#60a5fa" }) => (
  <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color, marginBottom: 16 }}>{label}</div>
);

// ─── HERO ────────────────────────────────────────────────────────────────────

const PROFILE_ROWS = [
  { path: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z", color: "#d97706", val: "Thane, Maharashtra" },
  { path: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z", color: "#7c3aed", val: "MCA Graduate" },
  { path: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", color: "#0d9488", val: "Max Spare Ltd." },
  { path: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", color: "#6366f1", val: "AWS Training" },
];

const CV_URL = "https://drive.google.com/uc?export=download&id=1Gz62H7qpbpsBLrSH5RQAGo2hky4DQuOt";
const LINKEDIN_URL = "https://linkedin.com/in/imran-ansari-3a690a226";

function ProfileCard({ avatarSize = 84, padding = "24px 20px", gap = 14, fontSize = { name: 15, role: 10, info: 12, btn: 11 }, iconBox = 26 }) {
  return (
    <DarkCard accent="linear-gradient(90deg,#2563eb,#0d9488,#7c3aed)">
      <div style={{ padding, display: "flex", flexDirection: "column", alignItems: "center", gap }}>
        <div style={{ position: "relative" }}>
          <div style={{ width: avatarSize, height: avatarSize, borderRadius: "50%", background: "linear-gradient(135deg,#1d4ed8,#0d9488)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: Math.round(avatarSize * 0.33), fontWeight: 900, color: "#fff", letterSpacing: -1, boxShadow: "0 0 0 3px rgba(96,165,250,0.15),0 0 28px rgba(37,99,235,0.35)" }}>IA</div>
          <div style={{ position: "absolute", bottom: 3, right: 3, width: 14, height: 14, borderRadius: "50%", background: "#22c55e", border: "2px solid #0f1e2e", boxShadow: "0 0 8px #22c55e" }} />
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: 800, fontSize: fontSize.name, color: "#f0f4f9", marginBottom: 4 }}>Imran Ansari</div>
          <div style={{ fontFamily: "monospace", fontSize: fontSize.role, color: "#60a5fa", letterSpacing: 1 }}>IT Support Analyst</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 20, padding: "4px 12px" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 5px #22c55e" }} />
          <span style={{ fontFamily: "monospace", fontSize: 9, color: "#22c55e", letterSpacing: 1 }}>OPEN TO WORK</span>
        </div>
        <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.05)" }} />
        <div style={{ width: "100%", display: "grid", gap: 9 }}>
          {PROFILE_ROWS.map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: iconBox, height: iconBox, borderRadius: Math.round(iconBox * 0.28), background: `${r.color}18`, border: `1px solid ${r.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon path={r.path} size={Math.round(iconBox * 0.52)} color={r.color} strokeWidth={2} />
              </div>
              <span style={{ fontSize: fontSize.info, color: "rgba(240,244,249,0.6)", fontWeight: 500 }}>{r.val}</span>
            </div>
          ))}
        </div>
        <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.05)" }} />
        <a href={CV_URL} target="_blank" rel="noreferrer"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, width: "100%", padding: "10px 0", borderRadius: 9, background: "linear-gradient(135deg,#2563eb,#1d4ed8)", color: "#fff", fontFamily: "monospace", fontSize: fontSize.btn, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 14px rgba(37,99,235,0.35)", letterSpacing: 0.5 }}>
          <Icon path="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" size={13} strokeWidth={2.5} />
          Download CV
        </a>
      </div>
    </DarkCard>
  );
}

function HeroSection() {
  const [typed, setTyped] = useState("");
  const [blink, setBlink] = useState(true);
  const [time, setTime] = useState("");
  const roles = ["IT Support Analyst", "Active Directory Engineer", "Cloud Enthusiast"];

  useEffect(() => {
    let i = 0, current = 0;
    const type = () => {
      const word = roles[current % roles.length];
      if (i <= word.length) { setTyped(word.slice(0, i)); i++; setTimeout(type, 75); }
      else { setTimeout(() => { i = 0; current++; type(); }, 2200); }
    };
    type();
  }, []);

  useEffect(() => { const iv = setInterval(() => setBlink(b => !b), 530); return () => clearInterval(iv); }, []);
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }));
    tick(); const iv = setInterval(tick, 1000); return () => clearInterval(iv);
  }, []);

  const highlights = [
    { path: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18", color: "#2563eb", label: "IT Support L1/L2" },
    { path: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", color: "#7c3aed", label: "Active Directory" },
    { path: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9", color: "#0d9488", label: "Networking" },
    { path: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", color: "#6366f1", label: "AWS Cloud" },
  ];

  const stats = [
    { n: "3+",   l: "Years Exp",  color: "#2563eb", path: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { n: "100+", l: "Users",      color: "#0d9488", path: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
    { n: "99%",  l: "SLA Rate",   color: "#7c3aed", path: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
    { n: "MCA",  l: "Graduate",   color: "#d97706", path: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" },
  ];

  return (
    <div style={{ background: "#060f1a", color: "#f0f4f9", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(96,165,250,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(96,165,250,0.03) 1px,transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: -100, right: -60, width: 500, height: 500, background: "radial-gradient(circle,rgba(37,99,235,0.18) 0%,transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -80, left: -80, width: 400, height: 400, background: "radial-gradient(circle,rgba(13,148,136,0.12) 0%,transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "50%", left: "40%", width: 300, height: 300, background: "radial-gradient(circle,rgba(124,58,237,0.07) 0%,transparent 70%)", pointerEvents: "none", transform: "translate(-50%,-50%)" }} />

      {/* Status bar */}
      <div style={{ borderBottom: "1px solid rgba(96,165,250,0.08)", padding: "9px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 7px #22c55e" }} />
          <span style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(240,244,249,0.28)", letterSpacing: 2 }}>PORTFOLIO · ONLINE</span>
        </div>
        <span style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(240,244,249,0.28)", letterSpacing: 1 }}>{time}</span>
      </div>

      <div style={{ position: "relative", zIndex: 2, maxWidth: 860, margin: "0 auto", padding: "clamp(20px,5vw,36px) clamp(16px,4vw,24px) 40px" }}>
        {/* Two-column: content + profile card */}
        <div className="hero-grid">
          <div>
            {/* Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 20, padding: "5px 14px", marginBottom: 20 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e" }} />
              <span style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#22c55e" }}>Open to Opportunities</span>
            </div>

            {/* Name */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(240,244,249,0.28)", letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>Hello, I'm</div>
              <div className="hero-name" style={{ fontSize: "clamp(42px,8vw,56px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-1.5px" }}>
                <span style={{ color: "#f0f4f9", display: "block" }}>Imran</span>
                <span style={{ background: "linear-gradient(135deg,#60a5fa,#2563eb)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", display: "block" }}>Ansari</span>
              </div>
            </div>

            {/* Typed role */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: 16, height: 28 }}>
              <span style={{ fontFamily: "monospace", fontSize: 14, color: "#60a5fa", fontWeight: 700 }}>{typed}</span>
              <span style={{ display: "inline-block", width: 2, height: 18, background: "#60a5fa", marginLeft: 2, opacity: blink ? 1 : 0, borderRadius: 1 }} />
            </div>

            {/* Description */}
            <p className="hero-desc" style={{ fontSize: 15.5, color: "rgba(240,244,249,0.62)", maxWidth: 490, lineHeight: 1.85, marginBottom: 24 }}>
              Building reliable IT systems for 3+ years — from frontline support to architecting{" "}
              <span style={{ color: "#0d9488", fontWeight: 600 }}>Active Directory infrastructure</span>. Now advancing into{" "}
              <span style={{ color: "#6366f1", fontWeight: 600 }}>cloud engineering</span> with AWS.
            </p>

            {/* CTAs */}
            <div className="hero-ctas">
              <a href={CV_URL} target="_blank" rel="noreferrer" className="hero-cta-btn"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: "#060f1a", background: "linear-gradient(135deg,#60a5fa,#2563eb)", borderRadius: 8, padding: "11px 22px", textDecoration: "none", letterSpacing: 0.5, boxShadow: "0 4px 18px rgba(37,99,235,0.4)" }}>
                <Icon path="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" size={14} strokeWidth={2.5} />
                Download CV
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="hero-cta-btn"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: "#93c5fd", background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.3)", borderRadius: 8, padding: "11px 22px", textDecoration: "none", letterSpacing: 0.5 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
              </a>
              <a href="mailto:ia257085@gmail.com" className="hero-cta-btn"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: "rgba(240,244,249,0.45)", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "11px 22px", textDecoration: "none", letterSpacing: 0.5 }}>
                <Icon path="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" size={14} />
                Email Me
              </a>
            </div>
          </div>

          <div className="hero-profile-card">
            <ProfileCard />
          </div>
        </div>

        {/* Skill tag row */}
        <div className="hero-tags">
          {highlights.map((h, i) => (
            <div key={i} className="hero-tag-item" style={{ display: "flex", alignItems: "center", gap: 14, padding: "15px 18px", background: "#0f1e2e", borderRadius: 12, border: `1px solid ${h.color}25` }}>
              <div className="hero-tag-icon" style={{ width: 38, height: 38, borderRadius: 10, background: `${h.color}18`, border: `1px solid ${h.color}35`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={h.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={h.path} /></svg>
              </div>
              <span className="hero-tag-label" style={{ fontFamily: "monospace", fontSize: 12, color: "rgba(240,244,249,0.72)", fontWeight: 700, letterSpacing: 0.3 }}>{h.label}</span>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="hero-stats" style={{ marginTop: 10 }}>
          {stats.map((s, i) => (
            <div key={i} className="hero-stat-item" style={{ background: "#0f1e2e", borderRadius: 12, border: `1px solid ${s.color}25`, padding: "18px 14px", textAlign: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: s.color, opacity: 0.5 }} />
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: `${s.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon path={s.path} size={15} color={s.color} strokeWidth={2} />
                </div>
              </div>
              <div style={{ fontSize: 19, fontWeight: 900, color: s.color, lineHeight: 1, marginBottom: 5 }}>{s.n}</div>
              <div style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: 1, textTransform: "uppercase", color: "rgba(240,244,249,0.28)" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(96,165,250,0.15),rgba(13,148,136,0.12),transparent)" }} />
    </div>
  );
}

// ─── MAIN PORTFOLIO ───────────────────────────────────────────────────────────

export default function Portfolio() {
  const [tab, setTab] = useState("about");
  const [goals, setGoals] = useState(goalsInit);
  const [pinUnlocked, setPinUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const CORRECT_PIN = "1234";

  const tabs = [
    { id: "about",      label: "About"      },
    { id: "skills",     label: "Skills"     },
    { id: "experience", label: "Experience" },
    { id: "projects",   label: "Projects"   },
    { id: "tools",      label: "Tools"      },
    { id: "education",  label: "Education"  },
    { id: "goals",      label: "Goals"      },
  ];

  // Inject responsive CSS + reset body styles
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "portfolio-responsive";
    style.textContent = MOBILE_CSS;
    document.head.appendChild(style);
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = "#060f1a";
    document.documentElement.style.background = "#060f1a";
    return () => {
      document.getElementById("portfolio-responsive")?.remove();
      document.body.style.margin = "";
      document.body.style.background = "";
      document.documentElement.style.background = "";
    };
  }, []);

  return (
    <div style={{ fontFamily: "system-ui,-apple-system,sans-serif", background: "#0c1825", minHeight: "100vh", color: "#f0f4f9", margin: 0, padding: 0 }}>
      <HeroSection />

      {/* ── TAB BAR ── */}
      <div style={{ background: "#0a1628", borderBottom: "1px solid rgba(96,165,250,0.1)", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: "15px 22px", border: "none", background: "none", cursor: "pointer",
              fontFamily: "monospace", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase",
              color: tab === t.id ? "#60a5fa" : "rgba(240,244,249,0.3)",
              borderBottom: `2px solid ${tab === t.id ? "#60a5fa" : "transparent"}`,
              whiteSpace: "nowrap", transition: "all 0.18s", fontWeight: tab === t.id ? 700 : 400, flexShrink: 0,
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ minHeight: "calc(100vh - 200px)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "clamp(16px,4vw,32px) clamp(12px,4vw,20px) 80px" }}>

          {/* ══ ABOUT ══ */}
          {tab === "about" && (
            <div style={{ display: "grid", gap: 20 }}>

              {/* Mobile-only profile card (hero card hidden on mobile) */}
              <div className="mobile-profile">
                <ProfileCard avatarSize={80} padding="22px 20px" gap={12} fontSize={{ name: 15, role: 10, info: 12, btn: 11 }} iconBox={26} />
              </div>
              {/* Profile + Summary row */}
              <div className="about-top">
                <div style={{ display: "grid", gap: 14 }}>
                  <DarkCard accent="linear-gradient(90deg,#2563eb,#0d9488)" style={{ padding: "22px 24px" }}>
                    <SectionTag label="Summary" />
                    <p style={{ fontSize: 14, lineHeight: 1.9, color: "rgba(240,244,249,0.68)", margin: 0 }}>
                      IT Support Analyst with <strong style={{ color: "#60a5fa", fontWeight: 700 }}>3+ years</strong> resolving complex technical issues across Windows, macOS, and network environments. Architected a full <strong style={{ color: "#0d9488", fontWeight: 700 }}>Active Directory infrastructure</strong> at Max Spare Limited — OU hierarchy, GPOs, and RBAC. MCA Graduate now advancing toward <strong style={{ color: "#a78bfa", fontWeight: 700 }}>cloud engineering</strong> with AWS.
                    </p>
                  </DarkCard>

                  <div className="about-stats">
                    {[
                      { n: "3+", l: "Yrs Experience", color: "#2563eb", path: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
                      { n: "100+", l: "Users Supported", color: "#0d9488", path: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
                      { n: "99%", l: "SLA Compliance", color: "#7c3aed", path: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
                    ].map((s, i) => (
                      <div key={i} style={{ background: "#0f1e2e", borderRadius: 12, border: `1px solid ${s.color}25`, padding: "16px 14px", position: "relative", overflow: "hidden", textAlign: "center" }}>
                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: s.color, opacity: 0.5 }} />
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                          <IconBox path={s.path} color={s.color} size={32} iconSize={15} />
                        </div>
                        <div style={{ fontSize: 20, fontWeight: 900, color: s.color, lineHeight: 1, marginBottom: 4 }}>{s.n}</div>
                        <div style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: 1, textTransform: "uppercase", color: "rgba(240,244,249,0.3)" }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* What I Do */}
              <DarkCard accent="linear-gradient(90deg,#0d9488,#7c3aed)" style={{ padding: "22px 24px" }}>
                <SectionTag label="What I Do" color="#0d9488" />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 12 }}>
                  {[
                    { path: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18", color: "#2563eb", title: "IT Support L1/L2", desc: "Hardware, software & OS troubleshooting for 100+ users" },
                    { path: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", color: "#7c3aed", title: "Identity & Access", desc: "Active Directory, OU design, Group Policy & RBAC" },
                    { path: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9", color: "#0d9488", title: "Network Support", desc: "LAN, Wi-Fi, TCP/IP, DNS, DHCP & VPN troubleshooting" },
                    { path: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", color: "#6366f1", title: "Cloud (Growing)", desc: "AWS EC2, S3, IAM training — targeting SAA cert" },
                  ].map((w, i) => (
                    <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 16px", background: "rgba(255,255,255,0.02)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.05)" }}>
                      <IconBox path={w.path} color={w.color} size={36} iconSize={17} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 13, color: "#f0f4f9", marginBottom: 4 }}>{w.title}</div>
                        <div style={{ fontSize: 12, color: "rgba(240,244,249,0.45)", lineHeight: 1.5 }}>{w.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </DarkCard>

              {/* Soft skills + Contact row */}
              <div className="about-two-col">
                <DarkCard accent="linear-gradient(90deg,#d97706,#dc2626)" style={{ padding: "22px 24px" }}>
                  <SectionTag label="Soft Skills" color="#fbbf24" />
                  <div style={{ display: "grid", gap: 11 }}>
                    {[
                      { skill: "Problem Solving",    pct: 92 },
                      { skill: "Communication",      pct: 88 },
                      { skill: "Team Collaboration", pct: 85 },
                      { skill: "Time Management",    pct: 82 },
                      { skill: "User Empathy",       pct: 95 },
                    ].map((s, i) => (
                      <div key={i}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                          <span style={{ fontSize: 12, color: "rgba(240,244,249,0.65)", fontWeight: 500 }}>{s.skill}</span>
                          <span style={{ fontFamily: "monospace", fontSize: 10, color: "#fbbf24", fontWeight: 700 }}>{s.pct}%</span>
                        </div>
                        <div style={{ height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 2, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${s.pct}%`, background: "linear-gradient(90deg,#d97706,#f59e0b)", borderRadius: 2 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </DarkCard>

                <DarkCard accent="linear-gradient(90deg,#2563eb,#0d9488)" style={{ padding: "22px 24px" }}>
                  <SectionTag label="Get In Touch" />
                  <div style={{ display: "grid", gap: 10 }}>
                    {[
                      { path: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", color: "#2563eb", lbl: "Email", val: "ia257085@gmail.com", href: "mailto:ia257085@gmail.com" },
                      { path: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", color: "#0d9488", lbl: "Phone", val: "8652699517", href: "tel:8652699517" },
                      { path: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1", color: "#7c3aed", lbl: "LinkedIn", val: "imran-ansari-3a690a226", href: LINKEDIN_URL },
                      { path: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z", color: "#d97706", lbl: "Location", val: "Thane, Maharashtra", href: null },
                    ].map((c, i) => (
                      <a key={i} href={c.href || undefined} target={c.href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                        style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "rgba(255,255,255,0.03)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.05)", textDecoration: "none", cursor: c.href ? "pointer" : "default" }}>
                        <IconBox path={c.path} color={c.color} size={32} iconSize={15} />
                        <div>
                          <div style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: 1, color: "rgba(240,244,249,0.28)", marginBottom: 2, textTransform: "uppercase" }}>{c.lbl}</div>
                          <div style={{ fontSize: 12, color: "rgba(240,244,249,0.65)", fontWeight: 500 }}>{c.val}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </DarkCard>
              </div>
            </div>
          )}

          {/* ══ SKILLS ══ */}
          {tab === "skills" && (() => {
            const grouped = [
              { label: "Support & Systems",   color: "#2563eb", path: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18", ids: [1,2,7,11] },
              { label: "Identity & Network",  color: "#0d9488", path: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9", ids: [3,5,10] },
              { label: "Productivity & ITSM", color: "#7c3aed", path: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", ids: [4,6,12] },
              { label: "Security & Cloud",    color: "#d97706", path: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", ids: [8,9] },
            ].map(g => ({ ...g, skills: skillsData.filter(s => g.ids.includes(s.id)) }));

            const avg = Math.round(skillsData.reduce((a, s) => a + s.level, 0) / skillsData.length);
            const expertCount = skillsData.filter(s => s.level > 80).length;
            const profCount   = skillsData.filter(s => s.level > 55 && s.level <= 80).length;

            return (
              <div style={{ display: "grid", gap: 18 }}>
                {/* Summary */}
                <DarkCard accent="linear-gradient(90deg,#2563eb,#0d9488,#7c3aed,#d97706)" style={{ padding: "22px 24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 18 }}>
                    <div>
                      <SectionTag label="Skill Overview" />
                      <div style={{ fontSize: 13, color: "rgba(240,244,249,0.5)", marginTop: -10 }}>{skillsData.length} tracked skills · 4 categories</div>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      {[{ n: expertCount, l: "Expert", c: "#2563eb" }, { n: profCount, l: "Proficient", c: "#0d9488" }, { n: skillsData.length - expertCount - profCount, l: "Growing", c: "#d97706" }].map((s, i) => (
                        <div key={i} style={{ textAlign: "center", padding: "8px 14px", background: `${s.c}10`, borderRadius: 10, border: `1px solid ${s.c}25` }}>
                          <div style={{ fontSize: 18, fontWeight: 900, color: s.c, lineHeight: 1 }}>{s.n}</div>
                          <div style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(240,244,249,0.3)", letterSpacing: 1, textTransform: "uppercase", marginTop: 4 }}>{s.l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(240,244,249,0.4)", whiteSpace: "nowrap" }}>Overall Avg</div>
                    <div style={{ flex: 1, height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${avg}%`, background: "linear-gradient(90deg,#2563eb,#0d9488,#7c3aed)", borderRadius: 4 }} />
                    </div>
                    <div style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 900, color: "#60a5fa" }}>{avg}%</div>
                  </div>
                </DarkCard>

                {/* Legend */}
                <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
                  {[["Expert",">80%","#2563eb"],["Proficient","56–80%","#0d9488"],["Developing","31–55%","#f59e0b"],["Beginner","≤30%","#94a3b8"]].map(([l,r,c]) => (
                    <div key={l} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: c }} />
                      <span style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(240,244,249,0.4)" }}>{l}</span>
                      <span style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(240,244,249,0.2)" }}>{r}</span>
                    </div>
                  ))}
                </div>

                {/* Groups */}
                {grouped.map(group => (
                  <div key={group.label} style={{ background: "#0f1e2e", borderRadius: 14, border: `1px solid ${group.color}20`, overflow: "hidden" }}>
                    <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: 12, background: `${group.color}08` }}>
                      <IconBox path={group.path} color={group.color} size={34} iconSize={16} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 13, color: "#f0f4f9", marginBottom: 2 }}>{group.label}</div>
                        <div style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(240,244,249,0.3)" }}>{group.skills.length} skills</div>
                      </div>
                      <div style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 800, color: group.color }}>
                        {Math.round(group.skills.reduce((a,s) => a+s.level,0) / group.skills.length)}%
                      </div>
                    </div>
                    <div style={{ padding: "16px 20px", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 12 }}>
                      {group.skills.map(s => {
                        const { label, color } = getLvl(s.level);
                        return (
                          <div key={s.id} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "14px 16px", border: `1px solid ${color}15`, position: "relative", overflow: "hidden" }}>
                            <div style={{ position: "absolute", top: 0, left: 0, width: `${s.level}%`, height: 2, background: color, opacity: 0.7 }} />
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                              <span style={{ fontSize: 13, fontWeight: 600, color: "#f0f4f9" }}>{s.name}</span>
                              <span style={{ fontFamily: "monospace", fontSize: 12, color, fontWeight: 800 }}>{s.level}%</span>
                            </div>
                            <SkillBar level={s.level} />
                            <div style={{ marginTop: 8 }}>
                              <span style={{ fontFamily: "monospace", fontSize: 9, color, letterSpacing: 1, background: `${color}18`, border: `1px solid ${color}30`, padding: "2px 8px", borderRadius: 4, textTransform: "uppercase" }}>{label}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}

          {/* ══ EXPERIENCE ══ */}
          {tab === "experience" && (
            <div style={{ display: "grid", gap: 20 }}>

              {/* ── Career Summary Banner ── */}
              <div style={{ background: "#0f1e2e", borderRadius: 16, border: "1px solid rgba(37,99,235,0.2)", padding: "22px 26px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#2563eb,#0d9488,#6366f1)" }} />
                <div style={{ position: "absolute", top: -50, right: -50, width: 220, height: 220, background: "radial-gradient(circle,rgba(37,99,235,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />
                <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", position: "relative" }}>
                  <div style={{ flex: 1, minWidth: 220 }}>
                    <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#60a5fa", marginBottom: 8 }}>Career Overview</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#f0f4f9", marginBottom: 6 }}>6+ Years in IT — Growing into Cloud</div>
                    <div style={{ fontSize: 13, color: "rgba(240,244,249,0.5)", lineHeight: 1.65 }}>
                      Progressed from IT Assistant to Analyst across 2 companies, building deep expertise in support infrastructure, Active Directory, and endpoint security.
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {[
                      { n: "6+",  l: "Years Exp",     c: "#2563eb", path: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
                      { n: "2",   l: "Companies",     c: "#0d9488", path: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
                      { n: "100+",l: "Users",         c: "#7c3aed", path: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
                      { n: "99%", l: "SLA Rate",      c: "#d97706", path: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
                    ].map((s, i) => (
                      <div key={i} style={{ textAlign: "center", padding: "10px 14px", background: `${s.c}10`, borderRadius: 12, border: `1px solid ${s.c}22`, minWidth: 64 }}>
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: 5 }}>
                          <div style={{ width: 24, height: 24, borderRadius: 6, background: `${s.c}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Icon path={s.path} size={12} color={s.c} strokeWidth={2} />
                          </div>
                        </div>
                        <div style={{ fontSize: 18, fontWeight: 900, color: s.c, lineHeight: 1 }}>{s.n}</div>
                        <div style={{ fontFamily: "monospace", fontSize: 8, color: "rgba(240,244,249,0.28)", letterSpacing: 0.8, textTransform: "uppercase", marginTop: 3 }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Timeline ── */}
              <div style={{ position: "relative" }}>
                {/* Vertical line */}
                <div style={{ position: "absolute", left: 27, top: 20, bottom: 20, width: 2, background: "linear-gradient(180deg,#2563eb 0%,#0d9488 50%,#6366f1 80%,rgba(99,102,241,0) 100%)", borderRadius: 2 }} />

                <div style={{ display: "grid", gap: 18 }}>
                  {experienceData.map((e, idx) => (
                    <div key={e.id} style={{ display: "grid", gridTemplateColumns: "56px 1fr", gap: 0 }}>

                      {/* Dot column */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 22 }}>
                        <div style={{ position: "relative", flexShrink: 0 }}>
                          <div style={{ width: 16, height: 16, borderRadius: "50%", background: e.color, border: `3px solid #0c1825`, boxShadow: e.current ? `0 0 0 4px ${e.color}30, 0 0 16px ${e.color}60` : `0 0 8px ${e.color}40`, zIndex: 1 }} />
                          {e.current && (
                            <div style={{ position: "absolute", top: -3, left: -3, width: 22, height: 22, borderRadius: "50%", border: `1px solid ${e.color}50`, animation: "none" }} />
                          )}
                        </div>
                      </div>

                      {/* Card */}
                      <div style={{ background: "#0f1e2e", borderRadius: 16, border: `1px solid ${e.current ? `${e.color}30` : "rgba(255,255,255,0.06)"}`, overflow: "hidden" }}>
                        {/* Top accent — gradient for current, subtle for past */}
                        <div style={{ height: 3, background: e.current ? e.accentGrad : `linear-gradient(90deg,${e.color}60,${e.color}20)` }} />

                        <div style={{ padding: "20px 24px" }}>
                          {/* Header row */}
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 14 }}>
                            <div>
                              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                                <div style={{ fontWeight: 800, fontSize: 17, color: "#f0f4f9" }}>{e.title}</div>
                                {e.current && (
                                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: "monospace", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", background: "rgba(34,197,94,0.1)", color: "#22c55e", padding: "3px 10px", borderRadius: 20, border: "1px solid rgba(34,197,94,0.25)", fontWeight: 700 }}>
                                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 5px #22c55e" }} />
                                    Current
                                  </span>
                                )}
                              </div>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                  <div style={{ width: 20, height: 20, borderRadius: 5, background: `${e.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Icon path="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" size={11} color={e.color} />
                                  </div>
                                  <span style={{ fontSize: 13, color: e.color, fontWeight: 600 }}>{e.org}</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                  <Icon path="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" size={12} color="rgba(240,244,249,0.25)" />
                                  <span style={{ fontSize: 12, color: "rgba(240,244,249,0.35)" }}>{e.location}</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                  <Icon path="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" size={12} color="rgba(240,244,249,0.25)" />
                                  <span style={{ fontSize: 12, color: "rgba(240,244,249,0.35)" }}>{e.type}</span>
                                </div>
                              </div>
                            </div>
                            {/* Date + tenure */}
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "5px 10px", border: "1px solid rgba(255,255,255,0.06)" }}>
                                <Icon path="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" size={11} color="rgba(240,244,249,0.3)" />
                                <span style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(240,244,249,0.4)" }}>{e.date}</span>
                              </div>
                              <span style={{ fontFamily: "monospace", fontSize: 10, color: e.color, fontWeight: 700, padding: "3px 10px", background: `${e.color}10`, borderRadius: 8, border: `1px solid ${e.color}20` }}>{e.tenure}</span>
                            </div>
                          </div>

                          {/* Metrics row */}
                          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                            {e.metrics.map((m, mi) => (
                              <div key={mi} style={{ display: "flex", flex: 1, minWidth: 80, flexDirection: "column", alignItems: "center", padding: "10px 8px", background: `${e.color}08`, borderRadius: 10, border: `1px solid ${e.color}18` }}>
                                <div style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 900, color: e.color, lineHeight: 1 }}>{m.val}</div>
                                <div style={{ fontFamily: "monospace", fontSize: 8, color: "rgba(240,244,249,0.3)", letterSpacing: 0.8, textTransform: "uppercase", marginTop: 4, textAlign: "center" }}>{m.lbl}</div>
                              </div>
                            ))}
                          </div>

                          {/* Divider */}
                          <div style={{ height: 1, background: "rgba(255,255,255,0.05)", marginBottom: 16 }} />

                          {/* Highlights */}
                          <div style={{ display: "grid", gap: 9, marginBottom: 16 }}>
                            {e.highlights.map((h, hi) => (
                              <div key={hi} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                                <div style={{ width: 18, height: 18, borderRadius: 5, background: `${e.color}15`, border: `1px solid ${e.color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={e.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                                </div>
                                <span style={{ fontSize: 13, lineHeight: 1.75, color: "rgba(240,244,249,0.62)" }}>{h}</span>
                              </div>
                            ))}
                          </div>

                          {/* Skills used */}
                          <div>
                            <div style={{ fontFamily: "monospace", fontSize: 8, letterSpacing: 2, textTransform: "uppercase", color: "rgba(240,244,249,0.2)", marginBottom: 8 }}>Technologies Used</div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                              {e.skills.map((s, si) => (
                                <span key={si} style={{ fontSize: 11, padding: "4px 11px", borderRadius: 6, background: `${e.color}0d`, color: "rgba(240,244,249,0.6)", border: `1px solid ${e.color}20`, fontWeight: 500 }}>{s}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ══ PROJECTS ══ */}
          {tab === "projects" && (
            <div style={{ display: "grid", gap: 20 }}>
              {projectsData.map(p => (
                <DarkCard key={p.id} accent="linear-gradient(90deg,#2563eb,#0d9488)" style={{ border: "1px solid rgba(37,99,235,0.2)" }}>
                  <div style={{ padding: "24px 26px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "flex-start", gap: 16 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg,#1d4ed8,#0d9488)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 16px rgba(37,99,235,0.3)" }}>
                      <Icon path={p.svgPath} size={26} color="#fff" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 18, color: "#f0f4f9", marginBottom: 5 }}>{p.title}</div>
                      <div style={{ fontFamily: "monospace", fontSize: 11, color: "#60a5fa" }}>{p.org}</div>
                    </div>
                  </div>
                  <div style={{ padding: "20px 26px 24px" }}>
                    <p style={{ fontSize: 14, lineHeight: 1.85, color: "rgba(240,244,249,0.6)", marginBottom: 20 }}>{p.desc}</p>
                    <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "rgba(240,244,249,0.25)", marginBottom: 10 }}>Technologies Used</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {p.tags.map((t, i) => (
                        <span key={i} style={{ fontFamily: "monospace", fontSize: 11, padding: "5px 13px", borderRadius: 6, background: "rgba(37,99,235,0.12)", color: "#93c5fd", border: "1px solid rgba(37,99,235,0.2)", fontWeight: 600 }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </DarkCard>
              ))}
            </div>
          )}

          {/* ══ TOOLS ══ */}
          {tab === "tools" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 22 }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#f0f4f9", marginBottom: 4 }}>Technologies & Tools</div>
                  <div style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(240,244,249,0.3)" }}>{toolsData.reduce((a,c)=>a+c.tools.length,0)} tools across {toolsData.length} categories</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", justifyContent: "flex-end" }}>
                  {[["High","#2563eb"],["Mid","#0d9488"],["Learning","#d97706"]].map(([l,c]) => (
                    <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
                      <span style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(240,244,249,0.3)", letterSpacing: 1 }}>{l}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
                {toolsData.map(cat => {
                  const avg = Math.round(cat.tools.reduce((a,t)=>a+t.level,0)/cat.tools.length);
                  return (
                    <div key={cat.category} style={{ background: "#0f1e2e", borderRadius: 16, border: `1px solid ${cat.color}25`, overflow: "hidden" }}>
                      <div style={{ height: 3, background: `linear-gradient(90deg,${cat.color},${cat.color}55)` }} />
                      <div style={{ padding: "18px 20px 14px", display: "flex", alignItems: "center", gap: 14, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: cat.bg, border: `1px solid ${cat.color}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Icon path={cat.svgPath} size={22} color={cat.color} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: 13, color: "#f0f4f9", marginBottom: 6 }}>{cat.category}</div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 2, overflow: "hidden" }}>
                              <div style={{ height: "100%", width: `${avg}%`, background: cat.color, borderRadius: 2, opacity: 0.85 }} />
                            </div>
                            <span style={{ fontFamily: "monospace", fontSize: 10, color: cat.color, fontWeight: 700 }}>{avg}%</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ padding: "14px 20px 18px", display: "grid", gap: 10 }}>
                        {cat.tools.map((tool, i) => {
                          const dotColor = tool.level >= 80 ? "#2563eb" : tool.level >= 60 ? "#0d9488" : "#d97706";
                          return (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{ width: 6, height: 6, borderRadius: "50%", background: dotColor, flexShrink: 0, boxShadow: `0 0 6px ${dotColor}80` }} />
                              <span style={{ fontSize: 12, color: "rgba(240,244,249,0.7)", flex: 1, fontWeight: 500 }}>{tool.name}</span>
                              <div style={{ width: 48, height: 3, background: "rgba(255,255,255,0.07)", borderRadius: 2, overflow: "hidden", flexShrink: 0 }}>
                                <div style={{ height: "100%", width: `${tool.level}%`, background: dotColor, borderRadius: 2 }} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ══ EDUCATION ══ */}
          {tab === "education" && (
            <div style={{ display: "grid", gap: 20 }}>

              {/* ── Learning Journey Banner ── */}
              <div style={{ background: "#0f1e2e", borderRadius: 16, border: "1px solid rgba(124,58,237,0.2)", padding: "24px 28px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#6366f1,#7c3aed,#2563eb,#0d9488)" }} />
                <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, background: "radial-gradient(circle,rgba(124,58,237,0.1) 0%,transparent 70%)", pointerEvents: "none" }} />
                <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", position: "relative" }}>
                  <div style={{ flex: 1, minWidth: 220 }}>
                    <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#a78bfa", marginBottom: 8 }}>Learning Journey</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#f0f4f9", marginBottom: 6 }}>B.Com → MCA → IT Pro → Cloud Engineer</div>
                    <div style={{ fontSize: 13, color: "rgba(240,244,249,0.5)", lineHeight: 1.65 }}>
                      From commerce fundamentals to MCA — building the analytical + technical foundation for a cloud engineering career.
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    {[
                      { n: "2",   l: "Degrees",        c: "#7c3aed", path: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" },
                      { n: "2",   l: "Certifications",  c: "#d97706", path: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
                      { n: "6+",  l: "Yrs Learning",   c: "#0d9488", path: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
                    ].map((s, i) => (
                      <div key={i} style={{ textAlign: "center", padding: "12px 18px", background: `${s.c}10`, borderRadius: 12, border: `1px solid ${s.c}22` }}>
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
                          <div style={{ width: 28, height: 28, borderRadius: 8, background: `${s.c}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Icon path={s.path} size={14} color={s.c} strokeWidth={2} />
                          </div>
                        </div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: s.c, lineHeight: 1 }}>{s.n}</div>
                        <div style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(240,244,249,0.3)", letterSpacing: 1, textTransform: "uppercase", marginTop: 4 }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Degree Timeline ── */}
              <div style={{ position: "relative" }}>
                {/* Timeline vertical line */}
                <div style={{ position: "absolute", left: 29, top: 16, bottom: 16, width: 2, background: "linear-gradient(180deg,#7c3aed,#6366f1,rgba(99,102,241,0))", borderRadius: 1 }} />

                <div style={{ display: "grid", gap: 16 }}>
                  {educationData.map((e) => (
                    <div key={e.id} style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: 0 }}>
                      {/* Timeline dot + year */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 20, gap: 6 }}>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", background: e.color, border: `3px solid #0c1825`, boxShadow: `0 0 12px ${e.color}70`, zIndex: 1, flexShrink: 0 }} />
                      </div>

                      {/* Degree Card */}
                      <div style={{ background: "#0f1e2e", borderRadius: 16, border: `1px solid ${e.color}22`, overflow: "hidden", marginBottom: 2 }}>
                        <div style={{ height: 3, background: `linear-gradient(90deg,${e.color},${e.color}40)` }} />
                        <div style={{ padding: "20px 24px" }}>

                          {/* Top: badge + title + meta */}
                          <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 16 }}>
                            {/* Degree abbreviation badge */}
                            <div style={{ width: 56, height: 56, borderRadius: 14, background: e.accentBg, border: `2px solid ${e.color}50`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 6px 20px ${e.color}20` }}>
                              <div style={{ fontFamily: "monospace", fontWeight: 900, fontSize: 13, color: e.color, letterSpacing: -0.5, lineHeight: 1 }}>{e.short}</div>
                              <div style={{ fontFamily: "monospace", fontSize: 8, color: `${e.color}80`, marginTop: 2, letterSpacing: 0.5 }}>DEGREE</div>
                            </div>

                            <div style={{ flex: 1 }}>
                              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
                                <div style={{ fontWeight: 800, fontSize: 16, color: "#f0f4f9", lineHeight: 1.2 }}>{e.title}</div>
                                {e.badge && (
                                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: "monospace", fontSize: 9, letterSpacing: 1, textTransform: "uppercase", background: "rgba(13,148,136,0.12)", color: "#0d9488", padding: "3px 10px", borderRadius: 20, border: "1px solid rgba(13,148,136,0.25)", fontWeight: 700 }}>
                                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                                    {e.badge}
                                  </span>
                                )}
                              </div>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                  <div style={{ width: 20, height: 20, borderRadius: 5, background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Icon path="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" size={11} color="rgba(240,244,249,0.35)" />
                                  </div>
                                  <span style={{ fontSize: 13, color: "rgba(240,244,249,0.5)" }}>{e.org}</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                  <div style={{ width: 20, height: 20, borderRadius: 5, background: `${e.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Icon path="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" size={11} color={e.color} />
                                  </div>
                                  <span style={{ fontFamily: "monospace", fontSize: 12, color: e.color, fontWeight: 600 }}>{e.date}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Two-col: Focus + Subjects */}
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            {/* Focus area box */}
                            <div style={{ padding: "12px 14px", background: `${e.color}07`, borderRadius: 10, border: `1px solid ${e.color}15` }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 7 }}>
                                <div style={{ width: 16, height: 16, borderRadius: 4, background: `${e.color}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  <Icon path="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" size={9} color={e.color} />
                                </div>
                                <div style={{ fontFamily: "monospace", fontSize: 8, letterSpacing: 2, textTransform: "uppercase", color: e.color }}>Focus</div>
                              </div>
                              <div style={{ fontSize: 12, color: "rgba(240,244,249,0.55)", lineHeight: 1.6 }}>{e.focus}</div>
                            </div>

                            {/* Key subjects */}
                            <div style={{ padding: "12px 14px", background: "rgba(255,255,255,0.02)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.05)" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                                <div style={{ width: 16, height: 16, borderRadius: 4, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  <Icon path="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" size={9} color="rgba(240,244,249,0.3)" />
                                </div>
                                <div style={{ fontFamily: "monospace", fontSize: 8, letterSpacing: 2, textTransform: "uppercase", color: "rgba(240,244,249,0.25)" }}>Subjects</div>
                              </div>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                                {e.subjects.map((s, i) => (
                                  <span key={i} style={{ fontSize: 11, padding: "3px 9px", borderRadius: 5, background: `${e.color}0d`, color: "rgba(240,244,249,0.6)", border: `1px solid ${e.color}18`, fontWeight: 500, lineHeight: 1.4 }}>{s}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Certifications ── */}
              <div style={{ background: "#0f1e2e", borderRadius: 16, border: "1px solid rgba(217,119,6,0.18)", overflow: "hidden" }}>
                <div style={{ height: 3, background: "linear-gradient(90deg,#d97706,#0d9488,#6366f1)" }} />
                <div style={{ padding: "22px 24px" }}>

                  {/* Certs header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <div>
                      <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#fbbf24", marginBottom: 4 }}>Certifications & Training</div>
                      <div style={{ fontSize: 12, color: "rgba(240,244,249,0.35)" }}>Professional credentials earned outside of formal education</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 14px", background: "rgba(217,119,6,0.08)", borderRadius: 20, border: "1px solid rgba(217,119,6,0.2)" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fbbf24", boxShadow: "0 0 6px #fbbf24" }} />
                      <span style={{ fontFamily: "monospace", fontSize: 9, color: "#fbbf24", letterSpacing: 1 }}>{certsData.length} CREDENTIALS</span>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 16 }}>
                    {certsData.map(c => (
                      <div key={c.id} style={{ background: `${c.color}06`, borderRadius: 14, border: `1px solid ${c.color}22`, overflow: "hidden", position: "relative" }}>
                        {/* Left colour stripe */}
                        <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 3, background: `linear-gradient(180deg,${c.color},${c.color}40)` }} />

                        <div style={{ padding: "18px 18px 18px 22px" }}>
                          {/* Header */}
                          <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 14 }}>
                            <div style={{ width: 48, height: 48, borderRadius: 13, background: `${c.color}15`, border: `1px solid ${c.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 4px 14px ${c.color}18` }}>
                              <Icon path={c.svgPath} size={23} color={c.color} />
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 800, fontSize: 14, color: "#f0f4f9", marginBottom: 5, lineHeight: 1.3 }}>{c.name}</div>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                  <Icon path="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" size={11} color={c.color} />
                                  <span style={{ fontFamily: "monospace", fontSize: 11, color: c.color, fontWeight: 600 }}>{c.issuer}</span>
                                </div>
                                <span style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(240,244,249,0.22)" }}>· {c.year}</span>
                              </div>
                            </div>
                            {/* Status pill */}
                            <span style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: 1, textTransform: "uppercase", background: `${c.color}15`, color: c.color, padding: "4px 10px", borderRadius: 20, border: `1px solid ${c.color}28`, fontWeight: 700, flexShrink: 0, alignSelf: "flex-start" }}>{c.status}</span>
                          </div>

                          {/* Detail line */}
                          <div style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(240,244,249,0.25)", letterSpacing: 1, marginBottom: 10, textTransform: "uppercase" }}>{c.detail}</div>

                          {/* Skills tags */}
                          <div style={{ marginBottom: c.nextStep ? 12 : 0 }}>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                              {c.skills.map((s, i) => (
                                <span key={i} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 6, background: "rgba(255,255,255,0.04)", color: "rgba(240,244,249,0.55)", border: "1px solid rgba(255,255,255,0.07)", fontWeight: 500 }}>{s}</span>
                              ))}
                            </div>
                          </div>

                          {/* Next step */}
                          {c.nextStep && (
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", background: "rgba(37,99,235,0.08)", borderRadius: 8, border: "1px solid rgba(37,99,235,0.18)", marginTop: 12 }}>
                              <div style={{ width: 22, height: 22, borderRadius: 6, background: "rgba(37,99,235,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <Icon path="M13 7l5 5m0 0l-5 5m5-5H6" size={12} color="#60a5fa" />
                              </div>
                              <span style={{ fontSize: 12, color: "#60a5fa", fontWeight: 600 }}>{c.nextStep}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ══ GOALS ══ */}
          {tab === "goals" && (
            <div>
              <DarkCard accent="linear-gradient(90deg,#0d9488,#2563eb)" style={{ padding: "22px 24px", marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <SectionTag label="Career Goals" style={{ marginBottom: 0 }} />
                  <div style={{ fontFamily: "monospace", fontSize: 20, fontWeight: 900, color: "#0d9488" }}>
                    {Math.round((goals.filter(g=>g.done).length / goals.length)*100)}%
                  </div>
                </div>
                <div style={{ height: 8, background: "rgba(255,255,255,0.07)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(goals.filter(g=>g.done).length/goals.length)*100}%`, background: "linear-gradient(90deg,#0d9488,#2563eb)", borderRadius: 4, transition: "width 0.5s ease", boxShadow: "0 0 12px rgba(13,148,136,0.4)" }} />
                </div>
                <div style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(240,244,249,0.3)", marginTop: 8 }}>
                  {goals.filter(g=>g.done).length} of {goals.length} goals completed
                </div>
              </DarkCard>

              <div style={{ display: "grid", gap: 10, marginBottom: 16 }}>
                {goals.map(g => (
                  <div key={g.id} onClick={() => { if (pinUnlocked) setGoals(goals.map(x => x.id===g.id ? {...x, done: !x.done} : x)); }}
                    style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "16px 20px", borderRadius: 12, border: `1px solid ${g.done ? "rgba(13,148,136,0.3)" : "rgba(255,255,255,0.06)"}`, background: g.done ? "rgba(13,148,136,0.08)" : "#0f1e2e", cursor: pinUnlocked ? "pointer" : "default", transition: "all 0.2s" }}>
                    <div style={{ width: 24, height: 24, border: `2px solid ${g.done ? "#0d9488" : "rgba(255,255,255,0.15)"}`, borderRadius: 7, flexShrink: 0, marginTop: 1, background: g.done ? "#0d9488" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", boxShadow: g.done ? "0 0 10px rgba(13,148,136,0.4)" : "none" }}>
                      {g.done && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>}
                    </div>
                    <span style={{ fontSize: 14, lineHeight: 1.65, color: g.done ? "rgba(240,244,249,0.4)" : "rgba(240,244,249,0.75)", textDecoration: g.done ? "line-through" : "none", transition: "all 0.2s", flex: 1 }}>{g.text}</span>
                    {!pinUnlocked && (
                      <div style={{ flexShrink: 0, opacity: 0.2 }}>
                        <Icon path="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" size={14} color="#f0f4f9" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {!pinUnlocked ? (
                <DarkCard style={{ padding: "28px 24px", textAlign: "center" }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon path="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" size={26} color="#60a5fa" />
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: "#f0f4f9", marginBottom: 6 }}>Owner Access Only</div>
                  <div style={{ fontSize: 13, color: "rgba(240,244,249,0.4)", marginBottom: 24 }}>Enter your PIN to mark goals as complete</div>
                  <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                    <input type="password" maxLength={6} value={pinInput}
                      onChange={e => { setPinInput(e.target.value); setPinError(false); }}
                      onKeyDown={e => { if (e.key==="Enter") { if (pinInput===CORRECT_PIN) { setPinUnlocked(true); setPinInput(""); setPinError(false); } else { setPinError(true); setPinInput(""); } }}}
                      placeholder="• • • •"
                      style={{ padding: "11px 18px", borderRadius: 10, border: `1.5px solid ${pinError ? "#ef4444" : "rgba(96,165,250,0.2)"}`, fontSize: 18, fontFamily: "monospace", width: 140, textAlign: "center", outline: "none", letterSpacing: 6, background: pinError ? "rgba(239,68,68,0.08)" : "rgba(255,255,255,0.04)", color: "#f0f4f9" }} />
                    <button onClick={() => { if (pinInput===CORRECT_PIN) { setPinUnlocked(true); setPinInput(""); setPinError(false); } else { setPinError(true); setPinInput(""); }}}
                      style={{ padding: "11px 24px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#2563eb,#1d4ed8)", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "monospace", boxShadow: "0 4px 16px rgba(37,99,235,0.35)" }}>
                      Unlock
                    </button>
                  </div>
                  {pinError && <div style={{ marginTop: 14, fontSize: 13, color: "#ef4444", fontWeight: 600 }}>Incorrect PIN. Try again.</div>}
                </DarkCard>
              ) : (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", background: "rgba(13,148,136,0.08)", borderRadius: 12, border: "1px solid rgba(13,148,136,0.25)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#0d9488", fontWeight: 600 }}>
                    <Icon path="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" size={16} color="#0d9488" />
                    Unlocked — tap any goal to update
                  </div>
                  <button onClick={() => { setPinUnlocked(false); setPinInput(""); }} style={{ background: "none", border: "1px solid rgba(13,148,136,0.3)", borderRadius: 8, padding: "6px 14px", fontSize: 11, color: "#0d9488", cursor: "pointer", fontFamily: "monospace" }}>
                    Lock
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

        {/* ── FOOTER ── */}
        <div style={{ borderTop: "1px solid rgba(96,165,250,0.08)", padding: "20px 24px" }}>
          <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#2563eb,#0d9488)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff" }}>IA</div>
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(240,244,249,0.3)" }}>Imran Ansari · IT Support Analyst</span>
            </div>
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              {[
                { path: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", label: "Email", href: "mailto:ia257085@gmail.com" },
                { path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z", label: "LinkedIn", href: LINKEDIN_URL, extra: <circle cx="4" cy="4" r="2"/> },
                { path: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3", label: "CV", href: CV_URL },
              ].map((l, i) => (
                <a key={i} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "monospace", fontSize: 11, color: "rgba(240,244,249,0.3)", textDecoration: "none" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={l.path} />{l.extra}
                  </svg>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
