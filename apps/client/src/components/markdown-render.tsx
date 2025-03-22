import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

interface MarkdownRenderProps {
    markdown: string;
}

export default function MarkdownRender({ markdown }: MarkdownRenderProps) {
    return (
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            { markdown }
        </ReactMarkdown>
    );
}