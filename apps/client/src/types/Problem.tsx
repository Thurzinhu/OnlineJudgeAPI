export type ProblemDifficulty = "easy" | "medium" | "hard";

export type Problem = {
  _id: string;
  title: string;
  description: string;
  tags?: string[];
  difficulty?: ProblemDifficulty;
  slug: string;
};