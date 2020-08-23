import React from "react";
import ReactMarkdown, { ReactMarkdownProps } from "react-markdown";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx";
import markup from "react-syntax-highlighter/dist/cjs/languages/prism/markup";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import { cb } from "react-syntax-highlighter/dist/cjs/styles/prism";

const supportedLanguages = {
    javascript,
    typescript,
    jsx,
    tsx,
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
