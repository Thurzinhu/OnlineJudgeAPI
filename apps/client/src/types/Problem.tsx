export type ProblemDifficulty = "easy" | "medium" | "hard";

export type Problem = {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  difficulty?: ProblemDifficulty;
};