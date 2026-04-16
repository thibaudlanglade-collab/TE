import { motion } from "framer-motion"
import {
  Play, ChevronRight, Search, Bell, Home,
  ArrowUpDown, CreditCard, Building, Wallet,
  Settings, Zap, Plus, MoreHorizontal, CheckCircle2,
  Sparkles, Shield, Server, Lightbulb, ArrowRight,
} from "lucide-react"

const fadeUp = (delay = 0, duration = 0.6) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
})

export function HeroSection({ onComprendreClick }: { onComprendreClick?: () => void } = {}) {
  return (
    <section
      className="relative flex flex-col items-center overflow-hidden bg-background"
      style={{ minHeight: "calc(100vh - 98px)" }}
    >
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_015952_e1deeb12-8fb7-4071-a42a-60779fc64ab6.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full px-4 pt-10 sm:pt-14 pb-0">
        {/* Icon */}
        <motion.div {...fadeUp(0, 0.5)} className="mb-5 sm:mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg">
            <Sparkles className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.1)}
          className="text-center font-display text-[2.5rem] leading-[1.05] sm:text-5xl md:text-6xl lg:text-[5rem] sm:leading-[0.95] tracking-tight text-foreground max-w-2xl px-2"
        >
          Bienvenue chez{" "}
          <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}>
            Synthèse
          </em>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          {...fadeUp(0.2)}
          className="mt-4 sm:mt-5 text-center text-[15px] sm:text-base md:text-lg text-muted-foreground max-w-[650px] leading-relaxed font-body px-2"
        >
          Vos emails, vos documents, vos réunions, vos tableaux, vos relances.
          Tout ce qui vous fait perdre du temps aujourd'hui peut devenir
          automatique demain. La seule limite, c'est ce que vous n'avez pas
          encore imaginé.
        </motion.p>

        {/* Italic tagline */}
        <motion.p
          {...fadeUp(0.25)}
          className="mt-3 text-center text-base text-violet-600 italic font-medium font-body"
        >
          Configurée avec vous. Pour vous. Selon votre façon de travailler.
        </motion.p>

        {/* Comprendre link */}
        {onComprendreClick && (
          <motion.div {...fadeUp(0.28)} className="mt-4 mb-2">
            <button
              onClick={onComprendreClick}
              className="inline-flex items-center gap-1.5 text-sm text-violet-600 hover:text-violet-700 font-medium transition-colors"
            >
              <Lightbulb className="h-4 w-4" />
              Comprendre comment ça marche en 5 minutes
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}

        {/* Badges + CTA */}
        <motion.div {...fadeUp(0.3)} className="mt-5 flex flex-col items-center gap-4 w-full">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center px-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 border border-violet-200">
              <Sparkles className="h-3 w-3" />
              100% personnalisable
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-full bg-green-100 text-green-700 border border-green-200">
              <Shield className="h-3 w-3" />
              RGPD conforme
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
              <Server className="h-3 w-3" />
              Hébergé en France
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="rounded-full px-5 sm:px-6 py-3 sm:py-2.5 text-sm font-medium font-body bg-gradient-to-r from-violet-500 to-blue-500 text-white hover:opacity-90 transition-opacity shadow-md touch-manipulation">
              Réserver une démo
            </button>
            <button className="h-11 w-11 rounded-full flex items-center justify-center bg-background shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:bg-background/80 transition-colors touch-manipulation">
              <Play className="h-4 w-4 text-foreground fill-foreground" />
            </button>
          </div>
        </motion.div>

        {/* Possibilités ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-8 w-full max-w-3xl overflow-hidden"
        >
          <div className="relative flex overflow-x-hidden">
            <div className="flex gap-0 animate-scroll-left whitespace-nowrap">
              {([
                "Extraction de documents",
                "Gestion des emails",
                "Planification",
                "Transcription de réunions",
                "Automatisations",
                "Agents IA",
                "Extraction de documents",
                "Gestion des emails",
                "Planification",
                "Transcription de réunions",
                "Automatisations",
                "Agents IA",
                "Extraction de documents",
                "Gestion des emails",
                "Planification",
                "Transcription de réunions",
                "Automatisations",
                "Agents IA",
              ]).map((item, i) => (
                <span key={i} className="inline-flex items-center gap-2 px-4">
                  <span className="text-violet-400 text-xs">✦</span>
                  <span className="text-xs text-muted-foreground font-medium tracking-wide">
                    {item}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Dashboard Preview — hidden on mobile (not legible, adds noise) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="hidden md:block mt-8 w-full max-w-5xl"
        >
          <div
            className="rounded-2xl overflow-hidden p-3 md:p-4"
            style={{
              background: "rgba(255, 255, 255, 0.4)",
              border: "1px solid rgba(255, 255, 255, 0.5)",
              boxShadow: "var(--shadow-dashboard)",
            }}
          >
            <DashboardPreview />
          </div>
        </motion.div>

        {/* Spacer on mobile (since dashboard preview is hidden) */}
        <div className="md:hidden h-8" />
      </div>
    </section>
  )
}

function DashboardPreview() {
  return (
    <div
      className="rounded-xl overflow-hidden bg-white text-[11px] select-none pointer-events-none flex flex-col"
      style={{ minHeight: 380 }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-white shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-foreground flex items-center justify-center">
            <span className="text-background font-bold text-[10px]">N</span>
          </div>
          <span className="font-semibold text-foreground text-xs">Nexora</span>
          <ChevronRight className="h-3 w-3 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-2 bg-secondary rounded-full px-3 py-1.5">
          <Search className="h-3 w-3 text-muted-foreground" />
          <span className="text-muted-foreground text-[10px]">Search...</span>
          <span className="ml-6 text-muted-foreground bg-background rounded px-1 py-0.5 text-[9px]">
            ⌘K
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-full px-3 py-1 bg-foreground text-background text-[10px] font-medium">
            Move Money
          </button>
          <Bell className="h-3.5 w-3.5 text-muted-foreground" />
          <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white text-[9px] font-bold">
            JB
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-40 border-r border-border bg-secondary/30 flex flex-col py-3 px-2 gap-0.5 shrink-0">
          {[
            { icon: Home, label: "Home", active: true },
            { icon: CheckCircle2, label: "Tasks", badge: "10" },
            { icon: ArrowUpDown, label: "Transactions" },
            { icon: Wallet, label: "Payments", chevron: true },
            { icon: CreditCard, label: "Cards" },
            { icon: Zap, label: "Capital" },
            { icon: Building, label: "Accounts", chevron: true },
          ].map(({ icon: Icon, label, active, badge, chevron }) => (
            <div
              key={label}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-md ${
                active
                  ? "bg-background text-foreground font-medium"
                  : "text-muted-foreground"
              }`}
            >
              <Icon className="h-3 w-3 shrink-0" />
              <span className="flex-1">{label}</span>
              {badge && (
                <span className="bg-foreground text-background rounded-full px-1.5 py-0.5 text-[8px] font-bold">
                  {badge}
                </span>
              )}
              {chevron && <ChevronRight className="h-2.5 w-2.5" />}
            </div>
          ))}
          <div className="mt-3 px-2 pb-1 text-[9px] uppercase tracking-widest text-muted-foreground font-medium">
            Workflows
          </div>
          {["Trake rutes", "Payments", "Notifications", "Settings"].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md text-muted-foreground"
            >
              <Settings className="h-3 w-3 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Main */}
        <div className="flex-1 bg-secondary/30 p-4 overflow-hidden flex flex-col gap-3">
          {/* Greeting */}
          <div className="text-sm font-semibold text-foreground">Welcome, Jane</div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { label: "Send", accent: true },
              { label: "Request" },
              { label: "Transfer" },
              { label: "Deposit" },
              { label: "Pay Bill" },
              { label: "Create Invoice" },
            ].map(({ label, accent }) => (
              <button
                key={label}
                className={`rounded-full px-3 py-1 text-[10px] font-medium ${
                  accent
                    ? "bg-indigo-500 text-white"
                    : "bg-background text-foreground border border-border"
                }`}
              >
                {label}
              </button>
            ))}
            <span className="text-muted-foreground text-[10px] ml-1">Customize</span>
          </div>

          {/* Two cards */}
          <div className="flex gap-3">
            {/* Balance card */}
            <div className="flex-1 basis-0 bg-background rounded-xl border border-border p-3 flex flex-col gap-2">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-indigo-500" />
                <span className="font-medium text-foreground">Mercury Balance</span>
              </div>
              <div>
                <span className="text-xl font-bold text-foreground">$8,450,190</span>
                <span className="text-xs text-muted-foreground">.32</span>
              </div>
              <div className="flex gap-4 text-[10px]">
                <span className="text-muted-foreground">Last 30 Days</span>
                <span className="text-green-600 font-medium">+$1.8M</span>
                <span className="text-red-500 font-medium">-$900K</span>
              </div>
              <svg viewBox="0 0 200 60" className="w-full h-12" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgb(99,102,241)" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="rgb(99,102,241)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,55 C20,50 30,40 50,35 C70,30 80,45 100,30 C120,15 130,20 150,15 C170,10 180,5 200,8"
                  fill="none"
                  stroke="rgb(99,102,241)"
                  strokeWidth="1.5"
                />
                <path
                  d="M0,55 C20,50 30,40 50,35 C70,30 80,45 100,30 C120,15 130,20 150,15 C170,10 180,5 200,8 L200,60 L0,60 Z"
                  fill="url(#chartGrad)"
                />
              </svg>
            </div>

            {/* Accounts card */}
            <div className="flex-1 basis-0 bg-background rounded-xl border border-border p-3 flex flex-col">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-foreground">Accounts</span>
                <div className="flex gap-1.5">
                  <Plus className="h-3 w-3 text-muted-foreground" />
                  <MoreHorizontal className="h-3 w-3 text-muted-foreground" />
                </div>
              </div>
              {[
                { label: "Credit", amount: "$98,125.50" },
                { label: "Treasury", amount: "$6,750,200.00" },
                { label: "Operations", amount: "$1,592,864.82" },
              ].map(({ label, amount }) => (
                <div
                  key={label}
                  className="flex items-center justify-between py-3 border-t border-border/50 text-xs"
                >
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium text-foreground">{amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Transactions */}
          <div className="bg-background rounded-xl border border-border p-3">
            <div className="font-medium text-foreground mb-2">Recent Transactions</div>
            <table className="w-full text-[10px]">
              <thead>
                <tr className="text-muted-foreground">
                  <th className="text-left pb-1.5 font-medium">Date</th>
                  <th className="text-left pb-1.5 font-medium">Description</th>
                  <th className="text-right pb-1.5 font-medium">Amount</th>
                  <th className="text-right pb-1.5 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: "Apr 14", desc: "AWS", amount: "-$5,200", status: "Pending", color: "bg-amber-100 text-amber-700" },
                  { date: "Apr 13", desc: "Client Payment", amount: "+$125,000", status: "Completed", color: "bg-green-100 text-green-700" },
                  { date: "Apr 12", desc: "Payroll", amount: "-$85,450", status: "Completed", color: "bg-green-100 text-green-700" },
                  { date: "Apr 11", desc: "Office Supplies", amount: "-$1,200", status: "Completed", color: "bg-green-100 text-green-700" },
                ].map((row) => (
                  <tr key={row.desc} className="border-t border-border/50">
                    <td className="py-1.5 text-muted-foreground">{row.date}</td>
                    <td className="py-1.5 text-foreground">{row.desc}</td>
                    <td className={`py-1.5 text-right font-medium ${row.amount.startsWith("+") ? "text-green-600" : "text-foreground"}`}>
                      {row.amount}
                    </td>
                    <td className="py-1.5 text-right">
                      <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${row.color}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
