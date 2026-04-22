import { useState } from "react"
import {
  Zap, ArrowLeft, Mail, FolderInput, MessagesSquare, Plus,
  Check, AlertTriangle, X, Settings, History as HistoryIcon,
  Play, Info, Sparkles, Clock, RotateCw, Bell
} from "lucide-react"
import { AUTOMATIONS, AUTOMATION_TEMPLATES, Automation, AutomationExecution, AutomationTemplate } from "@/data/automatisationsDemoData"

const ICON_MAP: Record<string, any> = { Mail, FolderInput, MessagesSquare, RotateCw, Bell }

interface AutomatisationsListProps {
  onBack: () => void
}

export default function AutomatisationsList({ onBack }: AutomatisationsListProps) {
  const [tab, setTab] = useState<"active" | "templates">("active")
  const [selectedId, setSelectedId] = useState<string | null>(AUTOMATIONS[0].id)
  const [activatedTemplates, setActivatedTemplates] = useState<Set<string>>(new Set())

  const selected = AUTOMATIONS.find(a => a.id === selectedId)

  function activateTemplate(id: string) {
    setActivatedTemplates(prev => new Set(prev).add(id))
  }

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col">

      {/* Top bar */}
      <div className="px-3 sm:px-6 py-3 border-b border-gray-200 bg-white flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Retour à la présentation</span>
          <span className="sm:hidden">Retour</span>
        </button>

        {/* Tabs */}
        <div className="inline-flex items-center bg-gray-100 rounded-lg p-1 order-3 sm:order-none w-full sm:w-auto">
          <button
            onClick={() => setTab("active")}
            className={`flex-1 sm:flex-none px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors ${
              tab === "active" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <span className="hidden sm:inline">Mes automatisations</span>
            <span className="sm:hidden">Actives</span>
          </button>
          <button
            onClick={() => setTab("templates")}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors ${
              tab === "templates" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Modèles prêts à l'emploi</span>
            <span className="sm:hidden">Modèles</span>
          </button>
        </div>

        <button className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-violet-500 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-violet-600 transition-colors">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Nouvelle automatisation</span>
          <span className="sm:hidden">Nouvelle</span>
        </button>
      </div>

      {tab === "templates" ? (
        <TemplatesGallery
          activatedIds={activatedTemplates}
          onActivate={activateTemplate}
        />
      ) : (
      <div className="flex-1 flex overflow-hidden">

        {/* LEFT — List (hidden on mobile when a detail is selected) */}
        <aside className={`${selected ? "hidden md:block" : "block"} w-full md:w-80 md:shrink-0 border-r border-gray-200 bg-gray-50/50 overflow-y-auto`}>
          <div className="p-3">
            <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest px-2 mb-2">
              {AUTOMATIONS.length} automatisations actives
            </div>
            <div className="space-y-1.5">
              {AUTOMATIONS.map((auto) => {
                const Icon = ICON_MAP[auto.iconName] || Zap
                const isSelected = selectedId === auto.id
                return (
                  <button
                    key={auto.id}
                    onClick={() => setSelectedId(auto.id)}
                    className={`
                      w-full text-left p-3 rounded-xl transition-all
                      ${isSelected
                        ? 'bg-white border border-violet-200 shadow-sm'
                        : 'border border-transparent hover:bg-white hover:border-gray-200'
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-lg ${auto.iconBg} flex items-center justify-center shrink-0`}>
                        <Icon className={`h-4 w-4 ${auto.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {auto.title}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-2 leading-snug mb-2">
                          {auto.description}
                        </p>
                        <div className="flex items-center gap-2">
                          {auto.status === "active" ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded bg-green-50 text-green-700">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                              En pause
                            </span>
                          )}
                          <span className="text-[10px] text-gray-500">
                            {auto.totalExecutions} exécutions
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </aside>

        {/* RIGHT — Detail */}
        <main className={`${selected ? "block" : "hidden md:block"} flex-1 overflow-y-auto bg-white`}>
          {selected ? (
            <DetailView automation={selected} onBack={() => setSelectedId(null)} />
          ) : (
            <EmptyDetail />
          )}
        </main>
      </div>
      )}
    </div>
  )
}

// ── Templates Gallery ─────────────────────────────────────────────────────────

function TemplatesGallery({
  activatedIds,
  onActivate,
}: {
  activatedIds: Set<string>
  onActivate: (id: string) => void
}) {
  const categories = Array.from(new Set(AUTOMATION_TEMPLATES.map(t => t.category)))

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

        {/* Intro */}
        <div className="mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-medium mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            Bibliothèque de modèles
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 tracking-tight mb-2">
            Démarrez en un clic
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl">
            Plutôt que de partir d'une page blanche, choisissez un modèle déjà
            paramétré pour les besoins courants. Vous l'adaptez ensuite à vos
            dossiers et vos règles.
          </p>
        </div>

        {/* Categories */}
        {categories.map(category => {
          const templates = AUTOMATION_TEMPLATES.filter(t => t.category === category)
          return (
            <section key={category} className="mb-10">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map(tpl => (
                  <TemplateCard
                    key={tpl.id}
                    template={tpl}
                    activated={activatedIds.has(tpl.id)}
                    onActivate={() => onActivate(tpl.id)}
                  />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}

function TemplateCard({
  template,
  activated,
  onActivate,
}: {
  template: AutomationTemplate
  activated: boolean
  onActivate: () => void
}) {
  const Icon = ICON_MAP[template.iconName] || Zap

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md hover:border-violet-200 transition-all flex flex-col">
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl ${template.iconBg} flex items-center justify-center shrink-0`}>
          <Icon className={`h-5 w-5 ${template.iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h4 className="font-semibold text-gray-900 text-[15px] leading-tight">
              {template.title}
            </h4>
            {template.popular && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 uppercase tracking-wide shrink-0">
                Populaire
              </span>
            )}
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            {template.description}
          </p>
        </div>
      </div>

      {/* Trigger / Action */}
      <div className="bg-gray-50 rounded-lg p-3 mb-4 space-y-2">
        <div className="flex items-start gap-2 text-xs">
          <span className="font-semibold text-amber-700 shrink-0">Quand</span>
          <span className="text-gray-700">{template.trigger}</span>
        </div>
        <div className="flex items-start gap-2 text-xs">
          <span className="font-semibold text-emerald-700 shrink-0">Alors</span>
          <span className="text-gray-700">{template.action}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-1">
        <span className="inline-flex items-center gap-1 text-xs text-gray-500">
          <Clock className="h-3 w-3" />
          ~{template.estimatedSetupMinutes} min de paramétrage
        </span>
        <button
          onClick={onActivate}
          disabled={activated}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activated
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default"
              : "bg-violet-500 text-white hover:bg-violet-600 shadow-sm"
          }`}
        >
          {activated ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Activé
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5" />
              Activer ce modèle
            </>
          )}
        </button>
      </div>
    </div>
  )
}

function EmptyDetail() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center max-w-sm">
        <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <Zap className="h-6 w-6 text-gray-400" />
        </div>
        <p className="text-sm text-gray-500">
          Sélectionnez une automatisation pour voir son détail.
        </p>
      </div>
    </div>
  )
}

function DetailView({ automation, onBack }: { automation: Automation; onBack?: () => void }) {
  const [isPaused, setIsPaused] = useState(automation.status === "paused")
  const Icon = ICON_MAP[automation.iconName] || Zap

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-5 sm:py-8">

      {onBack && (
        <button
          onClick={onBack}
          className="md:hidden inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Retour à la liste
        </button>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-100">
        <div className="flex items-start gap-3 sm:gap-4 min-w-0">
          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${automation.iconBg} flex items-center justify-center shrink-0`}>
            <Icon className={`h-6 w-6 sm:h-7 sm:w-7 ${automation.iconColor}`} />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1 break-words">
              {automation.title}
            </h1>
            <p className="text-sm text-gray-600 max-w-xl leading-relaxed mb-2">
              {automation.description}
            </p>
            <p className="text-xs text-gray-500">
              Active depuis le {automation.activeSince}
            </p>
          </div>
        </div>

        {/* Toggle */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className={`
            inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors self-start shrink-0
            ${isPaused
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
            }
          `}
        >
          {isPaused ? (
            <>
              <Play className="h-4 w-4" />
              En pause
            </>
          ) : (
            <>
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Active
            </>
          )}
        </button>
      </div>

      {/* PLAIN TEXT EXPLANATION */}
      <div className="mb-8 p-5 bg-blue-50/40 border border-blue-100 rounded-2xl">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-1">
              En résumé
            </div>
            <p className="text-sm text-gray-800 leading-relaxed">
              {automation.plainText}
            </p>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-xs text-gray-500 mb-1">Total exécutions</div>
          <div className="text-2xl font-semibold text-gray-900">{automation.totalExecutions}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-xs text-gray-500 mb-1">Taux de réussite</div>
          <div className="text-2xl font-semibold text-green-600">{automation.successRate}%</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-xs text-gray-500 mb-1">Dernière exécution</div>
          <div className="text-2xl font-semibold text-gray-900">
            {automation.history[0].time}
          </div>
          <div className="text-xs text-gray-500">{automation.history[0].date}</div>
        </div>
      </div>

      {/* CONFIGURATION */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="h-4 w-4 text-gray-500" />
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">
            Configuration
          </h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          {/* Trigger */}
          <div className="bg-amber-50/50 px-5 py-3 border-b border-amber-100">
            <div className="text-[10px] font-semibold text-amber-700 uppercase tracking-widest mb-1">
              {automation.triggerLabel}
            </div>
            <div className="text-sm text-gray-900 font-medium">
              {automation.triggerValue}
            </div>
          </div>

          {/* Config rows */}
          <div className="divide-y divide-gray-100">
            {automation.config.map((c, i) => (
              <div key={i} className="px-4 sm:px-5 py-3 flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                <div className="text-xs text-gray-500 sm:w-48 sm:shrink-0 sm:pt-0.5">
                  {c.label}
                </div>
                <div className="text-sm text-gray-900 font-mono break-all">
                  {c.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HISTORY */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <HistoryIcon className="h-4 w-4 text-gray-500" />
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">
              Historique des 10 dernières exécutions
            </h2>
          </div>
          <span className="text-xs text-gray-500">
            {automation.totalExecutions} au total
          </span>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="divide-y divide-gray-100">
            {automation.history.map((exec, i) => (
              <ExecutionRow key={i} execution={exec} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ExecutionRow({ execution }: { execution: AutomationExecution }) {
  const statusConfig = {
    success: {
      icon: Check,
      color: "text-green-600",
      bg: "bg-green-50",
      label: "Succès"
    },
    warning: {
      icon: AlertTriangle,
      color: "text-amber-600",
      bg: "bg-amber-50",
      label: "Attention"
    },
    error: {
      icon: X,
      color: "text-red-600",
      bg: "bg-red-50",
      label: "Erreur"
    }
  }

  const config = statusConfig[execution.status]
  const StatusIcon = config.icon

  return (
    <div className="px-5 py-3.5 hover:bg-gray-50 transition-colors">
      <div className="flex items-start gap-3">
        <div className={`w-7 h-7 rounded-lg ${config.bg} flex items-center justify-center shrink-0 mt-0.5`}>
          <StatusIcon className={`h-3.5 w-3.5 ${config.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 mb-1 flex-wrap">
            <span className="text-xs font-semibold text-gray-900 font-mono">
              {execution.date} · {execution.time}
            </span>
            <span className="text-xs text-gray-600">·</span>
            <span className="text-xs text-gray-700 font-medium">
              {execution.source}
            </span>
          </div>
          <div className="text-xs text-gray-600 mb-1">
            {execution.detail}
          </div>
          <div className="text-xs text-gray-500 italic">
            → {execution.action}
          </div>
        </div>
      </div>
    </div>
  )
}
