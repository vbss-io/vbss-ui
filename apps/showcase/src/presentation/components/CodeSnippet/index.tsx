import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

import * as S from "./styles"

interface CodeSnippet {
  code: string
  language?: string
}

export const CodeSnippet = ({ code, language = "tsx" }: CodeSnippet) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      console.error("Failed to copy code", err);
    }
  };

  return (
    <S.CodeWrapper>
      <S.Header>
        <span>{language}</span>
        <S.CopyButton onClick={handleCopy}>Copy</S.CopyButton>
      </S.Header>
      <SyntaxHighlighter language={language} style={dracula} showLineNumbers>
        {code}
      </SyntaxHighlighter>
    </S.CodeWrapper>
  );
};

