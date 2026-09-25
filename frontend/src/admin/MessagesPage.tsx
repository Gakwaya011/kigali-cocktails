import { useEffect, useState } from 'react';
import { Trash2, Mail, MailOpen } from 'lucide-react';
import { api } from '../lib/api';

interface ContactMessage {
  id: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  email: string | null;
  message: string;
  source: string;
  read: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = () => {
    api
      .get<ContactMessage[]>('/api/admin/messages')
      .then(setMessages)
      .catch(() => setError('Failed to load messages'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const toggleRead = async (msg: ContactMessage) => {
    const updated = await api.patch<ContactMessage>(`/api/admin/messages/${msg.id}`, {
      read: !msg.read,
    });
    setMessages((prev) => prev.map((m) => (m.id === msg.id ? updated : m)));
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    await api.delete(`/api/admin/messages/${id}`);
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-medium text-ink mb-1">Messages</h1>
      <p className="text-taupe font-light mb-8">
        Contact form submissions from the Home page and Contact page.
      </p>

      {loading && <p className="text-taupe font-light">Loading…</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && messages.length === 0 && (
        <p className="text-taupe font-light">No messages yet.</p>
      )}

      <div className="space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`bg-white border rounded-2xl p-5 ${
              msg.read ? 'border-ink/10' : 'border-sapphire/40'
            }`}
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <p className="font-medium text-ink">
                  {msg.firstName} {msg.lastName}
                  <span className="ml-2 text-xs font-medium uppercase tracking-wide text-sapphire bg-sapphire/10 px-2 py-0.5 rounded-full">
                    {msg.source === 'home' ? 'Home page' : msg.source === 'contact' ? 'Contact page' : 'Unknown'}
                  </span>
                </p>
                <p className="text-taupe text-sm">
                  {[msg.phone, msg.email].filter(Boolean).join(' · ') || 'No contact info given'}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleRead(msg)}
                  title={msg.read ? 'Mark unread' : 'Mark read'}
                  className="p-2 text-taupe hover:text-sapphire transition-colors"
                >
                  {msg.read ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => remove(msg.id)}
                  title="Delete"
                  className="p-2 text-taupe hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-ink/80 text-sm leading-relaxed">{msg.message}</p>
            <p className="text-taupe/70 text-xs mt-2">
              {new Date(msg.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
