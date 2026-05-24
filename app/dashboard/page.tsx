"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Timesheet {
  id: string;
  week: number;
  date: string;
  startDate: Date;
  endDate: Date;
  hours: number;
  status: "completed" | "incomplete" | "missing";
}

export default function DashboardPage() {
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTimesheets = async () => {
      try {
        const res = await fetch("/api/timesheets");
        const data = await res.json();
        setTimesheets(data);
      } catch (error) {
        console.error("Failed to fetch timesheets:", error);
      }
      setLoading(false);
    };
    fetchTimesheets();
  }, []);

  const getStatusBadgeColor = (
    status: "completed" | "incomplete" | "missing"
  ) => {
    switch (status) {
      case "completed":
        return "bg-cyan-100 text-cyan-800";
      case "incomplete":
        return "bg-yellow-100 text-yellow-800";
      case "missing":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getActionLabel = (status: "completed" | "incomplete" | "missing") => {
    switch (status) {
      case "completed":
        return "View";
      case "incomplete":
        return "Update";
      case "missing":
        return "Create";
      default:
        return "View";
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-gray-900">ticktock</h1>
            <p className="text-gray-600">Timesheets</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
              John Doe
            </button>
            <span className="text-gray-400">▼</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Your Timesheets
          </h2>

          <div className="flex gap-4 mb-6">
            <input
              type="date"
              placeholder="From date"
              className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white"
            />
            <input
              type="date"
              placeholder="To date"
              className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white"
            />
            <select className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white">
              <option>All Statuses</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
              <option value="missing">Missing</option>
            </select>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Week #
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {timesheets.map((ts) => (
                <tr
                  key={ts.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-4 text-sm text-gray-900">{ts.week}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{ts.date}</td>
                  <td className="px-4 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded text-xs font-semibold uppercase ${getStatusBadgeColor(ts.status)}`}
                    >
                      {ts.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button
                      onClick={() => router.push(`/timesheet/${ts.id}`)}
                      className="text-blue-600 hover:underline text-sm font-medium"
                    >
                      {getActionLabel(ts.status)}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
            <select className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white">
              <option>5 per page</option>
            </select>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
                Previous
              </button>
              {[1, 2, 3, 4, 5, 6, 7, 8, 99].map((page) => (
                <button
                  key={page}
                  className={`px-3 py-1 text-sm rounded ${
                    page === 3
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {page === 99 ? "..." : page}
                </button>
              ))}
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-8 pb-6">
        <div className="text-center text-xs text-gray-400">
          © 2024 tentwenty. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
