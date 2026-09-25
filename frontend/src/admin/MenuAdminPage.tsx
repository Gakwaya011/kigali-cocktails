import { useEffect, useState, type FormEvent } from 'react';
import { Trash2, Plus } from 'lucide-react';
import { api } from '../lib/api';

interface CocktailItem {
  id: string;
  name: string;
  description: string;
  category: 'ALCOHOLIC' | 'NON_ALCOHOLIC';
}

export default function MenuAdminPage() {
  const [items, setItems] = useState<CocktailItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'ALCOHOLIC' | 'NON_ALCOHOLIC'>('ALCOHOLIC');
  const [adding, setAdding] = useState(false);

  const load = () => {
    api.get<CocktailItem[]>('/api/menu').then(setItems).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;
    setAdding(true);
    try {
      const created = await api.post<CocktailItem>('/api/admin/menu', {
        name,
        description,
        category,
      });
      setItems((prev) => [...prev, created]);
      setName('');
      setDescription('');
    } finally {
      setAdding(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Remove this drink from the menu?')) return;
    await api.delete(`/api/admin/menu/${id}`);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const alcoholic = items.filter((i) => i.category === 'ALCOHOLIC');
  const nonAlcoholic = items.filter((i) => i.category === 'NON_ALCOHOLIC');

  return (
    <div>
      <h1 className="font-display text-3xl font-medium text-ink mb-1">Menu</h1>
      <p className="text-taupe font-light mb-8">Add or remove drinks from the Menu page.</p>

      <form
        onSubmit={handleAdd}
        className="bg-white border border-ink/10 rounded-2xl p-6 mb-10 grid gap-4 sm:grid-cols-2"
      >
        <div className="sm:col-span-2">
          <label className="block text-xs uppercase tracking-wide text-taupe mb-1.5">
            Drink Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Sunset Spritz"
            className="w-full bg-cream border border-ink/10 rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-sapphire"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs uppercase tracking-wide text-taupe mb-1.5">
            Ingredients
          </label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Gin, aperol, prosecco, orange"
            className="w-full bg-cream border border-ink/10 rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-sapphire"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wide text-taupe mb-1.5">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as 'ALCOHOLIC' | 'NON_ALCOHOLIC')}
            className="w-full bg-cream border border-ink/10 rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-sapphire"
          >
            <option value="ALCOHOLIC">Alcoholic</option>
            <option value="NON_ALCOHOLIC">Non-Alcoholic</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            disabled={adding}
            className="inline-flex items-center gap-2 bg-sapphire hover:bg-sapphire-light disabled:opacity-60 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            {adding ? 'Adding…' : 'Add Drink'}
          </button>
        </div>
      </form>

      {loading && <p className="text-taupe font-light">Loading…</p>}

      {!loading && (
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { label: 'Alcoholic Cocktails', drinks: alcoholic },
            { label: 'Non-Alcoholic Cocktails', drinks: nonAlcoholic },
          ].map(({ label, drinks }) => (
            <div key={label}>
              <h2 className="font-display text-xl text-ink mb-3">{label}</h2>
              <div className="space-y-2">
                {drinks.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-ink/10 rounded-xl p-4 flex items-start justify-between gap-3"
                  >
                    <div>
                      <p className="font-medium text-ink text-sm">{item.name}</p>
                      <p className="text-taupe text-xs">{item.description}</p>
                    </div>
                    <button
                      onClick={() => remove(item.id)}
                      className="p-1.5 text-taupe hover:text-red-600 transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {drinks.length === 0 && (
                  <p className="text-taupe/70 text-sm">No drinks in this category yet.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
