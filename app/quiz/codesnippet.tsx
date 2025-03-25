"use client"

import { Code } from "lucide-react"

export function CodeSnippet({ code }: { code: string }) {
  return (
    <div className="relative bg-[#282c34] rounded-xl shadow-2xl overflow-hidden border border-slate-700">
      <div className="absolute top-3 right-3">
        <Code className="h-5 w-5 text-slate-400" />
      </div>

      <pre className="p-4 font-mono text-sm leading-relaxed text-slate-100 whitespace-pre-wrap overflow-x-auto">
        {code.split("\n").map((line, i) => (
          <div key={i} className="w-full">
            <span className="text-slate-500 select-none pr-4">{String(i + 1).padStart(2, "0")}</span>
            <span
              className="inline-block"
              dangerouslySetInnerHTML={{ __html: highlightLine(line) }}
            />
          </div>
        ))}
      </pre>
    </div>
  )
}

function highlightLine(line: string, highlightClass: string = "text-purple-400", keywords: string[] = ["False", "and", "as", "assert", "async", "await", "break", "class", "continue", "def", "del", "elif", "else", "except", "finally", "for", "from", "global", "if", "import", "in", "is", "lambda", "nonlocal", "not", "or", "pass", "raise", "return", "try", "while", "with", "yield", "match", "case", "print","heapq", "heapify", "append", "pop", "range","appendleft", "deque", "defaultdict", "put", "get", "Queue", "popleft","True", "None"]): string {

    function escapeHtml(unsafe: string): string {
        return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }

    let escapedLine = escapeHtml(line);

    // Removed number highlighting
    // escapedLine = escapedLine.replace(/\b\d+\b/g, (match) => `<span class="${highlightClass}">${match}</span>`);

    for (const keyword of keywords) {
        escapedLine = escapedLine.replace(new RegExp(`\\b(${keyword})\\b`, 'g'), `<span class="${highlightClass}">$1</span>`);
    }

    return escapedLine;
}
