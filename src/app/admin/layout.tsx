"use client";

import { PortalLayout } from "@/components/layout/portal-layout";

const navItems = [
  { label: "System Health", href: "/admin/system-health" },
  { label: "Audit Log", href: "/admin/audit-log" },
  { label: "Bias Report", href: "/admin/bias-report" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalLayout portalName="Admin Console" navItems={navItems}>
      {children}
    </PortalLayout>
  );
}
