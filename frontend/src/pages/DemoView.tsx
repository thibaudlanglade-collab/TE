import { useState, type FormEvent } from "react";
import {
  HardHat,
  ClipboardList,
  Workflow,
  CheckCircle2,
  ArrowRight,
  Mail,
} from "lucide-react";

interface DemoCard {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  tint: string;
  accentColor: string;
}

const DEMO_CARDS: DemoCard[] = [
  {
    icon: HardHat,
    title: "Terrain",
    description:
      "Pour ceux qui travaillent en mobilité : BTP, artisans, techniciens, commerciaux.",
    features: [
      "Photos de factures qui se classent toutes seules",
      "Devis générés depuis une description",
      "Rapports clients en quelques secondes",
      "Réponses à vos questions sur vos documents",
    ],
    tint: "bg-gradient-to-br from-violet-100 via-fuchsia-50 to-pink-100 border-violet-200/70",
    accentColor: "#7c3aed",
  },
  {
    icon: ClipboardList,
    title: "Gestion",
    description:
      "Pour ceux qui jonglent avec beaucoup d'administratif : cabinets, services, gestion immobilière, formation.",
    features: [
      "Extraction automatique de contrats et documents",
      "Boîte mail centralisée et triée",
      "Rapports détaillés sur vos dossiers clients",
      "Recherche intelligente dans vos documents",
    ],
    tint: "bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100 border-emerald-200/70",
    accentColor: "#059669",
  },
  {
    icon: Workflow,
    title: "Opérations",
    description:
      "Pour ceux qui gèrent flux et équipes : restauration, commerce, production, logistique.",
    features: [
      "Commandes fournisseurs centralisées",
      "Suivi des stocks automatisé",
      "Tableau de bord de votre activité",
      "Alertes intelligentes sur vos opérations",
    ],
    tint: "bg-gradient-to-br from-indigo-100 via-violet-50 to-fuchsia-100 border-indigo-200/70",
    accentColor: "#4f46e5",
  },
];

export default function DemoView() {
  const [code, setCode] = useState("");

  function handleCodeSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) return;
    window.location.href = `/app/${encodeURIComponent(trimmed)}`;
  }

  const codeEmpty = code.trim().length === 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
      {/* BLOC 1 — Titre et sous-titre */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-gray-900 tracking-tight mb-4 sm:mb-5 leading-tight">
          Obtenez votre aperçu
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Synthèse propose des espaces personnalisés adaptés à votre manière
          de travailler. Choisissez celui qui vous ressemble, explorez-le
          avec vos propres données pendant 14 jours.
        </p>
      </div>

      {/* BLOC 2 — 3 cards, gradient tints + grid pattern */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-16 sm:mb-20">
        {DEMO_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              aria-disabled="true"
              className={`relative overflow-hidden flex flex-col rounded-2xl border p-6 sm:p-7 opacity-[0.9] cursor-default select-none ${card.tint}`}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage: `radial-gradient(${card.accentColor} 1px, transparent 1px)`,
                  backgroundSize: "18px 18px",
                }}
                aria-hidden
              />

              <div className="relative z-10 flex flex-col h-full">
                {/* Header — icon + title */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm bg-white"
                    style={{ color: card.accentColor }}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 tracking-tight leading-tight">
                    {card.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-700 leading-relaxed mb-5 break-words">
                  {card.description}
                </p>

                {/* Divider */}
                <div className="h-px bg-gray-900/10 mb-4" aria-hidden />

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {card.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2">
                      <CheckCircle2
                        className="h-4 w-4 shrink-0 mt-0.5"
                        style={{ color: card.accentColor }}
                      />
                      <span className="text-xs sm:text-[13px] text-gray-700 leading-snug break-words">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Badge */}
                <div className="mt-auto pt-2">
                  <span className="inline-flex items-center text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/80 text-gray-600 uppercase tracking-wider border border-white shadow-sm">
                    Bientôt disponible
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* BLOC 3 — Unified action section (code d'accès + espace personnalisé) */}
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Code d'accès */}
        <div className="px-6 sm:px-8 py-8 sm:py-10 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 tracking-tight">
            Vous avez déjà un code d'accès&nbsp;?
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-6 sm:mb-7 max-w-lg mx-auto">
            Si Thibaud vous a envoyé un code personnalisé, entrez-le ici pour
            accéder directement à votre espace.
          </p>

          <form
            onSubmit={handleCodeSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Entrez votre code"
              autoComplete="off"
              spellCheck={false}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 transition-all"
            />
            <button
              type="submit"
              disabled={codeEmpty}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-violet-500 to-blue-500 text-white text-sm font-semibold rounded-xl hover:from-violet-600 hover:to-blue-600 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md"
            >
              Accéder à mon espace
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Divider interne */}
        <div className="h-px bg-gray-100 mx-6 sm:mx-8" aria-hidden />

        {/* Espace personnalisé */}
        <div className="px-6 sm:px-8 py-8 sm:py-10 text-center bg-gradient-to-br from-violet-50/40 via-white to-blue-50/40">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 tracking-tight leading-tight">
            Vous souhaitez un espace personnalisé pour votre activité&nbsp;?
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-lg mx-auto">
            Si vous voulez une version construite spécifiquement pour votre
            métier ou votre manière de travailler, nous pouvons la préparer
            pour vous.
          </p>

          <a
            href="mailto:contact@synthese.fr?subject=Demande%20d'un%20espace%20personnalis%C3%A9"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-violet-600 text-sm font-semibold rounded-xl border border-violet-300 hover:bg-violet-50 hover:border-violet-400 transition-all"
          >
            <Mail className="h-4 w-4" />
            Nous contacter
          </a>
        </div>
      </div>
    </div>
  );
}
