export const CLIENT = {
  name: "Dr. Mohammed Khursheed Akhtar",
  title: "Enterprise AI Solutions Architect & Transformation Executive",
  subtitle: "Generative AI · LLMs · Agentic AI · Enterprise AI Strategy · Platform Architecture",
  university: "Singhania University",
  degree: "PhD — Enterprise Resource Planning (ERP)",
  graduationYear: "2012",
  bio: `Senior Enterprise AI Solutions Architect and AI Transformation Executive with 35+ years of international experience leading enterprise technology modernization, AI strategy, platform architecture, analytics, ERP transformation, and digital innovation initiatives across Saudi Arabia, GCC, and India. Proven expertise in designing and operationalizing enterprise AI solutions, Generative AI platforms, AI agents, LLM-powered applications, intelligent automation systems, and decision intelligence frameworks that drive measurable business outcomes.`,
  languages: ["English (Full Professional)", "Hindi (Native)", "Urdu (Native)"],
  topSkills: ["Enterprise AI Strategy", "Generative AI Solutions", "AI Platform Architecture", "AI Transformation Programs", "Executive Advisory"],
}

export const STATS = [
  { value: 35, suffix: "+", label: "Years of Experience" },
  { value: 5, suffix: "", label: "Academic Degrees" },
  { value: 8, suffix: "+", label: "Certifications" },
  { value: 5, suffix: "+", label: "Awards & Honors" },
]

export const CERTIFICATIONS = [
  { name: "Generative AI Fundamentals", issuer: "be10x", date: "2024", id: null },
  { name: "Machine Learning Fundamentals", issuer: "ECGS Education", date: "2024", id: null },
  { name: "Python for Data Science", issuer: "Exponential World AI", date: "2024", id: null },
  { name: "Prompt Engineering", issuer: "be10x", date: "2024", id: null },
  { name: "AI Governance & Responsible AI", issuer: "ECGS Education", date: "2024", id: null },
  { name: "Tableau & Power BI Analytics", issuer: "Exponential World AI", date: "2024", id: null },
  { name: "Business Intelligence & Analytics", issuer: "SBUB Group", date: "2024", id: null },
  { name: "Research Analytics", issuer: "King Abdulaziz University", date: "2023", id: null },
]

export const SKILL_DOMAINS = [
  {
    title: "Enterprise AI & Transformation",
    skills: ["Enterprise AI Strategy", "AI Transformation Programs", "Generative AI Solutions", "Large Language Models (LLMs)", "AI Agents & Agentic Workflows", "AI Solution Architecture", "AI Governance & Responsible AI", "Enterprise Modernization"],
  },
  {
    title: "Data & Analytics",
    skills: ["Machine Learning", "Predictive Analytics", "Statistical Modelling", "Business Intelligence", "Decision Intelligence", "Data Visualization", "Data Governance", "KPI Framework Development"],
  },
  {
    title: "Leadership & Consulting",
    skills: ["Executive Advisory", "Stakeholder Management", "CXO Engagement", "Strategic Planning", "Cross-functional Leadership", "Innovation Management", "Change Management", "Workshop Facilitation"],
  },
]

export const EXPERIENCES = [
  {
    role: "Dean R&D & CEO",
    organization: "AITekNix Center of Excellence | Mumbai, India",
    period: "2025 — Present",
    description: "Leading AI innovation, digital transformation, workforce development, and research advisory initiatives focused on Generative AI, Machine Learning, Analytics, and Enterprise AI adoption. Designed AI transformation roadmaps, developed AI-enabled decision-support models, and conducted executive workshops on Generative AI, Prompt Engineering, AI Governance, and responsible AI implementation.",
  },
  {
    role: "Enterprise AI Advisor & Research Consultant",
    organization: "Saudi Arabia & India",
    period: "2018 — Present",
    description: "Providing strategic advisory services in AI adoption, analytics, digital transformation, research intelligence, and technology-enabled organizational development. Guided institutions on AI strategy, data-driven decision-making, and digital transformation initiatives. Delivered AI transformation workshops focused on Generative AI, Machine Learning, and intelligent automation opportunities.",
  },
  {
    role: "Senior Strategic Advisor, Faculty Member & Research Mentor",
    organization: "King Abdulaziz University | Jeddah, Saudi Arabia",
    period: "1990 — 2023",
    description: "Served as a strategic advisor, educator, researcher, and transformation advocate supporting academic excellence, digital innovation, and technology-enabled modernization initiatives. Led technology-enabled transformation initiatives, advised institutional leadership on data-driven decision-making, and designed programs in Artificial Intelligence, Machine Learning, Data Analytics, Computer Science, and Statistics.",
  },
]

export interface Honor {
  title: string
  role: string
  event: string
  date: string
  organizers: string
  location: string
  images: string[]
  highlights: string[]
  tags: string[]
}

export const HONORS: Honor[] = [
  {
    title: "Expert Resource Person & Felicitations at the Round Table Conference on Ethical AI",
    role: "Invited Resource Person, Panelist, and Keynote Speaker",
    event: "Round Table Conference on Ethical AI: Balancing Innovation, Integrity and Inclusion in Higher Education",
    date: "17th March 2026",
    organizers: "Rayat Centenary Innovation and Incubation Foundation",
    location: "Kharghar, Navi Mumbai, India",
    images: ["/assets/honor-award1.webp", "/assets/honor-award2.webp"],
    highlights: [
      "Delivered expert address on balancing technological innovation with integrity and inclusivity in higher education",
      "Participated in traditional lamp-lighting inauguration ceremony",
      "Contributed industry insights during round-table panel deliberations",
      "Honored with ceremonial plaque, commemorative award, and floral bouquet",
    ],
    tags: ["Ethical AI", "Higher Education", "Keynote Speaker", "Panelist"],
  },
  {
    title: "Keynote Speaker & Felicitations at ICETCISM 2026",
    role: "Invited Keynote Speaker and Honored Guest",
    event: "International Conference on Emerging Technologies in Computing, Intelligent Systems and Management (ICETCISM 2026)",
    date: "26th June 2026",
    organizers: "MET Institute of Computer Science, MET Bhujbal Knowledge City, Mumbai (in collaboration with ICT Academy)",
    location: "Mumbai, India",
    images: ["/assets/honor-award3.webp", "/assets/honor-award4.webp"],
    highlights: [
      "Delivered central Keynote Address on forward-looking paradigms in computing and intelligent enterprise systems",
      "Participated as honored dignitary in official launch of conference proceedings",
      "Honored on stage with framed traditional artwork memento and token of appreciation",
      "Engaged in networking sessions with faculty, international speakers, researchers, and students",
    ],
    tags: ["International Conference", "Keynote Speaker", "Emerging Technologies", "Computing & AI"],
  },
]

export const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Expertise", href: "#expertise" },
  { label: "Honors", href: "#honors" },
  { label: "Contact", href: "#contact" },
]
