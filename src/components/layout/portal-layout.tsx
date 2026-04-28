"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";

interface NavItem {
  label: string;
  href: string;
  step?: number;
}

interface PortalLayoutProps {
  children: React.ReactNode;
  portalName: string;
  navItems: NavItem[];
}

export function PortalLayout({ children, portalName, navItems }: PortalLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fb]">
      {/* Header */}
      <header className="bg-[#1a1a2e] text-white shadow-lg">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
              <Logo size={28} />
              <span className="font-semibold text-base tracking-tight">InterviewAI</span>
            </Link>
            <div className="h-5 w-px bg-white/20" />
            <span className="text-sm text-white/60 font-medium">{portalName}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right mr-2">
              <div className="text-sm text-white/90 font-medium leading-none">Demo User</div>
              <div className="text-xs text-white/40 mt-0.5">Rajesh Kumar</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FFE600] to-[#e6cf00] flex items-center justify-center text-[#1a1a2e] text-xs font-bold shadow-sm">
              RK
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <nav className="w-56 bg-white border-r border-gray-200/80 flex-shrink-0 overflow-y-auto">
          <div className="px-3 py-5 space-y-0.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const isSubItem = !item.step;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg text-sm transition-all duration-150",
                    isSubItem ? "pl-11 pr-3 py-2" : "px-3 py-2.5",
                    isActive
                      ? "bg-[#1a1a2e] text-white font-medium shadow-sm"
                      : isSubItem
                        ? "text-gray-400 hover:text-gray-700 hover:bg-gray-50"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  {item.step && (
                    <span className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors",
                      isActive
                        ? "bg-[#FFE600] text-[#1a1a2e]"
                        : "bg-gray-100 text-gray-400"
                    )}>
                      {item.step}
                    </span>
                  )}
                  {isSubItem && !isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                  )}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-[1400px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
