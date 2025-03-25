import ProblemListSkeleton from "@/components/skeletons/problem-list";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProblemsLoading() {
  const pageSize = 50;

  return (
    <main className="mx-auto max-w-screen md:px-8 flex flex-col gap-4">
      <header className="flex justify-between items-center">
        <Skeleton className="h-9 w-40 rounded-4xl" />
        <section 
          className="hidden md:flex justify-center items-center gap-2"
        >
          <Skeleton className="size-9 rounded-full" />
          <Skeleton className="size-9 rounded-full" />
        </section>
      </header>
      <section role="search" aria-label="Problems filters">
        <div className="flex gap-2 flex-wrap">
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-32 rounded-full" />
          <Skeleton className="h-8 w-28 rounded-full" />
        </div>
      </section>
      <ProblemListSkeleton pageSize={pageSize} />
    </main>
  );
}