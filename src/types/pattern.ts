export type PatternCategory = "basic" | "intermediate" | "advanced";
export type PatternDifficulty = 1 | 2 | 3 | 4 | 5;

export interface PatternDescription {
  problem: string;
  solution: string;
  whenToUse: string[];
  pros: string[];
  cons: string[];
}

export interface PatternCode {
  before: string;
  after: string;
  highlights: string[];
}

export interface Pattern {
  id: string;
  title: string;
  category: PatternCategory;
  difficulty: PatternDifficulty;
  description: PatternDescription;
  code: PatternCode;
  relatedPatterns: string[];
}

export interface UserProgress {
  patternId: string;
  userCode: string;
  completed: boolean;
  lastModified: string;
}
