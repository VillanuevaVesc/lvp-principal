'use client'

import { useEffect, useRef, useState } from 'react'
import { PanelContent } from './panels'
import { useI18n } from '@/lib/i18n/context'

export function ConsoleTabs() {
  const { t } = useI18n()
  const panels = t.panels
  const [activeIndex, setActiveIndex] = useState(panels[0]?.index ?? '01')
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map())

  // Resalta en la navegación la sección visible actualmente durante el scroll.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) {
          setActiveIndex(visible.target.getAttribute('data-index') ?? '01')
        }
      },
      { rootMargin: '-180px 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] }
    )

    const nodes = sectionRefs.current
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [panels])

  return (
    <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12">
      <nav
        aria-label={t.tabsAria}
        className="sticky top-20 z-30 flex flex-wrap items-center gap-x-8 gap-y-4 border-b border-border bg-background/85 py-6 backdrop-blur-md"
      >
        {panels.map((tab) => (
          <a
            key={tab.index}
            href={`#panel-${tab.index}`}
            aria-current={activeIndex === tab.index ? 'true' : undefined}
            className={`relative pb-2 font-sans text-[13px] tracking-[0.08em] transition-colors duration-300 ${
              activeIndex === tab.index
                ? 'text-foreground'
                : 'text-mist hover:text-foreground'
            }`}
          >
            <span className="mr-2 text-gold">{tab.index}</span>
            <span className="mr-2 text-gold-muted">·</span>
            {tab.label}
            {activeIndex === tab.index && (
              <span
                aria-hidden="true"
                className="absolute -bottom-[25px] left-0 h-px w-full bg-gold"
              />
            )}
          </a>
        ))}
      </nav>

      <div className="flex flex-col">
        {panels.map((panel) => (
          <div
            key={panel.index}
            id={`panel-${panel.index}`}
            data-index={panel.index}
            ref={(node) => {
              if (node) sectionRefs.current.set(panel.index, node)
              else sectionRefs.current.delete(panel.index)
            }}
            className="border-b border-border py-16 last:border-b-0 md:py-24"
          >
            <PanelContent panel={panel} />
          </div>
        ))}
      </div>
    </section>
  )
}
