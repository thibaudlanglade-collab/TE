import { useEffect, useRef, useState } from "react"
import {
  Send,
  MessageSquare,
  Bot,
  User,
  Mail,
  Search,
  BarChart3,
  AlertCircle,
} from "lucide-react"
import { sendChat, type AssistantSource } from "../../api/assistantClient"

interface ChatAssistantViewProps {
  onExit?: () => void
}

const SUGGESTED_QUESTIONS = [
  "Résume-moi les emails non lus des 7 derniers jours",
  "Qui m'a écrit le plus cette semaine ?",
  "Quels sont les sujets urgents en cours dans ma boîte mail ?",
  "Trouve les emails contenant 'facture' des 30 derniers jours",
  "Combien d'emails importants j'ai reçu aujourd'hui ?",
]

interface DisplaySource {
  label: string
  icon: "search" | "mail" | "count"
}

interface ChatMessage {
  role: "user" | "assistant" | "error"
  content: string
  sources?: DisplaySource[]
}

const SOURCE_ICONS = {
  search: Search,
  mail: Mail,
  count: BarChart3,
}

function buildDisplaySources(sources: AssistantSource[]): DisplaySource[] {
  return sources.map((s) => {
    if (s.tool === "search_emails") {
      const q = (s.input?.query as string) || ""
      const from = (s.input?.from_email as string) || ""
      const label = q
        ? `Recherche emails: « ${q} »`
        : from
        ? `Emails de ${from}`
        : "Recherche emails"
      return { label, icon: "search" as const }
    }
    if (s.tool === "read_email") {
      return {
        label: `Lecture email #${s.input?.email_id ?? ""}`,
        icon: "mail" as const,
      }
    }
    if (s.tool === "count_emails") {
      return { label: "Statistiques emails", icon: "count" as const }
    }
    return { label: s.tool || "Outil", icon: "search" as const }
  })
}

export default function ChatAssistantView(_props: ChatAssistantViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [conversationId, setConversationId] = useState<number | undefined>(undefined)
  const endRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages, isTyping])

  const sendMessage = async (text: string) => {
    const userMsg: ChatMessage = { role: "user", content: text }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    try {
      const res = await sendChat(text, conversationId)
      setConversationId(res.conversation_id)
      const assistantMsg: ChatMessage = {
        role: "assistant",
        content: res.answer || "(réponse vide)",
        sources: buildDisplaySources(res.sources || []),
      }
      setMessages((prev) => [...prev, assistantMsg])
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      setMessages((prev) => [
        ...prev,
        {
          role: "error",
          content: `Je n'ai pas pu te répondre (${message}). Réessaie dans un instant.`,
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
        {messages.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-violet-50 mb-5">
              <MessageSquare className="h-7 w-7 text-violet-500" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Discuter avec Synthèse
            </h2>
            <p className="text-base text-gray-600 mb-2">
              Posez une question sur vos emails. Synthèse interroge votre boîte
              mail et vous répond avec les sources.
            </p>
            <p className="text-sm text-violet-600 italic mb-8">
              Comme un collègue qui connaît tous vos dossiers.
            </p>

            <div className="space-y-2 max-w-lg mx-auto">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3">
                Essayez une question
              </p>
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="w-full text-left px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 hover:border-violet-300 hover:bg-violet-50/30 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role !== "user" && (
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1 ${
                      msg.role === "error" ? "bg-red-100" : "bg-violet-100"
                    }`}
                  >
                    {msg.role === "error" ? (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    ) : (
                      <Bot className="h-4 w-4 text-violet-600" />
                    )}
                  </div>
                )}
                <div
                  className={`max-w-[85%] sm:max-w-[80%] min-w-0 ${
                    msg.role === "user"
                      ? "bg-violet-500 text-white rounded-2xl rounded-br-md px-4 py-3"
                      : msg.role === "error"
                      ? "bg-red-50 border border-red-200 rounded-2xl rounded-bl-md px-4 sm:px-5 py-3 sm:py-4"
                      : "bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 sm:px-5 py-3 sm:py-4"
                  }`}
                >
                  <p
                    className={`text-sm whitespace-pre-line leading-relaxed break-words ${
                      msg.role === "user"
                        ? "text-white"
                        : msg.role === "error"
                        ? "text-red-800"
                        : "text-gray-800"
                    }`}
                  >
                    {msg.content}
                  </p>
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-2">
                        Sources
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.sources.map((src, j) => {
                          const SrcIcon = SOURCE_ICONS[src.icon]
                          return (
                            <span
                              key={j}
                              className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-md bg-amber-50 text-amber-700"
                            >
                              <SrcIcon className="h-3 w-3" />
                              {src.label}
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center shrink-0 mt-1">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="h-4 w-4 text-violet-600 animate-pulse" />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-5 py-4">
                  <div className="flex gap-1">
                    <div
                      className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 bg-white px-4 sm:px-6 py-4">
        <div className="max-w-3xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && input.trim() && !isTyping) {
                sendMessage(input.trim())
              }
            }}
            placeholder="Posez une question sur vos emails..."
            disabled={isTyping}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent disabled:bg-gray-50"
          />
          <button
            onClick={() => input.trim() && !isTyping && sendMessage(input.trim())}
            disabled={!input.trim() || isTyping}
            className="px-4 py-3 bg-violet-500 text-white rounded-xl hover:bg-violet-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
