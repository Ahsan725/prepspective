// File: components/OpenInOverleafButton.tsx
'use client';
import React from 'react';
import { Button } from '@/components/ui/button';

interface Props { tex: string; }

// LaTeX preamble to prepend before \begin{document}
const PREAMBLE = String.raw`\documentclass[a4paper,11pt]{article}
\usepackage{latexsym}
\usepackage{marvosym}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage{verbatim}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}
\usepackage[english]{babel}
\usepackage{tabularx}
\usepackage{graphicx}
\usepackage{multicol}

\pagestyle{fancy}
\fancyhf{} % clear header/footer fields
\fancyfoot{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}

% Adjust margins
\addtolength{\oddsidemargin}{-0.5in}
\addtolength{\evensidemargin}{-0.5in}
\addtolength{\textwidth}{1in}
\addtolength{\topmargin}{-0.5in}
\addtolength{\textheight}{1.0in}

\titleformat{\section}{\large\scshape\raggedright}{}{0em}{}[\titlerule]
\titlespacing{\section}{0pt}{3pt}{3pt}

\setlength{\tabcolsep}{0in}

\newcommand{\resumeItem}[2]{
  \item\small{\textbf{#1}{: #2 \vspace{-2pt}}}
}

\newcommand{\resumeSubheading}[4]{
  \vspace{1pt}\item
    \begin{tabular*}{\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{#1} & \textit{#2} \\
      \textit{#3} & \textit{#4} \\
    \end{tabular*}\vspace{-5pt}
}

\newcommand{\resumeSubItem}[2]{\item\small{\textbf{#1}{: #2\vspace{-2pt}}}}

\renewcommand{\labelitemii}{$\circ$}

\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.15in, label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}}
\newcommand{\resumeItemListEnd}{\end{itemize}}`;

export function OpenInOverleafButton({ tex }: Props) {
  // Combine preamble with body
  const combined = tex.includes('\\begin{document}')
    ? tex.replace('\\begin{document}', `${PREAMBLE}
\\begin{document}`)
    : `${PREAMBLE}
${tex}`;

  // Use a form POST to avoid URI-too-large errors
  return (
    <form
      action="https://www.overleaf.com/docs"
      method="POST"
      target="_blank"
      className="inline-block"
    >
      <input type="hidden" name="snip" value={combined} />
      <Button type="submit">Open in Overleaf</Button>
    </form>
  );
}
