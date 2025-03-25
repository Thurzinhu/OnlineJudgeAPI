// components/CodeEditor.tsx
import { useRef } from 'react';
import Editor, { OnMount, OnChange } from '@monaco-editor/react';
import { editor } from 'monaco-editor';

interface CodeEditorProps {
    language?: string;
    value?: string;
    onChange?: OnChange;
    height?: string | number;
    theme?: string;
    boilerplate?: string;
}

export default function CodeEditor({ 
    language = 'javascript', 
    value = '', 
    onChange,
    theme = 'vs-light',
    boilerplate = '',
}: CodeEditorProps) {
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;
        editor.focus();
        monaco.editor.setTheme('customDark');
    };

  return (
    <Editor
        height={"100vh"}
        language={language}
        value={value}
        defaultValue={boilerplate}
        onChange={onChange}
        onMount={handleEditorDidMount}
        theme={theme}
        options={{
        minimap: { enabled: false, showSlider: 'mouseover' },
        scrollBeyondLastLine: false,
        fontSize: 14,
        tabSize: 4,
        automaticLayout: true,
        wordWrap: 'on',
        quickSuggestions: true,
        suggestOnTriggerCharacters: true,
        acceptSuggestionOnCommitCharacter: true,
        wordBasedSuggestions: "allDocuments",
        parameterHints: { enabled: true },
        snippetSuggestions: 'inline',
        scrollbar: { vertical: 'hidden', horizontal: 'hidden', verticalScrollbarSize: 0, horizontalScrollbarSize: 0 },
        }}
        className='h-full w-full'
    />
  );
}