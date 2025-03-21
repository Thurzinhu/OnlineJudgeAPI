import Card from "@/components/problems/problem-card";

export default function ProblemsPage() {
    return (
        <main className="mx-auto max-w-screen md:px-8 flex flex-col gap-4">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-medium tracking-wide">Problems</h1>
                <div className="hidden md:flex gap-2">
                    <button>Filter</button>
                    <button>Sort</button>
                </div>
            </header>

            <section data-slot="problems__filters"></section>

            <section data-slot="problems__content" className="grid grid-cols-1 md:grid-cols-2 gap-4">  
            </section>
        </main>
    );
}