"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const sampleDocs = [
  { id: 1, name: "Cloud_Migration_Architecture.pdf", type: "Architecture Diagram", size: "2.4 MB", uploaded: "Apr 20", status: "analyzed" as const, insights: ["AWS multi-region setup detected — not mentioned in resume", "Disaster recovery architecture found — adds to system design story", "Auto-scaling configuration documented — quantifiable scale evidence"] },
  { id: 2, name: "Q3_Sprint_Report_Banking.docx", type: "Sprint Report", size: "1.1 MB", uploaded: "Apr 20", status: "analyzed" as const, insights: ["Led 3 sprints as proxy Scrum Master — unlisted leadership experience", "Velocity improvement from 34 to 52 story points — quantified team performance", "Delivered 2 sprints ahead of schedule — can become STAR story result"] },
  { id: 3, name: "Client_Feedback_TCS_2024.pdf", type: "Client Feedback", size: "0.8 MB", uploaded: "Apr 21", status: "analyzed" as const, insights: ["Client specifically commended API performance improvements", "Mentioned by name in project sign-off letter — strong credibility signal", "Rated 4.8/5 for technical delivery — rare quantified client feedback"] },
  { id: 4, name: "AWS_Solutions_Architect_Cert.pdf", type: "Certification", size: "0.3 MB", uploaded: "Apr 22", status: "analyzed" as const, insights: ["AWS Solutions Architect Associate — validates cloud claims in resume", "Passed in Dec 2023 — recent and relevant to target JD"] },
  { id: 5, name: "Microservices_Design_Doc.pdf", type: "Technical Document", size: "3.2 MB", uploaded: "Apr 22", status: "processing" as const, insights: [] },
  { id: 6, name: "Performance_Review_2023.docx", type: "Performance Review", size: "0.6 MB", uploaded: "Apr 23", status: "pending" as const, insights: [] },
];

const docTypes = [
  { type: "Architecture Diagrams", desc: "System designs, data flow diagrams, infrastructure layouts", icon: "◈" },
  { type: "Sprint / Project Reports", desc: "Velocity reports, sprint retrospectives, project status updates", icon: "◉" },
  { type: "Client Feedback", desc: "Sign-off letters, satisfaction surveys, commendation emails", icon: "◎" },
  { type: "Certifications", desc: "Course completions, professional certificates, badges", icon: "◇" },
  { type: "Technical Documents", desc: "Design docs, PRDs, RFCs, architecture decision records", icon: "◆" },
  { type: "Performance Reviews", desc: "Annual reviews, 360 feedback, promotion letters", icon: "◐" },
];

const statusColors = {
  analyzed: "bg-green-50 text-green-700 border-green-200",
  processing: "bg-yellow-50 text-yellow-700 border-yellow-200",
  pending: "bg-gray-50 text-gray-500 border-gray-200",
};

export default function EvidenceVaultPage() {
  const [activeDoc, setActiveDoc] = useState<typeof sampleDocs[0] | null>(null);
  const totalInsights = sampleDocs.filter(d => d.status === "analyzed").reduce((acc, d) => acc + d.insights.length, 0);

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a2e] mb-1">Project Evidence Vault</h1>
          <p className="text-sm text-gray-500 max-w-xl leading-relaxed">
            Upload supporting documents from your projects — architecture diagrams, sprint reports, client feedback, certifications. AI agents scan these to surface experience that your resume and enrichment conversation may have missed.
          </p>
        </div>
        <div className="flex gap-3 text-center shrink-0">
          <div className="bg-white border border-gray-200 rounded-xl px-4 py-3">
            <div className="text-xl font-bold text-[#1a1a2e]">{sampleDocs.length}</div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wide">Documents</div>
          </div>
          <div className="bg-[#1a1a2e] rounded-xl px-4 py-3">
            <div className="text-xl font-bold text-[#FFE600]">{totalInsights}</div>
            <div className="text-[10px] text-white/40 uppercase tracking-wide">Insights Found</div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-gray-50 border border-gray-100 rounded-xl p-5">
        <div className="text-sm font-semibold text-[#1a1a2e] mb-3">How the Evidence Vault works</div>
        <div className="grid grid-cols-4 gap-4 text-xs text-gray-500">
          <div className="flex gap-2">
            <span className="w-5 h-5 rounded-full bg-[#FFE600]/20 text-[#1a1a2e] font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
            <span>Upload any project document — AI agents scan for skills, achievements, and quantifiable outcomes</span>
          </div>
          <div className="flex gap-2">
            <span className="w-5 h-5 rounded-full bg-[#FFE600]/20 text-[#1a1a2e] font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
            <span>Agents cross-reference findings against your resume and enrichment profile to find gaps</span>
          </div>
          <div className="flex gap-2">
            <span className="w-5 h-5 rounded-full bg-[#FFE600]/20 text-[#1a1a2e] font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
            <span>New insights are flagged — things neither your resume nor enrichment conversation captured</span>
          </div>
          <div className="flex gap-2">
            <span className="w-5 h-5 rounded-full bg-[#FFE600]/20 text-[#1a1a2e] font-bold flex items-center justify-center shrink-0 text-[10px]">4</span>
            <span>Confirmed insights are added to your profile and used in gap analysis, prep plans, and story building</span>
          </div>
        </div>
      </div>

      {/* Upload zone */}
      <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[#FFE600] hover:bg-yellow-50/20 transition-all cursor-pointer group">
        <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gray-100 group-hover:bg-[#FFE600]/20 flex items-center justify-center transition-colors">
          <svg className="w-6 h-6 text-gray-400 group-hover:text-[#1a1a2e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <div className="text-sm font-semibold text-[#1a1a2e] mb-1">Upload project documents</div>
        <div className="text-xs text-gray-400">PDF, DOCX, TXT, PNG, JPG — any document that shows your work</div>
        <div className="mt-3 inline-flex items-center gap-2 bg-[#1a1a2e] text-white text-xs font-medium px-4 py-2 rounded-lg">
          Browse files
        </div>
      </div>

      {/* What to upload */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="text-sm font-semibold text-[#1a1a2e] mb-4">What documents to upload</div>
        <div className="grid grid-cols-3 gap-3">
          {docTypes.map((dt) => (
            <div key={dt.type} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-lg text-[#1a1a2e] shrink-0">{dt.icon}</span>
              <div>
                <div className="text-xs font-semibold text-[#1a1a2e]">{dt.type}</div>
                <div className="text-xs text-gray-400 mt-0.5 leading-relaxed">{dt.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Documents list */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="text-sm font-semibold text-[#1a1a2e]">Uploaded Documents</div>
          <div className="text-xs text-gray-400">{sampleDocs.filter(d => d.status === "analyzed").length} of {sampleDocs.length} analyzed</div>
        </div>
        <div className="divide-y divide-gray-50">
          {sampleDocs.map((doc) => (
            <div key={doc.id}>
              <button
                onClick={() => setActiveDoc(activeDoc?.id === doc.id ? null : doc)}
                className="w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-50/80 transition-colors text-left"
              >
                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-[#1a1a2e] truncate">{doc.name}</div>
                  <div className="text-xs text-gray-400">{doc.type} · {doc.size} · Uploaded {doc.uploaded}</div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {doc.status === "analyzed" && (
                    <span className="text-xs text-green-600 font-medium">{doc.insights.length} insights</span>
                  )}
                  <Badge className={`text-[10px] border ${statusColors[doc.status]}`}>
                    {doc.status}
                  </Badge>
                  {doc.status === "analyzed" && (
                    <span className="text-gray-300 text-xs">{activeDoc?.id === doc.id ? "▲" : "▼"}</span>
                  )}
                </div>
              </button>

              {activeDoc?.id === doc.id && doc.insights.length > 0 && (
                <div className="px-5 pb-4 bg-gray-50/50 border-t border-gray-100">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 pt-3">
                    AI-extracted insights — not found in resume or enrichment
                  </div>
                  <div className="space-y-2">
                    {doc.insights.map((insight, i) => (
                      <div key={i} className="flex items-start gap-3 bg-white border border-gray-100 rounded-lg p-3">
                        <span className="w-5 h-5 rounded-full bg-[#FFE600]/20 text-[#1a1a2e] font-bold flex items-center justify-center shrink-0 text-[10px] mt-px">{i + 1}</span>
                        <p className="text-sm text-[#1a1a2e] leading-relaxed">{insight}</p>
                        <button className="text-[10px] font-semibold text-[#1a1a2e] bg-[#FFE600]/20 px-2.5 py-1 rounded shrink-0 hover:bg-[#FFE600]/40 transition-colors">
                          Add to profile
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Privacy note */}
      <div className="text-xs text-gray-400 text-center leading-relaxed">
        Documents are processed securely and used only to strengthen your interview preparation profile.
        Nothing is shared with clients or external parties. You control what gets added to your profile.
      </div>
    </div>
  );
}
