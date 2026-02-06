'use client';

import React, { useState } from 'react';
import { SelectBragItem } from '@/db/schema';
import { Copy, Check, FileText, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExportBragSheetProps {
  items: SelectBragItem[];
}

const ExportBragSheet = ({ items }: ExportBragSheetProps) => {
  const [copied, setCopied] = useState(false);

  const generateMarkdown = () => {
    const grouped: Record<string, SelectBragItem[]> = {};
    
    items.forEach(item => {
      const d = new Date(item.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(item);
    });

    const sortedKeys = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

    let markdown = `# Professional Brag Sheet\n\n`;
    markdown += `**Total Contributions:** ${items.length}\n\n`;
    markdown += `---\n\n`;

    sortedKeys.forEach(key => {
      const d = new Date(key + '-01');
      const monthLabel = d.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
      markdown += `## ${monthLabel}\n\n`;

      grouped[key].forEach(item => {
        markdown += `### ${item.title}\n`;
        if (item.metric) markdown += `**Impact:** ${item.metric}\n\n`;
        if (item.description) markdown += `${item.description}\n\n`;
        markdown += `*Category: ${item.category}*\n\n`;
      });
    });

    return markdown;
  };

  const generatePlainText = () => {
    let text = `PROFESSIONAL BRAG SHEET\n`;
    text += `${'='.repeat(40)}\n\n`;
    text += `Total Contributions: ${items.length}\n\n`;

    const grouped: Record<string, SelectBragItem[]> = {};
    items.forEach(item => {
      const d = new Date(item.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(item);
    });

    const sortedKeys = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

    sortedKeys.forEach(key => {
      const d = new Date(key + '-01');
      const monthLabel = d.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
      text += `${monthLabel.toUpperCase()}\n`;
      text += `${'-'.repeat(30)}\n\n`;

      grouped[key].forEach(item => {
        text += `${item.title}\n`;
        if (item.metric) text += `Impact: ${item.metric}\n`;
        if (item.description) text += `${item.description}\n`;
        text += `Category: ${item.category}\n\n`;
      });
    });

    return text;
  };

  const handleCopy = async (format: 'markdown' | 'plain') => {
    const content = format === 'markdown' ? generateMarkdown() : generatePlainText();
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const markdown = generateMarkdown();
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `brag-sheet-${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (items.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleCopy('plain')}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all",
          copied 
            ? "bg-green-500/10 text-green-400 border border-green-500/30" 
            : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:border-zinc-700"
        )}
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        <span>{copied ? 'Copied' : 'Copy Text'}</span>
      </button>
      
      <button
        onClick={() => handleCopy('markdown')}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:border-zinc-700 transition-all"
      >
        <FileText className="w-4 h-4" />
        <span>Copy MD</span>
      </button>

      <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:border-zinc-700 transition-all"
      >
        <Download className="w-4 h-4" />
        <span>Download MD</span>
      </button>
    </div>
  );
};

export default ExportBragSheet;
