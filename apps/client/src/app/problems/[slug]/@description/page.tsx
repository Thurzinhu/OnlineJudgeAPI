import TabList from "@/components/problem-view/tab-list";
import { getProblem } from "@/lib/api";

interface ProblemDescriptionProps {
    params: Promise<{
        slug: string;
    }>
}

export default async function ProblemDescription({ params }: ProblemDescriptionProps) {
    const { slug } = await params;
    const { description } = await getProblem(slug);

    return (
        <TabList description={description} /> 
    )
}