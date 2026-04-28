"use client";

import { PortalLayout } from "@/components/layout/portal-layout";

const navItems = [
  { label: "Activity", href: "/manager/activity" },
  { label: "Pipeline", href: "/manager/pipeline" },
  { label: "JD Matching", href: "/manager/match" },
  { label: "Compare", href: "/manager/compare" },
  { label: "Outcomes", href: "/manager/outcomes" },
  { label: "Client Intel", href: "/manager/client-intelligence" },
  { label: "Analytics", href: "/manager/analytics" },
];

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalLayout portalName="Manager Dashboard" navItems={navItems}>
      {children}
    </PortalLayout>
  );
}
