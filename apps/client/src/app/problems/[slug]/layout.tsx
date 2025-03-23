import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

interface ProblemLayoutProps {
    code: React.ReactNode;
    description: React.ReactNode;
    tests: React.ReactNode;
}

export default function Layout({ code, description, tests }: ProblemLayoutProps) {
  return (
    <main className="flex flex-col items-center justify-center w-full p-2 lg:p-4 h-full">
        <ResizablePanelGroup
            direction="horizontal"
        >
            <ResizablePanel defaultSize={50} className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm h-full"
            > 
                {description}
            </ResizablePanel>

            <ResizableHandle className="w-4 bg-transparent border-none"/>

            <ResizablePanel defaultSize={50} className="bg-transparent border-none">
                <ResizablePanelGroup 
                    direction="vertical"
                >
                    <ResizablePanel defaultSize={25} className="shrink bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm hover:inset-ring-5 hover:inset-ring-accent/50">
                        {code}
                    </ResizablePanel>

                    <ResizableHandle className="bg-transparent basis-4"/>
                    
                    <ResizablePanel defaultSize={75} className="shrink bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm hover:inset-ring-5 hover:inset-ring-accent/50">
                        {tests}
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>
        </ResizablePanelGroup>
    </main>
  )
}
