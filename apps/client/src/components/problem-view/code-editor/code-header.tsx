import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { LucideCopy, LucideRefreshCw } from "lucide-react";

interface CodeHeaderProps {
    language: string;
    onCopy: () => void;
    onReset: () => void;
}

export default function CodeHeader({ language, onCopy, onReset }: CodeHeaderProps) {
    return (
    <header className="bg-muted text-muted-foreground inline-flex h-9 w-full items-center justify-between">
        <span className="text-md font-semibold text-center ml-[12px]">{ language }</span>
        <div role="toolbar">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                    <Button 
                        aria-label="copy" 
                        variant={"ghost"} 
                        size={"icon"} 
                        className="rounded-full" 
                        onClick={onCopy}
                    >
                        <LucideCopy className="h-4 w-4" />
                    </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Copy</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                    <Button 
                        aria-describedby="reset to default code" 
                        variant={"ghost"} 
                        size={"icon"} 
                        className="rounded-full" 
                        onClick={onReset}
                    >
                        <LucideRefreshCw className="h-4 w-4" />
                    </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Reset to default code</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    </header>
    )
}