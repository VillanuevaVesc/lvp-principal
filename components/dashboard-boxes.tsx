'use client'

import { useState } from 'react'

export function DashboardBoxes() {
  const [fields, setFields] = useState({ field1: '', field2: '', field3: '' })

  return (
    <section className="mx-auto w-full max-w-[1400px] px-6 pb-16 md:px-12">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left box */}
        <div className="flex flex-col gap-6 border border-border bg-card p-8">
          <span className="font-sans text-[11px] tracking-[0.32em] text-gold">
            INPUT PARAMETERS
          </span>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="field1"
                className="font-sans text-[12px] tracking-wide text-mist"
              >
                Field One
              </label>
              <input
                id="field1"
                type="text"
                value={fields.field1}
                onChange={(e) =>
                  setFields((f) => ({ ...f, field1: e.target.value }))
                }
                className="border border-border bg-background px-3 py-2 font-sans text-[14px] text-foreground outline-none focus:border-gold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="field2"
                className="font-sans text-[12px] tracking-wide text-mist"
              >
                Field Two
              </label>
              <input
                id="field2"
                type="text"
                value={fields.field2}
                onChange={(e) =>
                  setFields((f) => ({ ...f, field2: e.target.value }))
                }
                className="border border-border bg-background px-3 py-2 font-sans text-[14px] text-foreground outline-none focus:border-gold"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="field3"
                className="font-sans text-[12px] tracking-wide text-mist"
              >
                Field Three
              </label>
              <input
                id="field3"
                type="text"
                value={fields.field3}
                onChange={(e) =>
                  setFields((f) => ({ ...f, field3: e.target.value }))
                }
                className="border border-border bg-background px-3 py-2 font-sans text-[14px] text-foreground outline-none focus:border-gold"
              />
            </div>
          </div>
          <button
            type="button"
            className="mt-2 w-fit border border-gold-muted px-6 py-2 font-sans text-[12px] tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-background"
          >
            PROCESS
          </button>
        </div>

        {/* Right box */}
        <div className="flex flex-col gap-6 border border-border bg-card p-8">
          <span className="font-sans text-[11px] tracking-[0.32em] text-gold">
            STATUS METRICS
          </span>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-t border-border pt-4">
              <span className="font-sans text-[12px] tracking-wide text-mist">
                Active Records
              </span>
              <span className="font-sans text-[20px] text-foreground">1,284</span>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-4">
              <span className="font-sans text-[12px] tracking-wide text-mist">
                Pending Review
              </span>
              <span className="font-sans text-[20px] text-foreground">37</span>
            </div>
          </div>
          <div className="mt-2 flex flex-col gap-2 border-t border-gold-muted pt-4">
            <span className="font-sans text-[12px] tracking-wide text-mist">
              Time Remaining
            </span>
            <span className="font-sans text-[28px] text-gold">45 days</span>
          </div>
        </div>
      </div>
    </section>
  )
}
