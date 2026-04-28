"use client";

import { PortalLayout } from "@/components/layout/portal-layout";
import { CandidateStatusBar } from "@/components/candidate-status-bar";

const navItems = [
  { label: "Onboarding", href: "/candidate/onboarding", step: 1 },
  { label: "Profile", href: "/candidate/profile", step: 2 },
  { label: "Gap Analysis", href: "/candidate/gap-analysis", step: 3 },
  { label: "Prep Plan", href: "/candidate/prep-plan", step: 4 },
  { label: "Story Builder", href: "/candidate/story-builder", step: 5 },
  { label: "Story Bank", href: "/candidate/story-bank" },
  { label: "Evidence Vault", href: "/candidate/evidence-vault" },
  { label: "Mock Interview", href: "/candidate/mock-interview", step: 6 },
  { label: "Mock History", href: "/candidate/mock-history" },
  { label: "Scorecard", href: "/candidate/scorecard", step: 7 },
  { label: "Interview Day", href: "/candidate/interview-day" },
];

export default function CandidateLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalLayout portalName="Candidate Portal" navItems={navItems}>
      <CandidateStatusBar />
      {children}
    </PortalLayout>
  );
}
