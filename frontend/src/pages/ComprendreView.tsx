import {
  Lightbulb, Brain, Cable, Sparkles,
  Mail, FolderOpen, FileSpreadsheet, Building2, Calculator,
  Calendar, Users, Zap, Bot,
  MessageSquare, CheckCircle2, Clock, Wrench,
  Target, RefreshCw,
  Sheet
} from "lucide-react"
import RadialOrbitalTimeline, { type OrbitalNode } from "@/components/ui/radial-orbital-timeline"

export default function ComprendreView() {
  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-6 pb-24">

      {/* ============================================ */}
      {/* HERO */}
      {/* ============================================ */}
      <div className="text-center mb-12 sm:mb-20 max-w-3xl mx-auto">
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-violet-50 mb-4 sm:mb-5">
          <Lightbulb className="h-6 w-6 sm:h-7 sm:w-7 text-violet-500" />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-5 tracking-tight leading-tight">
          Comprendre Synthèse en 5 minutes
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Avant de vous montrer ce que Synthèse fait, on aimerait vous
          expliquer <strong>pourquoi</strong> ça marche et{" "}
          <strong>comment</strong> les possibilités sont aussi grandes.
          C'est simple, promis.
        </p>
      </div>


      {/* ============================================ */}
      {/* SECTION 1 — LES BOÎTES SÉPARÉES */}
      {/* ============================================ */}
      <div className="mb-14 sm:mb-20">
        <div className="flex items-start sm:items-center gap-3 mb-5 sm:mb-6">
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500 shrink-0 mt-0.5 sm:mt-0">
            1
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
            Aujourd'hui, vos outils ne se parlent pas.
          </h2>
        </div>

        <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6 sm:mb-8">
          Vous avez un CRM pour vos clients. Une boîte mail pour vos
          échanges. Un Drive pour vos documents. Un Excel pour vos
          chiffres. Un logiciel de compta. Un outil de planning.
          Chacun fait son travail. Mais aucun ne sait ce que l'autre
          contient. Pour croiser une information, vous devez ouvrir 3
          outils, chercher manuellement, copier-coller, et espérer ne
          rien oublier.
        </p>

        {/* VISUAL: Isolated boxes */}
        <div className="flex flex-wrap items-center justify-center gap-4 py-8">
          {[
            { icon: "Mail", label: "Emails", color: "bg-red-50 text-red-500 border-red-200" },
            { icon: "FolderOpen", label: "Drive", color: "bg-blue-50 text-blue-500 border-blue-200" },
            { icon: "Sheet", label: "Excel", color: "bg-green-50 text-green-500 border-green-200" },
            { icon: "Building2", label: "CRM", color: "bg-purple-50 text-purple-500 border-purple-200" },
            { icon: "Calculator", label: "Compta", color: "bg-amber-50 text-amber-500 border-amber-200" },
            { icon: "Calendar", label: "Planning", color: "bg-indigo-50 text-indigo-500 border-indigo-200" }
          ].map((box) => {
            const Icon = COMPRENDRE_ICON_MAP[box.icon]
            return (
              <div
                key={box.label}
                className={`flex flex-col items-center gap-2 px-5 py-4 rounded-xl border-2 border-dashed ${box.color}`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs font-semibold">{box.label}</span>
              </div>
            )
          })}
        </div>

        <p className="text-center text-sm text-gray-500 italic mt-4">
          Des boîtes fermées, posées les unes à côté des autres, sans
          aucune connexion.
        </p>
      </div>


      {/* ============================================ */}
      {/* SECTION 2 — LE CERVEAU + LES BRAS */}
      {/* ============================================ */}
      <div className="mb-14 sm:mb-20">
        <div className="flex items-start sm:items-center gap-3 mb-5 sm:mb-6">
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500 shrink-0 mt-0.5 sm:mt-0">
            2
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
            Puis une nouvelle technologie est arrivée.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* The Brain */}
          <div className="bg-violet-50 border border-violet-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center">
                <Brain className="h-6 w-6 text-violet-600" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">Le cerveau</h3>
                <p className="text-xs text-violet-600 font-medium">L'intelligence artificielle</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              Un cerveau capable de lire un document de 50 pages en 3
              secondes, de comprendre un email en 14 langues, de rédiger
              une réponse dans votre ton, de comparer 200 lignes de
              factures sans erreur.
            </p>
            <p className="text-sm text-gray-500 italic mt-3">
              Mais un cerveau tout seul, sans bras, il ne peut rien
              toucher. Il pense, mais il n'agit pas.
            </p>
          </div>

          {/* The Arms */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
                <Cable className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">Les bras</h3>
                <p className="text-xs text-blue-600 font-medium">Les API et connecteurs</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              Ce sont des connecteurs qui permettent au cerveau d'aller
              chercher dans vos boîtes — votre CRM, votre mail, votre
              Drive — de prendre l'information, de la traiter, et de la
              remettre au bon endroit.
            </p>
            <p className="text-sm text-gray-700 font-medium mt-3">
              Le cerveau + les bras = un assistant qui peut tout faire,
              à condition qu'on lui dise quoi faire.
            </p>
          </div>
        </div>
      </div>


      {/* ============================================ */}
      {/* SECTION 3 — SCHÉMA INTERACTIF */}
      {/* ============================================ */}
      <div className="mb-14 sm:mb-20">
        <div className="flex items-start sm:items-center gap-3 mb-5 sm:mb-6">
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500 shrink-0 mt-0.5 sm:mt-0">
            3
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
            Voici comment Synthèse fonctionne.
          </h2>
        </div>

        <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6 sm:mb-8">
          Le cerveau au centre, connecté à tous vos outils. Vous lui
          parlez, il va chercher pour vous.
        </p>

        <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
          <RadialOrbitalTimeline nodes={ORBITAL_NODES} />
        </div>

        <p className="text-center text-xs sm:text-sm text-gray-500 italic mt-5 sm:mt-6 px-4">
          Cliquez sur chaque application pour voir ce que Synthèse fait avec.
        </p>
      </div>


      {/* ============================================ */}
      {/* SECTION 4 — FONCTIONNALITÉS / AGENTS / AUTO */}
      {/* ============================================ */}
      <div className="mb-14 sm:mb-20">
        <div className="flex items-start sm:items-center gap-3 mb-5 sm:mb-6">
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500 shrink-0 mt-0.5 sm:mt-0">
            4
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
            Ce que vous voyez dans la démo, en clair.
          </h2>
        </div>

        {/* Intro — démo = exemples généraux */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl px-6 py-5 mb-8">
          <p className="text-sm text-amber-800 leading-relaxed">
            <span className="font-semibold">Ce que vous explorez ici, c'est une version de démonstration.</span>{" "}
            On a choisi des fonctionnalités générales pour vous montrer ce qui est possible — tri d'emails, planification, extraction de documents, agents IA.
            Mais dans la réalité, aucun client ne reçoit exactement ça.{" "}
            <span className="font-semibold">Votre Synthèse serait construit autour de vos outils, vos processus, votre vocabulaire métier.</span>{" "}
            Ce que vous voyez n'est qu'une infime partie de ce qu'on peut faire.
          </p>
        </div>

        <p className="text-base text-gray-700 leading-relaxed mb-6">
          Pour que ce soit clair, on a découpé ce qu'on construit en 3 grandes familles :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white border-2 border-blue-100 rounded-2xl p-6">
            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
              <Wrench className="h-5 w-5 text-blue-500" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              Les fonctionnalités
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Ce sont des outils que vous connaissez déjà — gestion des emails, planification, traitement de documents.
              Sauf qu'ici, ils sont connectés à l'IA et à vos outils existants via des <span className="font-medium text-gray-800">API</span>.
              Concrètement : au lieu de remplir un formulaire à la main, l'outil comprend ce que vous faites et s'adapte.
            </p>
            <p className="text-xs text-blue-600 italic leading-relaxed">
              Un planificateur classique vous demande de tout saisir. Le nôtre se connecte à votre agenda, lit vos emails, comprend vos contraintes — et compose le planning pour vous.
            </p>
          </div>

          <div className="bg-white border-2 border-amber-100 rounded-2xl p-6">
            <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
              <Zap className="h-5 w-5 text-amber-500" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              Les automatisations
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Des règles intelligentes que Synthèse applique seul, à chaque fois, sans que vous ayez à intervenir.
              Vous définissez la logique une fois — ensuite ça tourne tout seul, 24h/24.
            </p>
            <p className="text-xs text-amber-600 italic leading-relaxed">
              « Quand une facture arrive par email, extrais les montants, range le PDF dans le bon dossier et mets à jour le tableau Excel. » Une fois configuré, plus besoin d'y penser.
            </p>
          </div>

          <div className="bg-white border-2 border-violet-100 rounded-2xl p-6">
            <div className="w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center mb-4">
              <Bot className="h-5 w-5 text-violet-500" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              Les agents IA
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              C'est le niveau supérieur. Un agent IA ne réagit pas à un déclencheur — il prend une mission, réfléchit, va chercher l'information là où elle est, et vous rend un résultat complet.
            </p>
            <p className="text-xs text-violet-600 italic leading-relaxed">
              « Prépare-moi un résumé de l'activité de ce client. » Il fouille les emails, les documents, la compta, croise tout et vous rend un rapport en 30 secondes.
            </p>
          </div>
        </div>
      </div>


      {/* ============================================ */}
      {/* SECTION 5 — POURQUOI C'EST INFINI */}
      {/* ============================================ */}
      <div className="mb-14 sm:mb-20">
        <div className="flex items-start sm:items-center gap-3 mb-5 sm:mb-6">
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500 shrink-0 mt-0.5 sm:mt-0">
            5
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
            Pourquoi les possibilités sont aussi grandes.
          </h2>
        </div>

        <div className="bg-gradient-to-br from-violet-50 via-blue-50 to-violet-50 rounded-2xl sm:rounded-3xl border border-violet-100 px-5 py-6 sm:px-8 sm:py-8 md:px-10">
          <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4">
            On ne vous vend pas un logiciel avec 50 boutons dont vous
            utiliserez 10. On vous construit un outil sur-mesure en
            assemblant : le cerveau (l'IA), les bras (les connexions à
            vos outils), et une interface pensée pour vous.
          </p>
          <p className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4">
            Vous avez une nouvelle idée ? On ajoute un nouveau bras.
            Vous changez de process ? On reconfigure le cerveau. Votre
            activité évolue ? L'outil évolue avec vous.
          </p>
          <p className="text-base sm:text-lg text-gray-900 font-semibold leading-relaxed">
            La seule limite, c'est ce que vous pouvez décrire. Si vous
            pouvez expliquer comment vous travaillez aujourd'hui, on peut
            construire l'outil qui le fait mieux, plus vite, sans erreur.
          </p>
        </div>
      </div>


      {/* ============================================ */}
      {/* SECTION 6 — EXEMPLE CONCRET : PRÉCISION MÉTAL */}
      {/* ============================================ */}
      <div className="mb-14 sm:mb-20">
        <div className="flex items-start sm:items-center gap-3 mb-5 sm:mb-6">
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500 shrink-0 mt-0.5 sm:mt-0">
            6
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
            Exemple concret : comment ça se passe.
          </h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 mb-5 sm:mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
              <Building2 className="h-5 w-5 text-gray-700" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-gray-900">
                Précision Métal
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-500 leading-snug">
                Usine de pièces mécaniques · 25 employés · Vaucluse
              </p>
            </div>
          </div>
          <p className="text-[13px] sm:text-sm text-gray-600 leading-relaxed">
            Précision Métal fabrique des pièces mécaniques sur-mesure
            pour l'industrie. Leur quotidien : 60 emails par jour de
            fournisseurs et clients, des devis à faire dans Excel, un
            planning d'atelier sur un tableau blanc, et une comptabilité
            sur Sage.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {PROCESS_STEPS.map((step) => {
            return (
              <div key={step.number} className="flex items-start gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-violet-50 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-sm font-bold text-violet-600">
                    {step.number}
                  </span>
                </div>
                <div className="flex-1 min-w-0 bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
                  <h4 className="text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                    {step.title}
                  </h4>
                  <p className="text-[13px] sm:text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                  {step.details && (
                    <div className="mt-3 space-y-1.5">
                      {step.details.map((detail, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-violet-500 mt-0.5 shrink-0" />
                          <span className="text-[12px] sm:text-xs text-gray-600 leading-relaxed">{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>


      {/* ============================================ */}
      {/* SECTION 7 — POURQUOI PASSER À CETTE TECHNO */}
      {/* ============================================ */}
      <div className="mb-12 sm:mb-16">
        <div className="flex items-start sm:items-center gap-3 mb-5 sm:mb-6">
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500 shrink-0 mt-0.5 sm:mt-0">
            7
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
            Mais alors, pourquoi changer ?
          </h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 mb-6">
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            Parce que cette technologie vous débloque une autre manière
            de travailler.
          </p>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            Avant, vos applications c'étaient des <strong>boîtes fermées</strong>.
            Chacune dans son coin. Pour trouver une info, vous deviez
            ouvrir la bonne boîte, chercher dedans, et refermer.
          </p>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
            L'IA est arrivée — un <strong>cerveau</strong> capable de
            comprendre, analyser, rédiger. Puis les API sont arrivées —
            des <strong>bras</strong> qui permettent au cerveau d'aller
            chercher dans toutes vos boîtes en même temps.
          </p>
          <p className="text-sm sm:text-base text-gray-900 font-semibold leading-relaxed mb-3 sm:mb-4">
            Résultat : vous parlez au cerveau, il va chercher pour vous.
            Vous n'avez plus à ouvrir 5 outils. Vous posez une question,
            vous donnez une instruction, et le cerveau fait le reste.
          </p>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Et parce que vous n'utilisez qu'une petite partie de chacune
            de ces boîtes, on peut les recréer en <strong>une seule
            grande boîte</strong> — centralisée, simplifiée, adaptée à
            vous. C'est ça, Synthèse.
          </p>
        </div>
      </div>


      {/* ============================================ */}
      {/* CTA */}
      {/* ============================================ */}
      <div className="text-center py-7 sm:py-8 bg-gradient-to-br from-violet-50 via-blue-50 to-violet-50 rounded-2xl sm:rounded-3xl border border-violet-100 px-5 sm:px-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 leading-tight">
          Maintenant que vous avez compris le « comment »...
        </h2>
        <p className="text-sm sm:text-base text-gray-700 mb-6 max-w-xl mx-auto leading-relaxed">
          Explorez les fonctionnalités dans la barre de gauche, ou
          prenons un moment ensemble pour parler de votre activité.
        </p>
        <button
          onClick={() => alert("Modal de contact à connecter (démo)")}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-blue-500 text-white text-sm font-semibold rounded-xl hover:from-violet-600 hover:to-blue-600 transition-all shadow-sm touch-manipulation"
        >
          <Sparkles className="h-4 w-4" />
          Parlons de votre activité
        </button>
      </div>
    </div>
  )
}


// ============================================
// DATA
// ============================================

const COMPRENDRE_ICON_MAP: Record<string, React.ElementType> = {
  Mail, FolderOpen, Sheet, Building2, Calculator, Calendar,
  Target, Clock, RefreshCw, CheckCircle2,
  MessageSquare, Brain, Cable, Wrench, Zap, Bot
}

const PROCESS_STEPS = [
  {
    number: "1",
    iconName: "MessageSquare",
    title: "On échange (1h)",
    description: "Premier rendez-vous gratuit. On écoute : quels outils vous utilisez, comment vous travaillez, ce qui vous prend du temps, ce qui vous frustre. On ne vend rien, on comprend."
  },
  {
    number: "2",
    iconName: "Target",
    title: "On décortique ensemble (1 semaine)",
    description: "On identifie les axes d'amélioration concrets pour Précision Métal :",
    details: [
      "Les emails fournisseurs → triés et classés automatiquement",
      "Les devis → générés à partir d'une simple description",
      "Le planning d'atelier → intelligent, avec les compétences et disponibilités",
      "Le suivi clients → un rapport en 2 minutes au lieu de 45"
    ]
  },
  {
    number: "3",
    iconName: "Wrench",
    title: "On développe la V1 (1-2 semaines)",
    description: "Vous recevez votre Synthèse configuré autour de votre activité. Vous testez au quotidien, avec vos vrais documents, vos vrais emails, vos vrais clients."
  },
  {
    number: "4",
    iconName: "RefreshCw",
    title: "Vous faites un retour, on améliore",
    description: "« Le tri des emails est parfait, mais j'aimerais aussi que les commandes fournisseurs se mettent à jour dans mon Excel. » → On l'ajoute. C'est ça l'avantage du sur-mesure."
  },
  {
    number: "5",
    iconName: "Clock",
    title: "Et ainsi de suite",
    description: "Chaque semaine, on affine. Chaque mois, votre outil est meilleur. Au bout de 3 mois, vous avez un Synthèse qui correspond exactement à votre façon de travailler. Et qui continue d'évoluer avec vous."
  }
]


// ============================================
// ORBITAL NODES — apps connected to the Synthèse brain
// ============================================

const ORBITAL_NODES: OrbitalNode[] = [
  {
    id: 1,
    title: "Gmail",
    subtitle: "Emails",
    description: "Lit vos emails, trie par priorité, prépare des réponses et extrait les pièces jointes.",
    icon: Mail,
    color: "#EA4335",
  },
  {
    id: 2,
    title: "Drive",
    subtitle: "Documents",
    description: "Range vos fichiers, les renomme, les classe automatiquement dans les bons dossiers.",
    icon: FolderOpen,
    color: "#4285F4",
  },
  {
    id: 3,
    title: "Excel",
    subtitle: "Tableaux",
    description: "Met à jour vos tableaux, détecte les anomalies, répond à vos questions en langage naturel.",
    icon: FileSpreadsheet,
    color: "#22C55E",
  },
  {
    id: 4,
    title: "Teams",
    subtitle: "Réunions",
    description: "Résume vos réunions, capture les décisions, alerte votre équipe sur les actions à mener.",
    icon: Users,
    color: "#818CF8",
  },
  {
    id: 5,
    title: "Compta",
    subtitle: "Finances",
    description: "Rapproche factures et paiements, prépare vos déclarations, surveille votre trésorerie.",
    icon: Calculator,
    color: "#F59E0B",
  },
  {
    id: 6,
    title: "CRM",
    subtitle: "Clients",
    description: "Enrichit vos fiches clients, génère des rapports, suit l'état de vos ventes en temps réel.",
    icon: Building2,
    color: "#A78BFA",
  },
]

