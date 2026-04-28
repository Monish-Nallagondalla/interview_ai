"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { mockCandidates, mockJDs } from "@/lib/mock-data";
import { RadarChart } from "@/components/charts/radar-chart";

interface MatchResult {
  candidate: typeof mockCandidates[0];
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
}

export default function MatchPage() {
  const [selectedJD, setSelectedJD] = useState<string | null>(null);
  const [matches, setMatches] = useState<MatchResult[] | null>(null);
  const [expandedCandidate, setExpandedCandidate] = useState<string | null>(null);
  const [allJDs, setAllJDs] = useState(mockJDs);
  const [showUpload, setShowUpload] = useState(false);
  const [newJD, setNewJD] = useState({ clientName: "", roleTitle: "", rawText: "", experienceYears: "5", domain: "" });
  const [isParsingJD, setIsParsingJD] = useState(false);

  const runMatching = (jdId: string) => {
    setSelectedJD(jdId);
    const jd = allJDs.find((j) => j.id === jdId)!;
    const results: MatchResult[] = mockCandidates
      .map((c) => {
        const candidateSkillNames = c.skills.map((s) => s.name.toLowerCase());
        const matchedSkills = jd.mustHaveSkills.filter((s) => candidateSkillNames.includes(s.toLowerCase()));
        const missingSkills = jd.mustHaveSkills.filter((s) => !candidateSkillNames.includes(s.toLowerCase()));
        const skillMatch = jd.mustHaveSkills.length > 0 ? matchedSkills.length / jd.mustHaveSkills.length : 0;
        const expMatch = c.yearsExp >= jd.experienceYears ? 1 : c.yearsExp / jd.experienceYears;
        const matchScore = Math.round((skillMatch * 0.5 + expMatch * 0.2 + (c.readinessScore / 100) * 0.3) * 100);
        return { candidate: c, matchScore, matchedSkills, missingSkills };
      })
      .sort((a, b) => b.matchScore - a.matchScore);
    setMatches(results);
  };

  const extractSkillsFromText = (text: string): string[] => {
    const knownSkills = [
      "Java", "Spring Boot", "Python", "SQL", "React", "Node.js", "TypeScript", "AWS", "Azure", "GCP",
      "Kubernetes", "Docker", "Terraform", "Microservices", "System Design", "Machine Learning", "Deep Learning",
      "GraphQL", "Kafka", "CI/CD", "DevOps", "Selenium", "Angular", "PostgreSQL", "MongoDB", "Redis",
      "SAP", "Tableau", "Power BI", "PySpark", "MLflow", "Agile", "Scrum", "API Testing", "Security",
      "Networking", "ABAP", "S/4HANA", "Cypress", "Jenkins", "ArgoCD", "Airflow", "TensorFlow", "PyTorch",
      "NLP", "Computer Vision", "FastAPI", "Django", "MySQL", "Oracle", "Figma", "Jira",
    ];
    const textLower = text.toLowerCase();
    return knownSkills.filter((s) => textLower.includes(s.toLowerCase()));
  };

  const handleUploadJD = () => {
    setIsParsingJD(true);
    const extractedSkills = extractSkillsFromText(newJD.rawText);
    const parsed: typeof allJDs[0] = {
      id: `jd-custom-${Date.now()}`,
      clientName: newJD.clientName || "New Client",
      roleTitle: newJD.roleTitle || "Uploaded Role",
      rawText: newJD.rawText,
      mustHaveSkills: extractedSkills.slice(0, 6),
      niceToHaveSkills: extractedSkills.slice(6, 10),
      experienceYears: parseInt(newJD.experienceYears) || 5,
      domain: newJD.domain || "General",
      postedDate: new Date().toISOString().split("T")[0],
    };
    setAllJDs([parsed, ...allJDs]);
    setShowUpload(false);
    setNewJD({ clientName: "", roleTitle: "", rawText: "", experienceYears: "5", domain: "" });
    setIsParsingJD(false);
    runMatching(parsed.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ey-dark">JD → Candidate Matching</h1>
          <p className="text-ey-gray text-sm">Upload a new JD or select existing — find best-fit candidates ranked by skill match + readiness</p>
        </div>
        <Button
          onClick={() => setShowUpload(!showUpload)}
          className="bg-ey-yellow text-ey-dark hover:bg-yellow-400 font-semibold"
        >
          {showUpload ? "Cancel" : "+ Upload New JD"}
        </Button>
      </div>

      {showUpload && (
        <div className="bg-white rounded-lg border p-5 space-y-4">
          <h2 className="font-semibold text-ey-dark">Upload New Job Description</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-ey-gray block mb-1">Client Name</label>
              <Input
                value={newJD.clientName}
                onChange={(e) => setNewJD({ ...newJD, clientName: e.target.value })}
                placeholder="e.g., Acme Corp"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-ey-gray block mb-1">Role Title</label>
              <Input
                value={newJD.roleTitle}
                onChange={(e) => setNewJD({ ...newJD, roleTitle: e.target.value })}
                placeholder="e.g., Senior Data Engineer"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-ey-gray block mb-1">Min Experience (years)</label>
              <Input
                value={newJD.experienceYears}
                onChange={(e) => setNewJD({ ...newJD, experienceYears: e.target.value })}
                type="number"
                placeholder="5"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-ey-gray block mb-1">Domain</label>
              <Input
                value={newJD.domain}
                onChange={(e) => setNewJD({ ...newJD, domain: e.target.value })}
                placeholder="e.g., BFSI, Retail, Healthcare"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-ey-gray block mb-1">Full Job Description</label>
            <Textarea
              value={newJD.rawText}
              onChange={(e) => setNewJD({ ...newJD, rawText: e.target.value })}
              placeholder="Paste the complete job description here... The AI will extract required skills automatically."
              className="min-h-[160px] text-sm"
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-ey-gray">Skills will be automatically extracted from the JD text and matched against bench candidates.</p>
            <Button
              onClick={handleUploadJD}
              disabled={!newJD.rawText.trim() || isParsingJD}
              className="bg-ey-dark text-ey-yellow hover:bg-gray-800 font-semibold px-6"
            >
              {isParsingJD ? "Parsing JD..." : "Parse & Match Candidates →"}
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {allJDs.map((jd) => (
          <button
            key={jd.id}
            onClick={() => runMatching(jd.id)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              selectedJD === jd.id ? "border-ey-yellow bg-yellow-50" : "border-gray-100 bg-white hover:border-gray-300"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold text-ey-dark text-sm">{jd.roleTitle}</div>
                <div className="text-xs text-ey-gray">{jd.clientName} · {jd.domain} · {jd.experienceYears}+ years</div>
              </div>
              <Badge variant="secondary" className="text-xs shrink-0">{jd.postedDate}</Badge>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {jd.mustHaveSkills.map((s) => (
                <Badge key={s} className="text-xs bg-ey-dark text-white">{s}</Badge>
              ))}
            </div>
          </button>
        ))}
      </div>

      {matches && (
        <>
        {/* AI Staffing Recommendation — beyond the caselet ask */}
        <div className="bg-[#1a1a2e] rounded-xl p-5">
          <div className="text-[10px] font-bold tracking-widest text-[#FFE600]/60 uppercase mb-3">AI Staffing Recommendation</div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#FFE600] flex items-center justify-center text-[#1a1a2e] font-bold shrink-0">#1</div>
            <div className="flex-1">
              <div className="text-white font-semibold mb-1">{matches[0]?.candidate.name} — Submit for this interview</div>
              <div className="text-sm text-white/50 leading-relaxed">
                Based on {matches[0]?.candidate.mocksTaken} mock sessions, a {matches[0]?.candidate.readinessScore}/100 readiness score, and {matches[0]?.matchedSkills.length} of {allJDs.find(j => j.id === selectedJD)?.mustHaveSkills.length} must-have skills matched — this candidate has the highest predicted conversion probability for this JD.
                {matches[0]?.candidate.trend === "improving" && " Score is trending upward — readiness is improving with each session."}
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-2xl font-bold text-[#FFE600]">{matches[0]?.matchScore}%</div>
              <div className="text-[10px] text-white/30">match score</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b">
            <h2 className="font-semibold text-ey-dark text-sm">
              All Candidates — Ranked for: {allJDs.find((j) => j.id === selectedJD)?.roleTitle}
            </h2>
          </div>
          <div className="divide-y">
            {matches.map((match, rank) => (
              <div key={match.candidate.id}>
                <button
                  onClick={() => setExpandedCandidate(expandedCandidate === match.candidate.id ? null : match.candidate.id)}
                  className="w-full px-4 py-3 flex items-center gap-4 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                    rank < 3 ? "bg-ey-yellow text-ey-dark" : "bg-gray-100 text-ey-gray"
                  }`}>
                    #{rank + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-ey-dark">{match.candidate.name}</div>
                    <div className="text-xs text-ey-gray">{match.candidate.department} · {match.candidate.yearsExp}y · {match.candidate.businessUnit}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1">
                      {match.matchedSkills.map((s) => (
                        <Badge key={s} className="text-xs bg-green-100 text-green-700">{s}</Badge>
                      ))}
                      {match.missingSkills.map((s) => (
                        <Badge key={s} className="text-xs bg-red-100 text-red-700">{s}</Badge>
                      ))}
                    </div>
                    <div className="text-right shrink-0">
                      <div className={`text-lg font-bold ${
                        match.matchScore >= 70 ? "text-green-600" : match.matchScore >= 50 ? "text-yellow-600" : "text-red-600"
                      }`}>
                        {match.matchScore}%
                      </div>
                      <div className="text-[10px] text-ey-gray">match</div>
                    </div>
                  </div>
                </button>
                {expandedCandidate === match.candidate.id && (
                  <div className="px-4 pb-4 pt-0">
                    <div className="bg-gray-50 rounded-lg p-4 flex gap-6">
                      <RadarChart dimensions={match.candidate.dimensions} size={220} />
                      <div className="flex-1 space-y-3">
                        <div>
                          <div className="text-xs font-semibold text-ey-gray uppercase mb-1">Readiness Score</div>
                          <div className="text-2xl font-bold text-ey-dark">{match.candidate.readinessScore}/100</div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-ey-gray uppercase mb-1">Mock Interviews</div>
                          <div className="text-sm text-ey-dark">{match.candidate.mocksTaken} completed · Trend: {match.candidate.trend}</div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-ey-gray uppercase mb-1">Status</div>
                          <Badge className={`text-xs ${match.candidate.status === "interview-ready" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                            {match.candidate.status.replace("-", " ")}
                          </Badge>
                        </div>
                        <Button size="sm" className="bg-ey-dark text-ey-yellow hover:bg-gray-800 text-xs">
                          Submit for Interview →
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        </>
      )}
    </div>
  );
}
