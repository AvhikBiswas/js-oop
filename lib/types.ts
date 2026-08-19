export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export type LabCheck = {
  id: string;
  description: string;
  expression: string;
};

export type CodeSample = {
  title: string;
  code: string;
  output: string;
};

export type Topic = {
  slug: string;
  title: string;
  sectionId: string;
  minutes: number;
  level: "beginner" | "intermediate" | "advanced";
  summary: string;
  remember: string[];
  theory: { heading: string; body: string }[];
  analogy: string;
  example: CodeSample;
  extraExample?: CodeSample;
  pitfalls: string[];
  playground: { starter: string; goal: string };
  quiz: QuizQuestion[];
  lab: {
    title: string;
    brief: string;
    starter: string;
    hint: string;
    checks: LabCheck[];
  };
};

export type NavTopic = {
  slug: string;
  title: string;
};

export type NavGroup = {
  id: string;
  title: string;
  topics: NavTopic[];
};

export type NavSection = {
  id: string;
  title: string;
  blurb: string;
  image: string;
  accent: string;
  topics?: NavTopic[];
  groups?: NavGroup[];
};
