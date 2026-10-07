import { ArrowLeft, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const stalls = {
  '1': {
    id: '1',
    name: 'Sunrise Plaza Stall',
    location: 'North Gate',
    price: 250,
    area: '12x18 ft',
    capacity: 4,
    amenities: ['Power', 'Wi-Fi', 'Security'],
    description: 'A premium booth located near the main entrance with strong foot traffic and excellent visibility.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
  },
  '2': {
    id: '2',
    name: 'Harbor Market Booth',
    location: 'Central Pavilion',
    price: 420,
    area: '16x22 ft',
    capacity: 6,
    amenities: ['Water', 'Wi-Fi', 'Display Rack'],
    description: 'A spacious booth in the center of the market with high visibility and prime footfall.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  },
  '3': {
    id: '3',
    name: 'Festival Corner Stall',
    location: 'South Avenue',
    price: 310,
    area: '14x20 ft',
    capacity: 5,
    amenities: ['Lighting', 'Power', 'Storage'],
    description: 'An ideal event-ready stall featuring excellent visibility and flexible product display setup.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
  },
};

function StallDetailsPage() {
  const { id } = useParams();
  const stall = stalls[id];

  if (!stall) {
    return <div className="card p-6">Stall not found.</div>;
  }

  return (
    <div className="space-y-6">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-primary">
        <ArrowLeft size={16} />
        Back to stalls
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-3xl bg-white shadow-soft">
          <img src={stall.image} alt={stall.name} className="h-[420px] w-full object-cover" />
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-3xl font-bold">{stall.name}</h1>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Available</span>
          </div>

          <div className="mt-4 flex items-center gap-2 text-slate-500">
            <MapPin size={16} />
            {stall.location}
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-4xl font-bold text-slate-900">${stall.price}</span>
            <span className="text-sm text-slate-500">per day</span>
          </div>

          <div className="mt-6 space-y-3 text-sm text-slate-600">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span>Space</span>
              <strong>{stall.area}</strong>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span>Capacity</span>
              <strong>{stall.capacity} people</strong>
            </div>
            <div className="flex justify-between pb-2">
              <span>Location</span>
              <strong>{stall.location}</strong>
            </div>
          </div>

          <Link to={`/book/${stall.id}`} className="btn-primary mt-6 w-full">
            Reserve this stall
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="card p-6">
          <h2 className="text-xl font-semibold">About this stall</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">{stall.description}</p>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold">Amenities</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {stall.amenities.map((item) => (
              <span key={item} className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700">
                {item}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3 rounded-xl bg-blue-50 p-4 text-sm text-blue-700">
            <ShieldCheck size={18} />
            Verified venue with event safety support.
          </div>
        </div>
      </div>
    </div>
  );
}

export default StallDetailsPage;
