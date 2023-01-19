import { Link } from "@material-ui/core";
import ReactMarkdown, { ReactMarkdownOptions } from "react-markdown";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import java from "react-syntax-highlighter/dist/cjs/languages/prism/java";
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx";
import markup from "react-syntax-highlighter/dist/cjs/languages/prism/markup";
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import { cb } from "react-syntax-highlighter/dist/cjs/styles/prism";

const supportedLanguages = {
    javascript,
    typescript,
    jsx,
    tsx,
    json,
    python,
    java,
    bash,
    markup
};

Object.entries(supportedLanguages).forEach(([name, lang]) => {
    SyntaxHighlighter.registerLanguage(name, lang);
});

const MarkdownCode = ({ node, inline, className, children, ...props } : any) => {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
        <SyntaxHighlighter children={String(children).replace(/\n$/, '')}
            language={match[1]}
            style={cb} 
            customStyle={{ maxWidth: "100%" }} 
            {...props} />
    ) : <code className={className} {...props}>
    {children}
  </code>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MarkdownLink = ({ node, ...props }: any) => {
    return <Link component="a" variant="body2" {...props} />;
};

const components = {
    code: MarkdownCode,
    link: MarkdownLink
};

const Markdown = (props: ReactMarkdownOptions) => {
    return <ReactMarkdown components={components} {...props} />;
};

export default Markdown;