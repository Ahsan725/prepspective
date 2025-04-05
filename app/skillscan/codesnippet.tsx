"use client"

import { Code } from "lucide-react"

export function CodeSnippet({ code }: { code: string }) {
  return (
    <div className="relative bg-[#282c34] rounded-xl shadow-2xl overflow-hidden border border-slate-700">
      <div className="absolute top-3 right-3">
        <Code className="h-5 w-5 text-slate-300" />
      </div>

      <pre className="p-4 font-mono text-sm leading-relaxed text-indigo-200 whitespace-pre-wrap overflow-x-auto">
        {code.split("\n").map((line, i) => (
          <div key={i} className="w-full">
            <span className="text-slate-400 select-none pr-4">{String(i + 1).padStart(2, "0")}</span>
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

function highlightLine(line: string): string {
  function escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  const categories = [
    {
      keywords: [
        "False", "True", "None", "and", "or", "not", "is", "in", "if", "elif", "else",
        "while", "for", "try", "except", "finally", "break", "continue", "pass",
        "return", "yield", "raise", "assert", "with", "as", "def", "lambda", "del",
        "global", "nonlocal", "match", "case", "import", "from", "enumerate"
      ],
      className: "text-purple-400"
    },
    {
      keywords: ["async", "await"],
      className: "text-pink-400"
    },
    {
      keywords: [
        "print", "range", "len", "append", "pop", "extend", "join",
        "put", "get", "appendleft", "popleft"
      ],
      className: "text-pink-300"
    },
    {
      keywords: [
        "heapq", "heapify", "collections", "deque", "defaultdict",
        "Queue", "List", "Dict", "str"
      ],
      className: "text-sky-400"
    },
    {
      keywords: ["self"],
      className: "text-yellow-400"
    }
  ];

  // Separate code and comment
  const commentIndex = line.indexOf("#");
  const codePart = commentIndex >= 0 ? line.slice(0, commentIndex) : line;
  const commentPart = commentIndex >= 0 ? line.slice(commentIndex) : "";

  // Escape both parts (but don't escape quotes)
  let escapedCode = escapeHtml(codePart);
  const escapedComment = escapeHtml(commentPart);

  // Highlight numbers
  escapedCode = escapedCode.replace(
    /\b(\d+)\b/g,
    `<span class="text-emerald-400">$1</span>`
  );


  escapedCode = escapedCode.replace(
    /([\[\]{}()])/g,
    `<span class="text-orange-300 font-bold">$1</span>`
  );

  // Highlight keywords
  for (const { keywords, className } of categories) {
    for (const keyword of keywords) {
      const regex = new RegExp(`\\b(${keyword})\\b`, "g");
      escapedCode = escapedCode.replace(
        regex,
        `<span class="${className}">$1</span>`
      );
    }
  }

  // Combine highlighted code + comment (which is just escaped, not modified)
  if (commentIndex >= 0) {
    return `${escapedCode}<span class="text-blue-400">${escapedComment}</span>`;
  }

  return escapedCode;
}



