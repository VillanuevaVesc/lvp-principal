"use client"

import { SiteProvider, useSite } from "./site-provider"
import { SiteHeader } from "./site-header"
import { SiteFooter } from "./site-footer"
import { HomeTab } from "./tabs/home-tab"
import { EngineTab } from "./tabs/engine-tab"
import { VectorsTab } from "./tabs/vectors-tab"
import { BillingTab } from "./tabs/billing-tab"
import { GovernanceTab } from "./tabs/governance-tab"

function SiteBody() {
  const { tab } = useSite()

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
        {tab === "home" && <HomeTab />}
        {tab === "engine" && <EngineTab />}
        {tab === "vectors" && <VectorsTab />}
        {tab === "billing" && <BillingTab />}
        {tab === "governance" && <GovernanceTab />}
      </main>
      <SiteFooter />
    </div>
  )
}

export function SiteShell() {
  return (
    <SiteProvider>
      <SiteBody />
    </SiteProvider>
  )
}
