const BASE = "/api/assistant";

export type AssistantSource = {
  type: string;
  tool?: string;
  input?: Record<string, unknown>;
};

export type ChatResponse = {
  conversation_id: number;
  answer: string;
  sources: AssistantSource[];
};

export type ConversationSummary = {
  id: number;
  title: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export async function sendChat(
  message: string,
  conversationId?: number,
): Promise<ChatResponse> {
  const res = await fetch(`${BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ message, conversation_id: conversationId ?? null }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`assistant chat failed (${res.status}): ${text}`);
  }
  return res.json();
}

export async function listConversations(): Promise<ConversationSummary[]> {
  const res = await fetch(`${BASE}/conversations`, { credentials: "include" });
  if (!res.ok) throw new Error(`Failed to list conversations: ${res.statusText}`);
  return res.json();
}

export async function deleteConversation(id: number): Promise<void> {
  const res = await fetch(`${BASE}/conversations/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error(`Failed to delete conversation: ${res.statusText}`);
}
