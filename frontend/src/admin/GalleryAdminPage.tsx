import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { AlertCircle, ImagePlus, Trash2, Upload } from 'lucide-react';
import { api } from '../lib/api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface GalleryImage {
  id: string;
  url: string;
  caption: string | null;
}

export default function GalleryAdminPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = () => {
    api.get<GalleryImage[]>('/api/gallery').then(setImages).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] ?? null);
    setError('');
  };

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!selectedFile) {
      setError('Choose an image first');
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      const created = await api.post<GalleryImage>('/api/admin/gallery', formData);
      setImages((prev) => [...prev, created]);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch {
      setError('Upload failed — try a smaller image (under 8MB)');
    } finally {
      setUploading(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Remove this photo from the gallery?')) return;
    await api.delete(`/api/admin/gallery/${id}`);
    setImages((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-medium text-ink mb-1">Gallery</h1>
      <p className="text-taupe font-light mb-8">
        Photos added here appear on the public Gallery page, alongside the curated set.
      </p>

      <form onSubmit={handleUpload} className="bg-white border border-ink/10 rounded-2xl p-6 mb-10">
        <label className="block text-xs uppercase tracking-wide text-taupe mb-2">Photo</label>
        <div className="flex flex-wrap items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="sr-only"
            id="gallery-file-input"
          />
          <label
            htmlFor="gallery-file-input"
            className="inline-flex items-center gap-2 bg-ink/5 hover:bg-ink/10 text-ink text-sm font-medium px-5 py-3 rounded-lg cursor-pointer transition-colors"
          >
            <ImagePlus className="w-4 h-4" strokeWidth={1.5} />
            Choose Photo
          </label>
          <span className="text-sm text-taupe truncate max-w-55">
            {selectedFile ? selectedFile.name : 'No photo selected'}
          </span>
        </div>

        <button
          type="submit"
          disabled={uploading || !selectedFile}
          className="mt-4 inline-flex items-center gap-2 bg-sapphire hover:bg-sapphire-light disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          <Upload className="w-4 h-4" />
          {uploading ? 'Uploading…' : 'Upload'}
        </button>

        {error && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mt-4">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" strokeWidth={1.5} />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
      </form>

      {loading && <p className="text-taupe font-light">Loading…</p>}
      {!loading && images.length === 0 && (
        <p className="text-taupe font-light">No photos added yet.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-square">
            <img
              src={img.url.startsWith('http') ? img.url : `${API_URL}${img.url}`}
              alt={img.caption || ''}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => remove(img.id)}
              className="absolute top-2 right-2 bg-ink/70 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
