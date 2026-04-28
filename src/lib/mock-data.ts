import { CandidateProfile, JobDescription, MockSession, AuditLogEntry, ConversionData } from "./types";

export const mockCandidates: CandidateProfile[] = [
  {
    id: "c1", name: "Rajesh Kumar", email: "rajesh.k@company.com",
    department: "Cloud & Infrastructure", businessUnit: "BFSI",
    benchSince: "2026-03-15", yearsExp: 6,
    skills: [
      { name: "Java", proficiency: 85, years: 5 },
      { name: "Spring Boot", proficiency: 78, years: 4 },
      { name: "AWS", proficiency: 65, years: 3 },
      { name: "Microservices", proficiency: 72, years: 3 },
      { name: "Docker", proficiency: 60, years: 2 },
      { name: "Kubernetes", proficiency: 45, years: 1 },
    ],
    experiences: [
      { company: "Internal - BFSI Project", role: "Senior Java Developer", duration: "2 years", domain: "Banking", technologies: ["Java", "Spring Boot", "AWS", "PostgreSQL"], achievements: ["Led migration of monolith to microservices", "Reduced API latency by 40%"] },
      { company: "Internal - Insurance Platform", role: "Java Developer", duration: "3 years", domain: "Insurance", technologies: ["Java", "Spring", "Oracle", "Jenkins"], achievements: ["Built claims processing module", "Handled 50K daily transactions"] },
    ],
    enrichmentComplete: 72, readinessScore: 68,
    dimensions: { technicalDepth: 75, communicationClarity: 55, starQuality: 60, jdAlignment: 72, confidence: 65, problemSolving: 70 },
    status: "in-prep", mocksTaken: 3, lastActive: "2026-04-27", trend: "improving",
  },
  {
    id: "c2", name: "Priya Sharma", email: "priya.s@company.com",
    department: "Data & Analytics", businessUnit: "Retail",
    benchSince: "2026-04-01", yearsExp: 4,
    skills: [
      { name: "Python", proficiency: 82, years: 4 },
      { name: "SQL", proficiency: 88, years: 4 },
      { name: "Tableau", proficiency: 75, years: 3 },
      { name: "PySpark", proficiency: 55, years: 1 },
      { name: "Machine Learning", proficiency: 50, years: 1 },
    ],
    experiences: [
      { company: "Internal - Retail Analytics", role: "Data Analyst", duration: "2.5 years", domain: "Retail", technologies: ["Python", "SQL", "Tableau", "BigQuery"], achievements: ["Built customer segmentation model", "Delivered 20+ dashboards for CXO reporting"] },
    ],
    enrichmentComplete: 45, readinessScore: 52,
    dimensions: { technicalDepth: 60, communicationClarity: 70, starQuality: 40, jdAlignment: 48, confidence: 55, problemSolving: 50 },
    status: "in-prep", mocksTaken: 1, lastActive: "2026-04-26", trend: "improving",
  },
  {
    id: "c3", name: "Amit Patel", email: "amit.p@company.com",
    department: "Full Stack", businessUnit: "TMT",
    benchSince: "2026-02-20", yearsExp: 8,
    skills: [
      { name: "React", proficiency: 90, years: 5 },
      { name: "Node.js", proficiency: 85, years: 5 },
      { name: "TypeScript", proficiency: 88, years: 4 },
      { name: "AWS", proficiency: 70, years: 3 },
      { name: "System Design", proficiency: 75, years: 4 },
      { name: "GraphQL", proficiency: 65, years: 2 },
    ],
    experiences: [
      { company: "Internal - SaaS Platform", role: "Lead Full Stack Developer", duration: "3 years", domain: "Technology", technologies: ["React", "Node.js", "TypeScript", "AWS", "MongoDB"], achievements: ["Architected multi-tenant SaaS platform serving 200+ enterprise clients", "Led team of 6 engineers", "Reduced build time by 60%"] },
      { company: "Internal - E-commerce", role: "Senior Developer", duration: "2 years", domain: "Retail", technologies: ["React", "Node.js", "PostgreSQL"], achievements: ["Built checkout flow handling ₹50Cr/month GMV"] },
    ],
    enrichmentComplete: 88, readinessScore: 82,
    dimensions: { technicalDepth: 88, communicationClarity: 78, starQuality: 82, jdAlignment: 80, confidence: 85, problemSolving: 82 },
    status: "interview-ready", mocksTaken: 5, lastActive: "2026-04-28", trend: "stable",
  },
  {
    id: "c4", name: "Sneha Reddy", email: "sneha.r@company.com",
    department: "QA & Testing", businessUnit: "Healthcare",
    benchSince: "2026-03-01", yearsExp: 5,
    skills: [
      { name: "Selenium", proficiency: 85, years: 4 },
      { name: "Java", proficiency: 60, years: 3 },
      { name: "API Testing", proficiency: 78, years: 3 },
      { name: "Cypress", proficiency: 55, years: 1 },
      { name: "Performance Testing", proficiency: 45, years: 1 },
    ],
    experiences: [
      { company: "Internal - Healthcare Portal", role: "QA Lead", duration: "2 years", domain: "Healthcare", technologies: ["Selenium", "Java", "Postman", "JMeter"], achievements: ["Set up automation framework from scratch", "Reduced regression cycle from 5 days to 8 hours"] },
    ],
    enrichmentComplete: 60, readinessScore: 58,
    dimensions: { technicalDepth: 62, communicationClarity: 65, starQuality: 50, jdAlignment: 55, confidence: 58, problemSolving: 55 },
    status: "in-prep", mocksTaken: 2, lastActive: "2026-04-25", trend: "improving",
  },
  {
    id: "c5", name: "Vikram Singh", email: "vikram.s@company.com",
    department: "DevOps", businessUnit: "BFSI",
    benchSince: "2026-04-10", yearsExp: 7,
    skills: [
      { name: "Kubernetes", proficiency: 88, years: 4 },
      { name: "Docker", proficiency: 90, years: 5 },
      { name: "Terraform", proficiency: 82, years: 3 },
      { name: "AWS", proficiency: 85, years: 5 },
      { name: "CI/CD", proficiency: 90, years: 5 },
      { name: "Python", proficiency: 60, years: 2 },
    ],
    experiences: [
      { company: "Internal - Core Banking", role: "Senior DevOps Engineer", duration: "3 years", domain: "Banking", technologies: ["Kubernetes", "AWS", "Terraform", "Jenkins", "ArgoCD"], achievements: ["Built zero-downtime deployment pipeline for core banking", "Managed 200+ microservices in production", "Reduced infra cost by 35%"] },
    ],
    enrichmentComplete: 90, readinessScore: 78,
    dimensions: { technicalDepth: 88, communicationClarity: 62, starQuality: 75, jdAlignment: 78, confidence: 80, problemSolving: 85 },
    status: "interview-ready", mocksTaken: 4, lastActive: "2026-04-28", trend: "stable",
  },
  {
    id: "c6", name: "Ananya Iyer", email: "ananya.i@company.com",
    department: "Data & Analytics", businessUnit: "TMT",
    benchSince: "2026-01-15", yearsExp: 3,
    skills: [
      { name: "Python", proficiency: 70, years: 3 },
      { name: "SQL", proficiency: 75, years: 3 },
      { name: "Power BI", proficiency: 80, years: 2 },
      { name: "Excel", proficiency: 85, years: 3 },
    ],
    experiences: [
      { company: "Internal - Telecom Analytics", role: "Analyst", duration: "2 years", domain: "Telecom", technologies: ["Python", "SQL", "Power BI"], achievements: ["Created churn prediction model with 78% accuracy", "Automated monthly reporting saving 40 hrs/month"] },
    ],
    enrichmentComplete: 35, readinessScore: 38,
    dimensions: { technicalDepth: 42, communicationClarity: 48, starQuality: 30, jdAlignment: 35, confidence: 40, problemSolving: 38 },
    status: "on-bench", mocksTaken: 0, lastActive: "2026-04-20", trend: "stable",
  },
  {
    id: "c7", name: "Mohammed Farhan", email: "farhan.m@company.com",
    department: "Cloud & Infrastructure", businessUnit: "Manufacturing",
    benchSince: "2026-03-28", yearsExp: 10,
    skills: [
      { name: "Azure", proficiency: 92, years: 6 },
      { name: "AWS", proficiency: 75, years: 3 },
      { name: "Networking", proficiency: 85, years: 8 },
      { name: "Security", proficiency: 80, years: 5 },
      { name: "Terraform", proficiency: 70, years: 3 },
    ],
    experiences: [
      { company: "Internal - Manufacturing ERP", role: "Cloud Architect", duration: "4 years", domain: "Manufacturing", technologies: ["Azure", "Terraform", "Active Directory", "VPN"], achievements: ["Designed hybrid cloud architecture for 15 factories", "Led cloud migration of SAP workloads", "Achieved 99.99% uptime SLA"] },
    ],
    enrichmentComplete: 82, readinessScore: 75,
    dimensions: { technicalDepth: 90, communicationClarity: 60, starQuality: 72, jdAlignment: 70, confidence: 75, problemSolving: 82 },
    status: "in-prep", mocksTaken: 3, lastActive: "2026-04-27", trend: "improving",
  },
  {
    id: "c8", name: "Kavitha Nair", email: "kavitha.n@company.com",
    department: "Full Stack", businessUnit: "Retail",
    benchSince: "2026-04-05", yearsExp: 4,
    skills: [
      { name: "Angular", proficiency: 78, years: 3 },
      { name: "Java", proficiency: 72, years: 3 },
      { name: "Spring Boot", proficiency: 65, years: 2 },
      { name: "MySQL", proficiency: 70, years: 3 },
    ],
    experiences: [
      { company: "Internal - Loyalty Platform", role: "Full Stack Developer", duration: "2.5 years", domain: "Retail", technologies: ["Angular", "Java", "Spring Boot", "MySQL"], achievements: ["Built reward redemption module used by 2M+ customers", "Integrated with 3 payment gateways"] },
    ],
    enrichmentComplete: 55, readinessScore: 48,
    dimensions: { technicalDepth: 55, communicationClarity: 52, starQuality: 38, jdAlignment: 45, confidence: 48, problemSolving: 50 },
    status: "in-prep", mocksTaken: 1, lastActive: "2026-04-24", trend: "improving",
  },
  {
    id: "c9", name: "Arjun Menon", email: "arjun.m@company.com",
    department: "Data & Analytics", businessUnit: "BFSI",
    benchSince: "2026-02-10", yearsExp: 6,
    skills: [
      { name: "Python", proficiency: 88, years: 5 },
      { name: "Machine Learning", proficiency: 82, years: 4 },
      { name: "Deep Learning", proficiency: 70, years: 2 },
      { name: "SQL", proficiency: 85, years: 5 },
      { name: "MLflow", proficiency: 60, years: 1 },
      { name: "AWS SageMaker", proficiency: 55, years: 1 },
    ],
    experiences: [
      { company: "Internal - Credit Risk", role: "Senior Data Scientist", duration: "3 years", domain: "Banking", technologies: ["Python", "Scikit-learn", "TensorFlow", "SQL", "Airflow"], achievements: ["Built credit scoring model reducing default rate by 18%", "Deployed 5 ML models to production", "Processed 10M+ records daily"] },
    ],
    enrichmentComplete: 78, readinessScore: 71,
    dimensions: { technicalDepth: 82, communicationClarity: 58, starQuality: 68, jdAlignment: 72, confidence: 70, problemSolving: 78 },
    status: "in-prep", mocksTaken: 3, lastActive: "2026-04-28", trend: "improving",
  },
  {
    id: "c10", name: "Deepika Joshi", email: "deepika.j@company.com",
    department: "SAP & ERP", businessUnit: "Manufacturing",
    benchSince: "2026-03-20", yearsExp: 9,
    skills: [
      { name: "SAP FICO", proficiency: 90, years: 7 },
      { name: "SAP S/4HANA", proficiency: 75, years: 3 },
      { name: "SAP BW", proficiency: 80, years: 5 },
      { name: "ABAP", proficiency: 70, years: 5 },
    ],
    experiences: [
      { company: "Internal - Manufacturing ERP", role: "SAP Consultant", duration: "4 years", domain: "Manufacturing", technologies: ["SAP FICO", "S/4HANA", "BW/4HANA"], achievements: ["Led S/4HANA migration for 3 plant locations", "Configured financial close process reducing cycle by 5 days"] },
    ],
    enrichmentComplete: 70, readinessScore: 65,
    dimensions: { technicalDepth: 82, communicationClarity: 55, starQuality: 58, jdAlignment: 62, confidence: 60, problemSolving: 65 },
    status: "in-prep", mocksTaken: 2, lastActive: "2026-04-26", trend: "improving",
  },
];

export const mockJDs: JobDescription[] = [
  {
    id: "jd1", clientName: "Global Bank Corp", roleTitle: "Senior Java Microservices Developer",
    rawText: "Looking for a Senior Java Developer with 5+ years experience in microservices architecture, Spring Boot, AWS, and containerization. BFSI domain experience required. Must demonstrate experience with high-throughput transaction systems.",
    mustHaveSkills: ["Java", "Spring Boot", "Microservices", "AWS"],
    niceToHaveSkills: ["Kubernetes", "Docker", "Kafka", "PostgreSQL"],
    experienceYears: 5, domain: "BFSI", postedDate: "2026-04-20",
  },
  {
    id: "jd2", clientName: "RetailTech Inc", roleTitle: "Full Stack Lead - React/Node",
    rawText: "Seeking a Full Stack Lead with strong React, Node.js, TypeScript, and AWS experience. Must have led teams of 4+ engineers. E-commerce or SaaS platform experience preferred. System design skills essential.",
    mustHaveSkills: ["React", "Node.js", "TypeScript", "System Design"],
    niceToHaveSkills: ["AWS", "GraphQL", "MongoDB", "Team Leadership"],
    experienceYears: 7, domain: "Retail", postedDate: "2026-04-22",
  },
  {
    id: "jd3", clientName: "HealthFirst Digital", roleTitle: "Data Scientist - ML Platform",
    rawText: "Data Scientist for ML platform team. Strong Python, ML, and production deployment experience. Must have built and deployed models at scale. Healthcare or BFSI domain preferred.",
    mustHaveSkills: ["Python", "Machine Learning", "SQL", "MLOps"],
    niceToHaveSkills: ["Deep Learning", "AWS SageMaker", "MLflow", "PySpark"],
    experienceYears: 5, domain: "Healthcare", postedDate: "2026-04-25",
  },
  {
    id: "jd4", clientName: "CloudScale Solutions", roleTitle: "Senior DevOps Engineer",
    rawText: "Senior DevOps Engineer for cloud-native infrastructure. Must have deep Kubernetes, AWS, and Terraform experience. CI/CD pipeline design for microservices. BFSI compliance experience a plus.",
    mustHaveSkills: ["Kubernetes", "AWS", "Terraform", "CI/CD"],
    niceToHaveSkills: ["Docker", "ArgoCD", "Python", "Security"],
    experienceYears: 6, domain: "BFSI", postedDate: "2026-04-18",
  },
];

export const mockSessions: MockSession[] = [
  { id: "s1", candidateId: "c1", jdId: "jd1", date: "2026-04-20", mode: "practice", overallScore: 55, dimensions: { technicalDepth: 60, communicationClarity: 45, starQuality: 48, jdAlignment: 58, confidence: 52, problemSolving: 55 }, questionsCount: 8, duration: "25 min" },
  { id: "s2", candidateId: "c1", jdId: "jd1", date: "2026-04-24", mode: "practice", overallScore: 62, dimensions: { technicalDepth: 68, communicationClarity: 52, starQuality: 55, jdAlignment: 65, confidence: 60, problemSolving: 62 }, questionsCount: 10, duration: "30 min" },
  { id: "s3", candidateId: "c1", jdId: "jd1", date: "2026-04-27", mode: "simulation", overallScore: 68, dimensions: { technicalDepth: 75, communicationClarity: 55, starQuality: 60, jdAlignment: 72, confidence: 65, problemSolving: 70 }, questionsCount: 12, duration: "35 min" },
  { id: "s4", candidateId: "c3", jdId: "jd2", date: "2026-04-15", mode: "practice", overallScore: 72, dimensions: { technicalDepth: 80, communicationClarity: 68, starQuality: 70, jdAlignment: 72, confidence: 75, problemSolving: 70 }, questionsCount: 10, duration: "28 min" },
  { id: "s5", candidateId: "c3", jdId: "jd2", date: "2026-04-22", mode: "simulation", overallScore: 78, dimensions: { technicalDepth: 85, communicationClarity: 72, starQuality: 78, jdAlignment: 78, confidence: 80, problemSolving: 78 }, questionsCount: 12, duration: "32 min" },
  { id: "s6", candidateId: "c3", jdId: "jd2", date: "2026-04-26", mode: "stress", overallScore: 82, dimensions: { technicalDepth: 88, communicationClarity: 78, starQuality: 82, jdAlignment: 80, confidence: 85, problemSolving: 82 }, questionsCount: 15, duration: "40 min" },
];

export const mockAuditLog: AuditLogEntry[] = [
  { id: "a1", timestamp: "2026-04-28 09:15", action: "Readiness Score Updated", agent: "Gap Analyzer", candidateId: "c3", candidateName: "Amit Patel", detail: "Score increased from 78 to 82 after mock #5. Technical depth and STAR quality improved significantly. Confidence: HIGH — based on 5 mock sessions and consistent improvement trajectory.", confidence: "high" },
  { id: "a2", timestamp: "2026-04-28 08:30", action: "Interview Ready Flag", agent: "Readiness Calculator", candidateId: "c3", candidateName: "Amit Patel", detail: "Candidate crossed 80-point readiness threshold for JD 'Full Stack Lead - React/Node'. All 6 dimensions above 70. Recommending for interview submission. Manager approval required.", confidence: "high" },
  { id: "a3", timestamp: "2026-04-27 16:45", action: "Prep Plan Adjusted", agent: "Prep Plan Agent", candidateId: "c1", candidateName: "Rajesh Kumar", detail: "Communication clarity score still at 55 after 3 mocks. Shifting Day 8-9 focus to articulation drills and STAR story refinement. Added 2 extra story-building exercises.", confidence: "medium" },
  { id: "a4", timestamp: "2026-04-27 14:20", action: "Gap Analysis Generated", agent: "Gap Analyzer", candidateId: "c2", candidateName: "Priya Sharma", detail: "Profile vs JD match: 48%. Major gaps: PySpark (required, low proficiency), ML deployment (no production experience). Recommended: Fast-track PySpark learning + build deployment STAR story from existing project.", confidence: "medium" },
  { id: "a5", timestamp: "2026-04-27 11:00", action: "Stalled Candidate Alert", agent: "Monitoring System", candidateId: "c6", candidateName: "Ananya Iyer", detail: "No activity for 8 days. Enrichment at 35%, no mock interviews completed. ESCALATION: Notifying manager for check-in. Possible causes: low motivation, unclear prep path, personal circumstances.", confidence: "high" },
  { id: "a6", timestamp: "2026-04-26 17:30", action: "Mock Scored", agent: "Feedback Scorer", candidateId: "c5", candidateName: "Vikram Singh", detail: "Mock #4 (simulation mode): Overall 78. Technical depth excellent (88), but communication clarity at 62 — responses technically accurate but overly verbose. Recommended: Practice concise answers using 2-minute STAR format.", confidence: "high" },
  { id: "a7", timestamp: "2026-04-26 10:15", action: "Profile Enrichment Complete", agent: "Enrichment Chatbot", candidateId: "c5", candidateName: "Vikram Singh", detail: "Enrichment score: 90%. Extracted 8 quantified achievements from conversational interview. Key addition: '99.99% uptime SLA' and '200+ microservices managed' — previously missing from resume.", confidence: "high" },
  { id: "a8", timestamp: "2026-04-25 15:00", action: "Manager Override", agent: "Human Decision", candidateId: "c7", candidateName: "Mohammed Farhan", detail: "Manager overrode AI readiness score from 72 to 78. Reason: 'Farhan has strong client-facing experience not captured in profile — presented at 3 CXO forums last year.' Override logged for model calibration.", confidence: "high" },
];

export const conversionData: ConversionData[] = [
  { month: "Nov 25", withoutAI: 34, withAI: 34 },
  { month: "Dec 25", withoutAI: 32, withAI: 32 },
  { month: "Jan 26", withoutAI: 35, withAI: 38 },
  { month: "Feb 26", withoutAI: 33, withAI: 42 },
  { month: "Mar 26", withoutAI: 36, withAI: 48 },
  { month: "Apr 26", withoutAI: 34, withAI: 53 },
];

export const systemHealth = {
  modelLatency: "1.2s avg",
  uptime: "99.7%",
  activeSessions: 847,
  totalCandidates: 3420,
  hallucinationRate: "1.3%",
  biasVariance: "3.2%",
  feedbackIntegrationLag: "18 hrs",
  scoringConsistency: "96.8%",
  userSatisfaction: 4.3,
  apiCalls24h: 12847,
};

export const skillGapHeatmap = [
  { skill: "System Design", gapCount: 2840, severity: "critical" as const },
  { skill: "Cloud Architecture", gapCount: 2210, severity: "critical" as const },
  { skill: "Kubernetes", gapCount: 1950, severity: "high" as const },
  { skill: "Communication & Articulation", gapCount: 1820, severity: "high" as const },
  { skill: "ML/AI", gapCount: 1680, severity: "high" as const },
  { skill: "DevOps/CI-CD", gapCount: 1420, severity: "medium" as const },
  { skill: "Agile/Scrum", gapCount: 980, severity: "medium" as const },
  { skill: "Data Engineering", gapCount: 870, severity: "medium" as const },
  { skill: "Security", gapCount: 760, severity: "low" as const },
  { skill: "Testing/QA Automation", gapCount: 620, severity: "low" as const },
];
