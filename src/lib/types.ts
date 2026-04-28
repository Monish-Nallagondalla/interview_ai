export interface Skill {
  name: string;
  proficiency: number; // 0-100
  years: number;
  lastUsed?: string;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  domain: string;
  technologies: string[];
  achievements: string[];
}

export interface CandidateProfile {
  id: string;
  name: string;
  email: string;
  department: string;
  businessUnit: string;
  benchSince: string;
  yearsExp: number;
  skills: Skill[];
  experiences: Experience[];
  enrichmentComplete: number; // 0-100
  readinessScore: number; // 0-100
  dimensions: ReadinessDimensions;
  status: "on-bench" | "in-prep" | "interview-ready" | "interviewing" | "placed";
  mocksTaken: number;
  lastActive: string;
  trend: "improving" | "stable" | "declining";
}

export interface ReadinessDimensions {
  technicalDepth: number;
  communicationClarity: number;
  starQuality: number;
  jdAlignment: number;
  confidence: number;
  problemSolving: number;
}

export interface JobDescription {
  id: string;
  clientName: string;
  roleTitle: string;
  rawText: string;
  mustHaveSkills: string[];
  niceToHaveSkills: string[];
  experienceYears: number;
  domain: string;
  postedDate: string;
}

export interface GapAnalysis {
  overallMatch: number;
  skillMatches: { skill: string; status: "strong" | "partial" | "missing"; detail: string }[];
  experienceGaps: string[];
  storyGaps: string[];
  priorityActions: string[];
}

export interface MockSession {
  id: string;
  candidateId: string;
  jdId: string;
  date: string;
  mode: "practice" | "simulation" | "stress";
  overallScore: number;
  dimensions: ReadinessDimensions;
  questionsCount: number;
  duration: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  agent: string;
  candidateId: string;
  candidateName: string;
  detail: string;
  confidence: "high" | "medium" | "low";
}

export interface ConversionData {
  month: string;
  withoutAI: number;
  withAI: number;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
