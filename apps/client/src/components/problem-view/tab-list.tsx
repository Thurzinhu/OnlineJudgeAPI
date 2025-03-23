import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import MarkdownRender from "@/components/markdown-render"
import { extractMarkdownStartAtSection } from "@/lib/utils"
import { FileText, History, UserRoundPlus } from "lucide-react";

interface TabListProps {
    description: string;
}

// TODO: implement user submissions and submissions tabs

export default function TabList({ description }: TabListProps) {
    return (
        <Tabs defaultValue="description" className="hover:inset-ring-5 hover:inset-ring-accent/50 h-max">
            <TabsList className="flex space-x-4 w-full rounded-none">
                <TabsTrigger value="description">
                    <FileText className="mr-2 h-4 w-4" />
                    Description
                    </TabsTrigger>
                <TabsTrigger value="my-submissions">
                    <UserRoundPlus />
                    MySubmissions
                    </TabsTrigger>
                <TabsTrigger value="submissions">
                    <History />
                    Submissions
                    </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="py-6 h-[80dvh]">
                <ScrollArea className="w-full h-[80dvh] text-justify text-wrap antialiased font-sans text-md px-6" data-lenis-prevent>
                    <MarkdownRender markdown={extractMarkdownStartAtSection(description, "Descrição") || extractMarkdownStartAtSection(description, "Description")} />
                    <br />
                </ScrollArea>
            </TabsContent>

            <TabsContent value="my-submissions" className="px-6 py-6 h-[80dvh]">
                    <ScrollArea className="w-full h-[80dvh] text-justify text-wrap antialiased font-sans text-md" data-lenis-prevent>
                    </ScrollArea>
            </TabsContent >

            <TabsContent value="submissions" className="px-6 py-6 h-[80dvh]">
                    <ScrollArea className="w-full h-[80dvh] text-justify text-wrap antialiased font-sans text-md" data-lenis-prevent>
                    </ScrollArea>
            </TabsContent>
        </Tabs>
    )
}
