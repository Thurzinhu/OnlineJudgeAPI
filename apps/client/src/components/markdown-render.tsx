import React from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { syntaxHighlighter } from "../constants/theme";
import { cn } from '@/lib/utils';

interface MarkdownRenderProps {
  markdown: string;
  className?: string;
}

const MarkdownRender = ({ markdown, className }: MarkdownRenderProps) => {
  const components: Components = {
    code({ node, className, children, ...props }) {
      
      const languageMatch = /language-(\w+)/.exec(className || '');

      const codeString = String(children).replace(/\n$/, '');

      const isInline = !languageMatch && !codeString.includes('\n');

      if (isInline) {
        return (
          <code 
            className="bg-accent text-accent-foreground py-0.5 px-1.5 rounded-md not-prose" 
            {...props}
          >
            {children}
          </code>
        );
      }

      return (
        <div className='not-prose'>
          <SyntaxHighlighter
          language={languageMatch ? languageMatch[1] : 'text'}
          style={syntaxHighlighter}
          {...(props as any)}
          className="not-prose w-full"
        >
          {codeString}
        </SyntaxHighlighter>
        </div>
      );
    }
  };

  return (
    <div data-slot="markdown-render" className={cn(className, "prose dark:prose-invert min-w-full")}>
      <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRender;
