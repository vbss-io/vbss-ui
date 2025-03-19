import { ReactNode, useState } from "react";
import { CodeSnippet } from "@/presentation/components/CodeSnippet";

import * as S from "./styles"

interface ExampleContainerProps {
  code?: string
  children: ReactNode
}

export const ExampleContainer = ({ code, children }: ExampleContainerProps) => {
  const [showCode, setShowCode] = useState(false)

  return (
    <S.Container>
      <S.Content>
        {children}
        { code && <S.ShowCodeButton onClick={() => setShowCode(!showCode)}>{showCode ? "Hide Code" : "Show Code"}</S.ShowCodeButton> }
      </S.Content>
      {
        code && showCode && (
          <CodeSnippet code={code}/>
        )
      }
    </S.Container>
  );
};

