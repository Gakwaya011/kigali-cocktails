import { CalendarCheck, MessageCircle } from 'lucide-react';

export default function BookingPage() {
  const waNumber = "250783845473";
  const waMessage = encodeURIComponent("Hello Kigali Luxury Cocktails! I am interested in booking a mobile bar setup for an upcoming event. Can we discuss packages and pricing?");
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  return (
    <div className="min-h-screen bg-cream pt-32 pb-16 px-6">
      <div className="max-w-3xl mx-auto bg-white border border-ink/10 rounded-3xl shadow-sm overflow-hidden">

        <div className="bg-ink p-10 text-center">
          <CalendarCheck className="w-12 h-12 text-sapphire-light mx-auto mb-4" />
          <h2 className="text-3xl font-display font-light text-white mb-2">Secure Your Date</h2>
          <p className="text-white/70 font-light">We're available every day of the week for events across Kigali. Reach out to secure your mobile bar setup today.</p>
        </div>

        <div className="p-10 text-center">
          <div className="mb-10">
            <h3 className="text-xl font-medium text-ink mb-4">The Fastest Way to Book</h3>
            <p className="text-taupe mb-6">
              Click the button below to chat with our mixology team directly on WhatsApp. We will help you choose the perfect package and customize your menu.
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl text-lg"
            >
              <MessageCircle className="w-6 h-6" />
              Chat on WhatsApp
            </a>
            <p className="mt-4 text-sm text-taupe">Or call us directly at: <span className="font-mono text-ink font-medium">0783845473</span></p>
          </div>

          <div className="border-t border-ink/10 pt-10">
            <p className="text-sm text-taupe/80">
              *Please note: A deposit is required to secure the physical bar setup and mixologist for your specific date.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}