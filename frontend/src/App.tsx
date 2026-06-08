import React, { useEffect, useState } from 'react';

export default function App() {
  const [serverStatus, setServerStatus] = useState<string>('Connecting...');

  useEffect(() => {
    fetch('http://localhost:5000/api/health')
      .then((res) => res.json())
      .then((data) => setServerStatus(`Backend Active (${data.status})`))
      .catch(() => setServerStatus('Backend Offline'));
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans flex flex-col justify-between">
      <header className="border-b border-neutral-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-light tracking-widest text-amber-500 uppercase">Kigali Luxury Cocktails</h1>
        <span className="text-xs font-mono bg-neutral-900 px-3 py-1 rounded border border-neutral-800 text-neutral-400">
          {serverStatus}
        </span>
      </header>
      
      <main className="max-w-4xl mx-auto px-6 py-20 text-center flex-grow flex flex-col justify-center">
        <h2 className="text-4xl md:text-5xl font-extralight tracking-wide mb-4">Elevated Mixology Events</h2>
        <p className="text-neutral-400 max-w-lg mx-auto font-light leading-relaxed">
          Crafting ultra-premium mobile cocktail bars and bespoke menus for private and corporate gatherings across Kigali.
        </p>
      </main>

      <footer className="border-t border-neutral-900 py-6 text-center text-xs text-neutral-600 tracking-wider">
        © {new Date().getFullYear()} KIGALI LUXURY COCKTAILS. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}