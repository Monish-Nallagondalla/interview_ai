"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function DocViewerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/docs/${slug}.md`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.text();
      })
      .then((text) => { setContent(text); setLoading(false); })
      .catch(() => { setContent("# Document not found"); setLoading(false); });
  }, [slug]);

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-[#1a1a2e] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-8 py-4 flex items-center justify-between">
          <Link href="/docs" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-6 h-6 bg-[#FFE600] rounded-sm" />
            <span className="text-sm font-semibold text-white">InterviewAI</span>
            <div className="h-4 w-px bg-white/20" />
            <span className="text-sm text-white/60">Documentation</span>
          </Link>
          <Link href="/docs" className="text-sm text-white/50 hover:text-white transition-colors">
            All documents
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-8 py-12">
        {loading ? (
          <div className="text-gray-400 text-center py-20">Loading...</div>
        ) : (
          <article className="doc-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => <h1 className="text-3xl font-bold text-[#1a1a2e] mb-6 pb-4 border-b border-gray-100">{children}</h1>,
                h2: ({ children }) => <h2 className="text-xl font-bold text-[#1a1a2e] mt-10 mb-4">{children}</h2>,
                h3: ({ children }) => <h3 className="text-lg font-semibold text-[#1a1a2e] mt-6 mb-3">{children}</h3>,
                p: ({ children }) => <p className="text-[15px] text-gray-600 leading-relaxed mb-4">{children}</p>,
                ul: ({ children }) => <ul className="space-y-2 mb-4 ml-4">{children}</ul>,
                ol: ({ children }) => <ol className="space-y-2 mb-4 ml-4 list-decimal">{children}</ol>,
                li: ({ children }) => <li className="text-[15px] text-gray-600 leading-relaxed pl-1">{children}</li>,
                strong: ({ children }) => <strong className="font-semibold text-[#1a1a2e]">{children}</strong>,
                table: ({ children }) => (
                  <div className="overflow-x-auto mb-6 rounded-lg border border-gray-200">
                    <table className="w-full text-sm">{children}</table>
                  </div>
                ),
                thead: ({ children }) => <thead className="bg-gray-50">{children}</thead>,
                th: ({ children }) => <th className="px-4 py-3 text-left font-semibold text-[#1a1a2e] border-b border-gray-200">{children}</th>,
                td: ({ children }) => <td className="px-4 py-3 text-gray-600 border-b border-gray-100">{children}</td>,
                code: ({ children, className }) => {
                  if (className) {
                    return <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto mb-4 text-sm"><code className="text-gray-700">{children}</code></pre>;
                  }
                  return <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm text-[#1a1a2e] font-medium">{children}</code>;
                },
                blockquote: ({ children }) => <blockquote className="border-l-3 border-[#FFE600] pl-4 my-4 text-gray-500 italic">{children}</blockquote>,
                hr: () => <hr className="my-8 border-gray-100" />,
              }}
            >
              {content}
            </ReactMarkdown>
          </article>
        )}
      </div>
    </div>
  );
}
