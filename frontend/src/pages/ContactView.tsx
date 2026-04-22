import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  CalendarCheck,
  Clock,
} from "lucide-react";

export default function ContactView() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-100 to-blue-100 flex items-center justify-center">
          <Mail className="h-6 w-6 text-violet-600" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Parlons de votre activité
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Racontez-nous ce qui vous occupe — on vous répond sous 24&nbsp;h.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Coordonnées */}
        <div className="bg-gradient-to-br from-violet-500 to-blue-500 rounded-2xl p-6 sm:p-7 text-white shadow-md">
          <h3 className="text-base font-semibold mb-5">Nos coordonnées</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                <Phone className="h-4 w-4" />
              </div>
              <a
                href="tel:+33769455078"
                className="hover:underline underline-offset-2"
              >
                07 69 45 50 78
              </a>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                <Mail className="h-4 w-4" />
              </div>
              <a
                href="mailto:langlade.thibaud@xn--synthse-6xa.fr"
                className="hover:underline underline-offset-2 break-all"
              >
                langlade.thibaud@synthèse.fr
              </a>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                <MapPin className="h-4 w-4" />
              </div>
              <span>France</span>
            </li>
          </ul>
        </div>

        {/* Comment ça se passe */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-5">
            Comment ça se passe
          </h3>
          <ol className="flex flex-col gap-4">
            <Step
              icon={<MessageSquare className="h-4 w-4" />}
              title="Vous envoyez un message"
              body="Un email ou un appel suffit — même en deux lignes. Pas de jargon requis."
            />
            <Step
              icon={<CalendarCheck className="h-4 w-4" />}
              title="On prend contact"
              body="On vous répond rapidement et on peut se fixer un rendez-vous si besoin."
            />
            <Step
              icon={<Clock className="h-4 w-4" />}
              title="On discute concrètement"
              body="Démo personnalisée et estimation adaptées à votre contexte."
            />
          </ol>
        </div>
      </div>
    </div>
  );
}

function Step(props: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <li className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-100 to-blue-100 text-violet-600 flex items-center justify-center shrink-0 mt-0.5">
        {props.icon}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-900">
          {props.title}
        </span>
        <span className="text-xs text-gray-600 leading-relaxed mt-0.5">
          {props.body}
        </span>
      </div>
    </li>
  );
}
