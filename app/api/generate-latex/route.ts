// File: app/api/generate-latex/route.ts
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { resumeText, jobDescription } = await req.json();
    if (!resumeText || !jobDescription) {
      return NextResponse.json(
        { error: 'Missing resumeText or jobDescription' },
        { status: 400 }
      );
    }

    const systemPrompt = String.raw`You are a professional résumé writer. Given a candidate’s résumé and a job description, produce a tailored résumé in LaTeX using exactly the template below (do NOT modify it). Incorporate keywords from job description into the resume for ATS optimization. Output ONLY the complete LaTeX code—no fences, no commentary—and include only the sections: Education, Experience, Skills, Projects.

\documentclass[a4paper,11pt]{article}
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
\fancyhf{} 
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}

\addtolength{\oddsidemargin}{-0.75in}
\addtolength{\evensidemargin}{-0.75in}
\addtolength{\textwidth}{1.5in}
\addtolength{\topmargin}{-0.75in}
\addtolength{\textheight}{1.5in}

\titleformat{\section}{\large\scshape\raggedright}{}{0em}{}[\titlerule]
\titlespacing{\section}{0pt}{3pt}{3pt}

\setlength{\parskip}{0.5em}
\setlength{\tabcolsep}{0in}

\newcommand{\resumeItem}[2]{
  \item\small{\textbf{#1}: #2\vspace{-2pt}}
}

\newcommand{\resumeSubheading}[4]{
  \vspace{1pt}\item
    \begin{tabular*}{\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{#1} & \textit{#2} \\
      \textit{#3} & \textit{#4} \\
    \end{tabular*}\vspace{-5pt}
}

\newcommand{\resumeSubItem}[2]{\resumeItem{#1}{#2}\vspace{-2pt}}

\renewcommand{\labelitemii}{$\circ$}

\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.15in, label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}}
\newcommand{\resumeItemListEnd}{\end{itemize}}
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: `RESUME:\n${resumeText}\n\nJOB DESCRIPTION:\n${jobDescription}`
        }
      ],
      temperature: 0.2,
      max_tokens: 4096
    });

    const tex = completion.choices[0].message?.content;
    return NextResponse.json({ tex });
  } catch (err: any) {
    console.error('Error generating LaTeX:', err);
    return NextResponse.json(
      { error: err.message || 'Internal error' },
      { status: 500 }
    );
  }
}
