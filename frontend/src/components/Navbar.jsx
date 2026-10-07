import { BriefcaseBusiness, CreditCard, LayoutDashboard, Users } from 'lucide-react';

const stats = [
  { label: 'Total bookings', value: '128', icon: BriefcaseBusiness },
  { label: 'Active users', value: '84', icon: Users },
  { label: 'Revenue', value: '$12.8K', icon: CreditCard },
];

const recentBookings = [
  { id: 'BK-1001', customer: 'Maya Singh', stall: 'Sunrise Plaza', amount: '$750', status: 'Confirmed' },
  { id: 'BK-1002', customer: 'Rahul Khan', stall: 'Harbor Market', amount: '$980', status: 'Pending' },
  { id: 'BK-1003', customer: 'Carla Gomez', stall: 'Festival Corner', amount: '$620', status: 'Paid' },
];

function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-primary p-3 text-white">
          <LayoutDashboard size={22} />
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Admin panel</p>
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="card p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-2 text-3xl font-bold">{value}</p>
              </div>
              <div className="rounded-xl bg-blue-50 p-3 text-primary">
                <Icon size={22} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent bookings</h2>
          <button className="btn-secondary">Export report</button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead>
              <tr className="text-left text-sm text-slate-500">
                <th className="pb-3 pr-4 font-medium">Booking ID</th>
                <th className="pb-3 pr-4 font-medium">Customer</th>
                <th className="pb-3 pr-4 font-medium">Stall</th>
                <th className="pb-3 pr-4 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {recentBookings.map((item) => (
                <tr key={item.id}>
                  <td className="py-3 pr-4 font-medium">{item.id}</td>
                  <td className="py-3 pr-4">{item.customer}</td>
                  <td className="py-3 pr-4">{item.stall}</td>
                  <td className="py-3 pr-4">{item.amount}</td>
                  <td className="py-3">
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
