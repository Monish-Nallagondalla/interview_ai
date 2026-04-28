"use client";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { mockCandidates } from "@/lib/mock-data";

const candidate = mockCandidates[0]; // Rajesh Kumar as demo user

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ey-dark">{candidate.name}</h1>
          <p className="text-ey-gray">{candidate.department} · {candidate.businessUnit} · {candidate.yearsExp} years experience</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-ey-gray">Profile Enrichment</div>
          <div className="flex items-center gap-2 mt-1">
            <Progress value={candidate.enrichmentComplete} className="w-32 h-2" />
            <span className="text-sm font-semibold text-ey-dark">{candidate.enrichmentComplete}%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border p-5">
          <h2 className="font-semibold text-ey-dark mb-4">Skills Inventory</h2>
          <div className="space-y-3">
            {candidate.skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-ey-dark font-medium">{skill.name}</span>
                  <span className="text-ey-gray">{skill.years}y · {skill.proficiency}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${skill.proficiency}%`,
                      backgroundColor: skill.proficiency >= 75 ? "#22c55e" : skill.proficiency >= 50 ? "#FFE600" : "#ef4444",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border p-5">
          <h2 className="font-semibold text-ey-dark mb-4">Experience</h2>
          <div className="space-y-4">
            {candidate.experiences.map((exp, i) => (
              <div key={i} className="border-l-2 border-ey-yellow pl-4">
                <div className="font-medium text-ey-dark text-sm">{exp.role}</div>
                <div className="text-xs text-ey-gray">{exp.company} · {exp.duration} · {exp.domain}</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                  ))}
                </div>
                <ul className="mt-2 text-xs text-ey-gray space-y-0.5">
                  {exp.achievements.map((a, j) => (
                    <li key={j}>• {a}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-5">
        <h2 className="font-semibold text-ey-dark mb-3">Enrichment Notes</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm text-ey-dark">
          <p className="font-medium mb-1">AI-extracted additions from enrichment conversation:</p>
          <ul className="text-xs text-ey-gray space-y-1">
            <li>• Cloud migration project handled 50K daily transactions with 99.9% uptime</li>
            <li>• Led team of 4 developers during microservices migration — previously unlisted</li>
            <li>• Reduced API latency by 40% using Redis caching — quantified from vague &quot;performance improvement&quot;</li>
            <li>• Experience with Kafka event streaming — missing from original resume</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
