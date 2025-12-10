// src/pages/PYQ.jsx
import { useMemo, useState } from "react";

const DATA = [
  { year: 2024, subject: "Polity", paper: "GS2", topic: "Constitutional amendments", link: "#" },
  { year: 2023, subject: "Economy", paper: "GS3", topic: "Inflation drivers", link: "#" },
  { year: 2022, subject: "Geography", paper: "GS1", topic: "Monsoon variability", link: "#" },
  { year: 2021, subject: "History", paper: "GS1", topic: "Freedom struggle phases", link: "#" },
  { year: 2020, subject: "Environment", paper: "GS3", topic: "EIA framework", link: "#" },
];

const SUBJECTS = ["All", "Polity", "Economy", "Geography", "History", "Environment"];
const YEARS = ["All", 2024, 2023, 2022, 2021, 2020];

export default function PYQ() {
  const [subject, setSubject] = useState("All");
  const [year, setYear] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return DATA.filter((row) => {
      const okSubject = subject === "All" || row.subject === subject;
      const okYear = year === "All" || row.year === year;
      const okSearch =
        !search ||
        row.topic.toLowerCase().includes(search.toLowerCase()) ||
        row.subject.toLowerCase().includes(search.toLowerCase());
      return okSubject && okYear && okSearch;
    });
  }, [subject, year, search]);

  const downloadCSV = () => {
    const header = "year,subject,paper,topic,link\n";
    const rows = filtered
      .map((r) => `${r.year},${r.subject},${r.paper},"${r.topic.replace(/"/g, '""')}",${r.link}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "UPSC_PYQ.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">PYQ (Previous Year Questions)</h2>

      <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value === "All" ? "All" : Number(e.target.value))}
              className="w-full border rounded px-3 py-2"
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search (topic/subject)</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="e.g., Inflation, Monsoon..."
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button onClick={() => { setSubject("All"); setYear("All"); setSearch(""); }}
                  className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200">
            Reset
          </button>
          <button onClick={downloadCSV}
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
            Download CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Year</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paper</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Topic</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">No results found.</td>
              </tr>
            ) : (
              filtered.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{row.year}</td>
                  <td className="px-4 py-3">{row.subject}</td>
                  <td className="px-4 py-3">{row.paper}</td>
                  <td className="px-4 py-3">{row.topic}</td>
                  <td className="px-4 py-3">
                    <a href={row.link} className="text-blue-600 hover:text-blue-800">View</a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}