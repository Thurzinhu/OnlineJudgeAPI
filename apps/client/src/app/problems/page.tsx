import ProblemList from "@/components/problems/problem-list";
import { Suspense } from "react";


interface ProblemsPageProps {
    searchParams: Promise<{
        page?: number;
    }>;
}

export default async function ProblemsPage({ searchParams }: ProblemsPageProps) {
    const { page=1 } = await searchParams;
    const pageSize = 40;

    return (
        <main className="mx-auto max-w-screen md:px-8 flex flex-col gap-4">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-medium tracking-wide">Problems</h1>
                <section role="toolbar" aria-label="Layout options for desktop" className="hidden md:flex gap-2">
                    <button>Filter</button>
                    <button>Sort</button>
                </section>
            </header>

            <section role="search" aria-label="Problems filters"></section>

            <Suspense fallback={<div>Loading...</div>}>
                <ProblemList page={page} pageSize={pageSize} />
            </Suspense>
        </main>
    );
}