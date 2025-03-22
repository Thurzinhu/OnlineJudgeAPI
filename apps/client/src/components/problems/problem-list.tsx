import { getProblems } from "@/lib/api";
import ProblemCard from "./problem-card";
import { Problem } from "@/types/Problem";

interface ProblemListProps {
    page: number;
    pageSize: number;
}

export default async function ProblemList({ page, pageSize }: ProblemListProps) {
    const { data: problems } = await getProblems(page, pageSize);

    return (
        <section role="list" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                { problems.map((problem: Problem) => (
                    <ProblemCard
                        key={problem.id}
                        id={problem.id}
                        title={problem.title}
                        description={problem.description}
                        tags={problem.tags}
                        difficulty={problem.difficulty} 
                        totalSolutions={0}                    
                    />
                )) }
        </section>
    )
}