export default function EmployeeDashboard() {
  return (
   <section className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">
                Employee Dashboard
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Personal overview and quick actions.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h4 className="text-sm font-medium text-slate-500">
                  Team Size
                </h4>
                <p className="mt-4 text-3xl font-semibold text-slate-900">
                  {employees.length}
                </p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h4 className="text-sm font-medium text-slate-500">
                  Leaves Pending
                </h4>
                <p className="mt-4 text-3xl font-semibold text-slate-900">0</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h4 className="text-sm font-medium text-slate-500">
                  Attendance Today
                </h4>
                <p className="mt-4 text-3xl font-semibold text-slate-900">
                  ---
                </p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h4 className="text-sm font-medium text-slate-500">Next Pay</h4>
                <p className="mt-4 text-3xl font-semibold text-slate-900">--</p>
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Recent Colleagues
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  {employees.slice(0, 8).map((item) => (
                    <li
                      key={item._id}
                      className="rounded-2xl bg-slate-50 px-4 py-3"
                    >
                      {item.empName} - {item.empDesignation}
                    </li>
                  ))}
                  {employees.length === 0 && (
                    <li className="text-sm text-slate-500">
                      No colleagues to show
                    </li>
                  )}
                </ul>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Quick Actions
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  <li
                    className="rounded-2xl bg-slate-50 px-4 py-3 cursor-pointer"
                    onClick={() => navigate("/employee/profile")}
                  >
                    View Profile
                  </li>
                  <li
                    className="rounded-2xl bg-slate-50 px-4 py-3 cursor-pointer"
                    onClick={() => navigate("/employee/attendance")}
                  >
                    My Attendance
                  </li>
                  <li
                    className="rounded-2xl bg-slate-50 px-4 py-3 cursor-pointer"
                    onClick={() => navigate("/employee/requests")}
                  >
                    Request Leave
                  </li>
                </ul>
              </div>
            </div>
          </section>
  )
}
