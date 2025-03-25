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
        <section role="list" id="problems__list" className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4">
                { problems.map((problem: Problem) => (
                    <ProblemCard
                        key={problem._id}
                        totalSolutions={0}
                        {...problem}                     
                    />
                )) }
        </section>
    )
}