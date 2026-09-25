import { useEffect, useState } from 'react';
import { Save, Star } from 'lucide-react';
import { api } from '../lib/api';

interface BookingPackage {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  featured: boolean;
  order: number;
}

function PackageCard({
  pkg,
  onSaved,
}: {
  pkg: BookingPackage;
  onSaved: (updated: BookingPackage) => void;
}) {
  const [title, setTitle] = useState(pkg.title);
  const [price, setPrice] = useState(pkg.price);
  const [description, setDescription] = useState(pkg.description);
  const [features, setFeatures] = useState(pkg.features.join('\n'));
  const [featured, setFeatured] = useState(pkg.featured);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const updated = await api.put<BookingPackage>(`/api/admin/packages/${pkg.id}`, {
        title,
        price,
        description,
        features: features.split('\n').map((f) => f.trim()).filter(Boolean),
        featured,
      });
      onSaved(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white border border-ink/10 rounded-2xl p-6 space-y-4">
      <div>
        <label className="block text-xs uppercase tracking-wide text-taupe mb-1.5">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-cream border border-ink/10 rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-sapphire"
        />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide text-taupe mb-1.5">
          Price (RWF / guest)
        </label>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full bg-cream border border-ink/10 rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-sapphire"
        />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide text-taupe mb-1.5">
          Description
        </label>
        <textarea
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-cream border border-ink/10 rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-sapphire resize-none"
        />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide text-taupe mb-1.5">
          Features (one per line)
        </label>
        <textarea
          rows={3}
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          className="w-full bg-cream border border-ink/10 rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-sapphire resize-none"
        />
      </div>
      <label className="flex items-center gap-2 text-sm text-ink cursor-pointer">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          className="accent-sapphire"
        />
        <Star className="w-4 h-4 text-sapphire" strokeWidth={1.5} />
        Featured (shown as "Most Booked")
      </label>

      <button
        onClick={handleSave}
        disabled={saving}
        className="inline-flex items-center gap-2 bg-sapphire hover:bg-sapphire-light disabled:opacity-60 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
      >
        <Save className="w-4 h-4" />
        {saving ? 'Saving…' : saved ? 'Saved!' : 'Save Changes'}
      </button>
    </div>
  );
}

export default function PackagesAdminPage() {
  const [packages, setPackages] = useState<BookingPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<BookingPackage[]>('/api/packages')
      .then(setPackages)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl font-medium text-ink mb-1">Packages</h1>
      <p className="text-taupe font-light mb-8">
        Edit the three package tiers shown on the homepage.
      </p>

      {loading && <p className="text-taupe font-light">Loading…</p>}

      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            onSaved={(updated) =>
              setPackages((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
            }
          />
        ))}
      </div>
    </div>
  );
}
