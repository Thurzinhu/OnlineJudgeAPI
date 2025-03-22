import ProblemList from "@/components/problems/problem-list";
import ListLayout from "@/components/problems/problem-list-layout";
import { Suspense } from "react";


interface ProblemsPageProps {
    searchParams: Promise<{
        page?: number;
    }>;
}

// TODO: Implement pagination, filtering, and sorting

export default async function ProblemsPage({ searchParams }: ProblemsPageProps) {
    const { page=1 } = await searchParams;
    const pageSize = 40;

    return (
        <main className="mx-auto max-w-screen md:px-8 flex flex-col gap-4">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-medium tracking-wide">Problems</h1>
                <ListLayout />
            </header>

            <section role="search" aria-label="Problems filters"></section>

            <Suspense fallback={<div>Loading...</div>}>
                <ProblemList page={page} pageSize={pageSize} />
            </Suspense>
        </main>
    );
}