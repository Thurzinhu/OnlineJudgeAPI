import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "../ui/badge";

type ProblemDifficulty = "easy" | "medium" | "hard";

interface ProblemsCardProps {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  totalSolutions: number;
  difficulty?: ProblemDifficulty;
  isSolved?: boolean;
  hasTried?: boolean;
}

const difficultyColors: Record<ProblemDifficulty, string> = {
  easy: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
  medium: 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
  hard: 'bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400'
};


export default function ProblemsCard({ id, title, description, tags, totalSolutions, difficulty, isSolved=false, hasTried=false }: ProblemsCardProps) {
  return (
    <Card className={cn(
        "group pb-0 scale-100 transition-all duration-300 ease-in-out hover:scale-102 hover:shadow-md",
        isSolved && "border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-900/5",
        (hasTried && !isSolved) && "border-red-500/20 bg-red-50/50 dark:bg-red-900/5",
      )}
      >
      <CardHeader>
        <section data-slot="card__header-tags" className="flex items-center justify-start flex-wrap gap-2 -ml-2.5">
          { difficulty && (
            <Badge variant={null} className={cn(
              "text-xs font-medium rounded-full w-max px-2 py-1",
              difficultyColors[difficulty.toLowerCase() as ProblemDifficulty],
            )}>
              { difficulty.charAt(0).toUpperCase() + difficulty.slice(1) }
            </Badge>
          ) }

          { isSolved && (
            <Badge variant={null} className={cn("text-xs font-medium rounded-full w-max px-2 py-1", difficultyColors.easy)}>
              Solved
            </Badge>
          ) }
        </section>
        <CardTitle>
          <Link href={`/problems/${id}`} className="text-xl font-medium no-underline group-hover:text-primary">
            { title }
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4">
          <p className="line-clamp-3">
            { description }
          </p>
        </CardDescription>
        <section data-slot="card__content-tags" className="flex flex-wrap gap-2">
          { tags?.map((tag) => (
            <Badge variant={null} key={tag} className="text-xs font-medium rounded-full bg-accent text-accent-foreground w-max px-2 py-1">
              { tag }
            </Badge>
          )) }
        </section>
      </CardContent>
      <CardFooter className="bg-accent text-accent-foreground/40 flex justify-between items-center py-2 px-4 rounded-b-xl mb-0">
        <span className="text-xs font-medium p-0 m-0">{ totalSolutions } solutions</span>
        <Link href={`/problems/${id}`} className="flex items-center justify-center text-primary no-underline text-xs font-medium p-0 m-0">
          Solve Challenge →
        </Link>
      </CardFooter>
    </Card>
  );
}