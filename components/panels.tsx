'use client'

import { GoldButton } from './gold-button'
import { DossierRequestButton } from './dossier-request-button'
import { IncidentReportButton } from './incident-report-button'
import type { Block, Panel, RichItem } from '@/lib/i18n/types'

function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-sans text-[11px] tracking-[0.28em] text-gold">
        {index}
      </span>
      <span className="h-px w-12 bg-gold-muted" aria-hidden="true" />
      <span className="font-sans text-[11px] tracking-[0.28em] text-mist">
        {label}
      </span>
    </div>
  )
}

function PanelTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-balance font-sans text-3xl font-medium leading-tight tracking-tight text-foreground md:text-4xl">
      {children}
    </h2>
  )
}

function Subtitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[12px] uppercase leading-relaxed tracking-[0.16em] text-gold">
      {children}
    </p>
  )
}

function BlockTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-sans text-[15px] font-medium leading-snug tracking-wide text-foreground">
      {children}
    </h3>
  )
}

function Prose({ lead, text }: { lead?: string; text: string }) {
  return (
    <p className="text-pretty font-sans text-[14px] leading-relaxed text-mist">
      {lead && <span className="font-medium text-foreground">{lead} </span>}
      {text}
    </p>
  )
}

function Strong({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-pretty font-sans text-[14px] font-medium leading-relaxed text-foreground">
      {children}
    </p>
  )
}

function RichSpan({ item }: { item: RichItem }) {
  return (
    <span className="font-sans text-[14px] leading-relaxed text-mist">
      {item.lead && (
        <span className="font-medium text-foreground">{item.lead} </span>
      )}
      {item.text}
    </span>
  )
}

function BulletList({ items }: { items: RichItem[] }) {
  return (
    <ul className="flex flex-col gap-4">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-2 h-px w-4 shrink-0 bg-gold-muted"
          />
          <RichSpan item={item} />
        </li>
      ))}
    </ul>
  )
}

function NumberedList({ items }: { items: RichItem[] }) {
  return (
    <ol className="flex flex-col gap-5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-4">
          <span className="mt-0.5 shrink-0 font-sans text-[12px] tracking-[0.2em] text-gold">
            {`0${i + 1}`}
          </span>
          <RichSpan item={item} />
        </li>
      ))}
    </ol>
  )
}

function VectorList({ items }: { items: { head: string; text: string }[] }) {
  return (
    <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col gap-2 bg-card px-5 py-4">
          <span className="font-sans text-[11px] tracking-[0.2em] text-gold">
            {item.head}
          </span>
          <span className="font-sans text-[13px] leading-relaxed text-foreground">
            {item.text}
          </span>
        </div>
      ))}
    </div>
  )
}

function ScaleTable({
  head,
  rows,
}: {
  head: [string, string]
  rows: [string, string][]
}) {
  return (
    <div className="border border-border">
      <div className="grid grid-cols-[1.6fr_1fr] border-b border-border bg-secondary px-5 py-3">
        <span className="font-sans text-[11px] tracking-[0.2em] text-mist">
          {head[0]}
        </span>
        <span className="font-sans text-[11px] tracking-[0.2em] text-mist">
          {head[1]}
        </span>
      </div>
      {rows.map((r, i) => (
        <div
          key={i}
          className="grid grid-cols-[1.6fr_1fr] items-center gap-3 border-b border-border px-5 py-4 last:border-b-0"
        >
          <span className="font-sans text-[13px] leading-relaxed text-foreground">
            {r[0]}
          </span>
          <span className="font-sans text-[14px] font-medium tracking-wide text-gold">
            {r[1]}
          </span>
        </div>
      ))}
    </div>
  )
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case 'title':
      return <PanelTitle>{block.text}</PanelTitle>
    case 'subtitle':
      return <Subtitle>{block.text}</Subtitle>
    case 'blockTitle':
      return <BlockTitle>{block.text}</BlockTitle>
    case 'prose':
      return <Prose lead={block.lead} text={block.text} />
    case 'strong':
      return <Strong>{block.text}</Strong>
    case 'bullets':
      return <BulletList items={block.items} />
    case 'numbered':
      return <NumberedList items={block.items} />
    case 'vectors':
      return <VectorList items={block.items} />
    case 'table':
      return <ScaleTable head={block.head} rows={block.rows} />
    default:
      return null
  }
}

/**
 * Renders a single service panel from translated dictionary data.
 * The last panel (index "05") exposes the encrypted-dossier modal flow.
 */
export function PanelContent({ panel }: { panel: Panel }) {
  const isDossier = panel.index === '05'
  const isIncident = panel.index === '01'
  const isRadar = panel.index === '03' || panel.index === '02'

  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-10">
      <SectionLabel index={panel.index} label={panel.label} />
      <div className="flex flex-col gap-10">
        {panel.blocks.map((block, i) => (
          <BlockRenderer key={i} block={block} />
        ))}
      </div>
      <div className="border-t border-border pt-10">
        {isDossier ? (
          <DossierRequestButton label={panel.action} />
        ) : isIncident ? (
          <IncidentReportButton label={panel.action} />
        ) : isRadar ? (
          <GoldButton href="/radar">{panel.action}</GoldButton>
        ) : (
          <GoldButton>{panel.action}</GoldButton>
        )}
      </div>
    </article>
  )
}
