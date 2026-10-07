import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, ShieldCheck, Sparkles, Store, Ticket } from 'lucide-react';

const featuredStalls = [
  {
    id: '1',
    name: 'Sunrise Plaza Stall',
    location: 'North Gate',
    price: 250,
    capacity: 4,
    area: '12x18 ft',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '2',
    name: 'Harbor Market Booth',
    location: 'Central Pavilion',
    price: 420,
    capacity: 6,
    area: '16x22 ft',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '3',
    name: 'Festival Corner Stall',
    location: 'South Avenue',
    price: 310,
    capacity: 5,
    area: '14x20 ft',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
  },
];

const features = [
  { icon: Store, title: 'Seamless stall discovery', text: 'Explore premium locations and compare stall sizes and pricing.' },
  { icon: CalendarDays, title: 'Quick booking flow', text: 'Reserve your preferred booth with a simple and guided booking journey.' },
  { icon: ShieldCheck, title: 'Trusted management', text: 'Admin approvals, payments, and booking status all in one place.' },
];

function HomePage() {
  return (
    <div className="space-y-12">
      <section className="grid gap-8 overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-primary p-8 text-white shadow-soft lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm">
            <Sparkles size={16} />
            Smart event booking platform
          </span>
          <div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Book the perfect stall for your next event.</h1>
            <p className="mt-4 max-w-xl text-base text-blue-100 md:text-lg">
              Discover available booths, compare pricing, and reserve your ideal event space in minutes.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link to="/register" className="btn-primary bg-white text-primary hover:bg-slate-100">
              Create account
            </Link>
            <Link to="/login" className="btn-secondary border-white/20 bg-white/5 text-white hover:bg-white/10">
              Sign in
            </Link>
          </div>
        </div>

        <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-sm">
          <div className="rounded-2xl bg-white p-5 text-slate-900 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Available today</p>
                <h3 className="text-2xl font-bold">24 stalls</h3>
              </div>
              <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
                <Ticket size={24} />
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between rounded-xl bg-slate-100 p-3">
                <span className="text-sm">North Gate</span>
                <span className="font-semibold text-primary">12 open</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-100 p-3">
                <span className="text-sm">Central Pavilion</span>
                <span className="font-semibold text-primary">8 open</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-100 p-3">
                <span className="text-sm">South Avenue</span>
                <span className="font-semibold text-primary">4 open</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {features.map(({ icon: Icon, title, text }) => (
          <div key={title} className="card p-6">
            <div className="mb-4 inline-flex rounded-xl bg-blue-50 p-3 text-primary">
              <Icon size={22} />
            </div>
            <h3 className="mb-2 text-lg font-semibold">{title}</h3>
            <p className="text-sm text-slate-600">{text}</p>
          </div>
        ))}
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.12em] text-primary">Popular options</p>
            <h2 className="mt-2 text-3xl font-bold">Featured stalls</h2>
          </div>
          <Link to="/login" className="text-sm font-semibold text-primary">
            View all stalls →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredStalls.map((stall) => (
            <div key={stall.id} className="card overflow-hidden">
              <img src={stall.image} alt={stall.name} className="h-52 w-full object-cover" />
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold">{stall.name}</h3>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    Available
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                  <MapPin size={16} />
                  {stall.location}
                </div>

                <div className="mt-5 flex items-center justify-between text-sm text-slate-600">
                  <span>{stall.area}</span>
                  <span>{stall.capacity} people</span>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase text-slate-400">From</p>
                    <p className="text-2xl font-bold text-slate-900">${stall.price}</p>
                  </div>
                  <Link to={`/stall/${stall.id}`} className="btn-primary">
                    View details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
