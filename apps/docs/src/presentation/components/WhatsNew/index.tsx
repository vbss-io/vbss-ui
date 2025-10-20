import { Info } from "@phosphor-icons/react"
import { Button } from "@vbss-ui/button"
import { Dialog } from "@vbss-ui/dialog"
import { useMemo, useState } from "react"

import * as S from "./styles"

export type WhatsNewEntry = {
  version: string
  date: string
  changes: string[]
}

interface WhatsNewProps {
  title?: string
  entries?: WhatsNewEntry[]
}

export const WhatsNew = ({ title = "What's new", entries = [] }: WhatsNewProps) => {
  const [open, setOpen] = useState(false)

  const hasEntries = entries && entries.length > 0

  const latestVersion = useMemo(() => {
    if (!hasEntries) return ""
    return entries[0]?.version ?? ""
  }, [entries, hasEntries])

  if (!hasEntries) return null

  return (
    <S.Container>
      <S.TriggerWrapper>
        <Button
          as="div"
          variant="outline"
          size="sm"
          onClick={() => setOpen(true)}
          style={{ width: "100%", backgroundColor: "#ffffff", cursor: "pointer" }}
        >
          <S.TitleRow>
            <Info size={16} />
            <span>{title}</span>
            {latestVersion && <S.VersionTag>v{latestVersion}</S.VersionTag>}
          </S.TitleRow>
        </Button>
        <S.PulsingDot aria-hidden />
      </S.TriggerWrapper>
      <Dialog open={open} onOpenChange={setOpen} title={title} description="Recent updates and improvements" trigger={<></>}>
        <S.Content>
          {entries.map((entry) => (
            <S.Entry key={entry.version}>
              <S.EntryHeader>
                <S.EntryVersion>v{entry.version}</S.EntryVersion>
                <S.EntryDate>{entry.date}</S.EntryDate>
              </S.EntryHeader>
              <S.List>
                {entry.changes.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </S.List>
            </S.Entry>
          ))}
        </S.Content>
      </Dialog>
    </S.Container>
  )
}
