import { useParams } from 'react-router-dom';

const stalls = {
  '1': {
    id: '1',
    name: 'Sunrise Plaza Stall',
    location: 'North Gate',
    price: 250,
    area: '12x18 ft',
    capacity: 4,
    amenities: ['Power', 'Wi-Fi', 'Security'],
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
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
  },
};

function BookingPage() {
  const { id } = useParams();
  const stall = stalls[id];

  if (!stall) {
    return <div className="card p-6">Stall not found.</div>;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="card overflow-hidden">
        <div className="grid gap-0 md:grid-cols-[0.8fr_1.2fr]">
          <img src={stall.image} alt={stall.name} className="h-full w-full object-cover" />
          <div className="p-6 md:p-8">
            <p className="text-sm font-medium uppercase tracking-[0.1em] text-primary">Booking</p>
            <h1 className="mt-2 text-3xl font-bold">{stall.name}</h1>
            <p className="mt-2 text-slate-600">{stall.location}</p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Start date</label>
                <input type="date" className="input-field" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">End date</label>
                <input type="date" className="input-field" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Payment method</label>
                <select className="input-field">
                  <option>Credit Card</option>
                  <option>Debit Card</option>
                  <option>Bank Transfer</option>
                  <option>Cash</option>
                </select>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Daily rate</span>
                <strong>${stall.price}</strong>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
                <span>Booking period</span>
                <strong>3 days</strong>
              </div>
              <div className="mt-4 border-t border-slate-200 pt-4 text-lg font-bold text-slate-900">
                <div className="flex items-center justify-between">
                  <span>Total</span>
                  <span>${stall.price * 3}</span>
                </div>
              </div>
            </div>

            <button className="btn-primary mt-6 w-full">Confirm booking</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
