import React from "react";
import ReactMarkdown, { ReactMarkdownProps } from "react-markdown";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import markup from "react-syntax-highlighter/dist/cjs/languages/prism/markup";
import { cb } from "react-syntax-highlighter/dist/cjs/styles/prism";

const supportedLanguages = {
    json,
    markup
};

Object.entries(supportedLanguages).forEach(([name, lang]) => {
    SyntaxHighlighter.registerLanguage(name, lang);
});

interface CodeProps {
    value: string;
    language?: string;
}

const MarkdownCode: React.FC<CodeProps> = ({ language, value }: CodeProps) => {
    return (
        <SyntaxHighlighter language={language} style={cb}>
            {value}
        </SyntaxHighlighter>
    );
};

const renderers = {
    code: MarkdownCode
};

const Markdown: React.FC<ReactMarkdownProps> = (props: ReactMarkdownProps) => {
    return <ReactMarkdown escapeHtml={false} renderers={renderers} {...props} />;
};

export default Markdown;
