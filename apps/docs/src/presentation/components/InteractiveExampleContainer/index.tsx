import { Button } from "@vbss-ui/button"
import { cloneElement, isValidElement, ReactNode, useState } from "react"

import { CodeSnippet } from "@/presentation/components/CodeSnippet"

import * as S from "./styles"

interface InteractiveExampleContainerProps<T> {
  props: T[]
  targetProp: string
  children: ReactNode
  initIndex?: number
  code?: string
}

export const InteractiveExampleContainer = <T extends string>({
  props,
  targetProp,
  children,
  initIndex = 0,
  code,
}: InteractiveExampleContainerProps<T>) => {
  const [selectedProp, setSelectedProp] = useState<T>(props[initIndex])
  const updatedCode = code?.replace(`'${targetProp}'`, `'${selectedProp}'`)
  const enhancedChildren = isValidElement(children) ? cloneElement(children, { [targetProp]: selectedProp }) : children

  return (
    <S.Container>
      <S.Controls>
        {props.map((prop) => (
          <Button
            key={prop}
            variant={selectedProp === prop ? "primary" : "outline"}
            size="xs"
            fontSize="sm"
            onClick={() => setSelectedProp(prop)}
          >
            {prop}
          </Button>
        ))}
      </S.Controls>
      {enhancedChildren}
      {updatedCode && (
        <S.Content>
          <CodeSnippet code={updatedCode} language="tsx" />
        </S.Content>
      )}
    </S.Container>
  )
}
