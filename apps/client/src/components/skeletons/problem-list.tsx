import ProblemCardSkeleton from "./problem-card";

interface ProblemListProps {
    pageSize: number;
}

export default async function ProblemListSkeleton({ pageSize }: ProblemListProps) {
    return (
        <section role="list" id="problems__list" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                { Array.from({ length: pageSize }).map((_, index) => (
                    <ProblemCardSkeleton key={index} />
                )) }
        </section>
    )
}