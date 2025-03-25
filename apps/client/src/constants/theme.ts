export const syntaxHighlighter: any = {
    'pre[class*="language-"]': {
        color: "var(--accent-foreground)",
        background: "var(--accent)",
        padding: "1em",
        borderRadius: "var(--radius)",
        overflow: "auto",
        border: "1px solid var(--border)",
    },
    'code[class*="language-"]': {
        color: "var(--accent-foreground)",
    },
    comment: {
        color: "var(--muted-foreground)",
        fontStyle: "italic",
    },
    punctuation: {
        color: "var(--muted-foreground)",
    },
    property: {
        color: "var(--chart-1)",
    },
    tag: {
        color: "var(--chart-4)",
    },
    boolean: {
        color: "var(--chart-3)",
    },
    number: {
        color: "var(--chart-3)",
    },
    constant: {
        color: "var(--chart-1)",
    },
    symbol: {
        color: "var(--chart-2)",
    },
    selector: {
        color: "var(--chart-4)",
    },
    "attr-name": {
        color: "var(--chart-5)",
    },
    string: {
        color: "var(--chart-2)",
    },
    char: {
        color: "var(--chart-2)",
    },
    builtin: {
        color: "var(--primary)",
    },
    operator: {
        color: "var(--muted-foreground)",
    },
    entity: {
        color: "var(--chart-1)",
        cursor: "help",
    },
    url: {
        color: "var(--chart-2)",
    },
    "attr-value": {
        color: "var(--chart-2)",
    },
    keyword: {
        color: "var(--primary)",
    },
    function: {
        color: "var(--chart-4)",
    },
    "class-name": {
        color: "var(--chart-5)",
    },
    regex: {
        color: "var(--destructive)",
    },
    variable: {
        color: "var(--foreground)",
    },
    important: {
        color: "var(--destructive)",
        fontWeight: "bold",
    },
    bold: {
        fontWeight: "bold",
    },
    italic: {
        fontStyle: "italic",
    },
};