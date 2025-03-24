"use client";

import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { LucideCopy, LucidePlay, LucideRefreshCw, LucideSave } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import CodeHeader from '@/components/problem-view/code-editor/code-header';

const CodeEditor = dynamic(
  () => import("@/components/problem-view/code-editor/code-editor"),
  { ssr: false }
);

interface CodeWrapperProps {
  boilerplate: string;
  language?: string;
}

// TODO: implement code submission and run tests

export default function CodeWrapper({ boilerplate, language = "javascript" }: CodeWrapperProps) {
    const [code, setCode] = useState<string>("");
    const { theme } = useTheme();

    const handleRunCode = (code: string) => {
        console.log(code);
    }

    const handleSubmitCode = (code: string) => {
        console.log(code);
    }


    return (
        <section aria-label="code editor" className="relative h-full w-full pb-4">
            <CodeHeader language={language} onCopy={() => navigator.clipboard.writeText(code)} onReset={() => setCode(boilerplate)} />

            <CodeEditor
                language={language}
                value={code}
                onChange={(value) => setCode(value ?? "")}
                boilerplate={boilerplate}
                theme={theme === "dark" ? "vs-dark" : "light"}
            />

            <footer role="contentinfo" className="absolute bottom-2 right-2 flex gap-2">
                <Button 
                    variant="outline" 
                    size="default" 
                    className="w-fit"
                    onClick={() => handleRunCode(code)}
                >
                    <LucidePlay className="h-4 w-4 mr-1" />
                    Run code
                </Button>
                <Button
                    variant="default"
                    size="default"
                    className="w-fit"
                    onClick={() => handleSubmitCode(code)}
                >
                    <LucideSave className="h-4 w-4 mr-1" />
                    Submit
                </Button>
            </footer>
        </section>
    );
}