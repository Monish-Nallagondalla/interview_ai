"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { mockCandidates, mockJDs } from "@/lib/mock-data";

const pastOutcomes = [
  { candidate: "Amit Patel", jd: "Full Stack Lead - React/Node", result: "pass" as const, date: "2026-04-26", feedback: "Strong system design and leadership examples. Client impressed with SaaS platform architecture story." },
  { candidate: "Vikram Singh", jd: "Senior DevOps Engineer", result: "pass" as const, date: "2026-04-24", feedback: "Excellent Kubernetes depth. Communication could be more concise but technical competence was clear." },
  { candidate: "Rajesh Kumar", jd: "Senior Java Microservices Developer", result: "fail" as const, date: "2026-04-20", feedback: "Java fundamentals solid but couldn't articulate AWS experience beyond basics. Needs deeper cloud architecture stories." },
  { candidate: "Priya Sharma", jd: "Data Scientist - ML Platform", result: "fail" as const, date: "2026-04-18", feedback: "Strong SQL/Python but no production ML deployment experience. Couldn't answer MLOps questions confidently." },
];

export default function OutcomesPage() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ candidateId: "", jdId: "", result: "pass", clientFeedback: "", managerNotes: "", strengths: "", improvements: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setShowForm(false); setForm({ candidateId: "", jdId: "", result: "pass", clientFeedback: "", managerNotes: "", strengths: "", improvements: "" }); }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ey-dark">Interview Outcomes</h1>
          <p className="text-ey-gray text-sm">Log interview results to close the feedback loop — every outcome makes the AI smarter</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-ey-yellow text-ey-dark hover:bg-yellow-400 font-semibold">
          {showForm ? "Cancel" : "+ Log Interview Outcome"}
        </Button>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-ey-dark">
        <strong>Why this matters:</strong> Interview outcomes feed back into the scoring model. After 100+ logged outcomes, the system can predict conversion with &gt;75% accuracy and tailor prep to what specific clients actually value.
      </div>

      {showForm && (
        <div className="bg-white rounded-lg border p-5 space-y-4">
          <h2 className="font-semibold text-ey-dark">Log Interview Outcome</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-ey-gray block mb-1">Candidate</label>
              <select value={form.candidateId} onChange={(e) => setForm({...form, candidateId: e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm bg-white">
                <option value="">Select candidate</option>
                {mockCandidates.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-ey-gray block mb-1">Job Description</label>
              <select value={form.jdId} onChange={(e) => setForm({...form, jdId: e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm bg-white">
                <option value="">Select JD</option>
                {mockJDs.map((j) => <option key={j.id} value={j.id}>{j.roleTitle} — {j.clientName}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-ey-gray block mb-1">Result</label>
              <div className="flex gap-2 mt-1">
                <button onClick={() => setForm({...form, result: "pass"})} className={`flex-1 py-2 rounded text-sm font-medium border ${form.result === "pass" ? "bg-green-100 border-green-400 text-green-700" : "bg-white border-gray-200 text-ey-gray"}`}>
                  Pass
                </button>
                <button onClick={() => setForm({...form, result: "fail"})} className={`flex-1 py-2 rounded text-sm font-medium border ${form.result === "fail" ? "bg-red-100 border-red-400 text-red-700" : "bg-white border-gray-200 text-ey-gray"}`}>
                  Fail
                </button>
              </div>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-ey-gray block mb-1">Client Feedback (verbatim or summarized)</label>
            <Textarea value={form.clientFeedback} onChange={(e) => setForm({...form, clientFeedback: e.target.value})} placeholder="What did the client say about the candidate's performance?" className="min-h-[80px] text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-ey-gray block mb-1">What went well?</label>
              <Textarea value={form.strengths} onChange={(e) => setForm({...form, strengths: e.target.value})} placeholder="Specific strengths demonstrated..." className="min-h-[60px] text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-ey-gray block mb-1">What needs improvement?</label>
              <Textarea value={form.improvements} onChange={(e) => setForm({...form, improvements: e.target.value})} placeholder="Specific areas to improve..." className="min-h-[60px] text-sm" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-ey-gray block mb-1">Manager Notes (internal, not shared with candidate)</label>
            <Input value={form.managerNotes} onChange={(e) => setForm({...form, managerNotes: e.target.value})} placeholder="Any additional context..." />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSubmit} className="bg-ey-dark text-ey-yellow hover:bg-gray-800 font-semibold px-6">
              {submitted ? "Logged successfully" : "Submit Outcome"}
            </Button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border">
        <div className="px-4 py-3 bg-gray-50 border-b">
          <h2 className="font-semibold text-ey-dark text-sm">Recent Interview Outcomes</h2>
        </div>
        <div className="divide-y">
          {pastOutcomes.map((o, i) => (
            <div key={i} className="px-4 py-3 flex items-start gap-4">
              <Badge className={`text-xs mt-0.5 ${o.result === "pass" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {o.result}
              </Badge>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-ey-dark">{o.candidate}</span>
                  <span className="text-xs text-ey-gray">→ {o.jd}</span>
                </div>
                <div className="text-xs text-ey-gray mt-1">{o.feedback}</div>
              </div>
              <div className="text-xs text-ey-gray shrink-0">{o.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
