// SOCIALLOOP V2 - FINAL CONNECTED
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

export const supabase = createClient(
  'https://qiyzhwlfpkfbctqhrjol.supabase.co',
  'sb_publishable_ULFI_gsK1XlAF9Ke4ZUYkA_hLVgdLig'
)

export async function sendMessage(conversationId, senderId, text) {
  const { data } = await supabase.from('messages').insert([{
    conversation_id: conversationId, sender_id: senderId, text: text
  }]).select()
  return data
}

export async function getMessages(conversationId) {
  const { data } = await supabase.from('messages').select('*').eq('conversation_id', conversationId).order('created_at')
  return data
}

export function listenToMessages(conversationId, callback) {
  return supabase.channel('chat-'+conversationId).on('postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${conversationId}` },
    (p) => callback(p.new)
  ).subscribe()
}
