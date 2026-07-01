"use client";

import { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";

type ContactEnquiryEntry = {
  _id: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  role?: string;
  email: string;
  phone: string;
  projectLocation?: string;
  systemOfInterest?: string;
  projectBrief?: string;
  createdAt: string;
};

const Field = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[11px] uppercase tracking-wider text-gray-400">
      {label}
    </span>
    <span className="text-gray-800 font-medium">{value || "—"}</span>
  </div>
);

const ContactEnquiriesPage = () => {
  const [entries, setEntries] = useState<ContactEnquiryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);
  const [viewEntry, setViewEntry] = useState<ContactEnquiryEntry | null>(null);

  const fetchEntries = async () => {
    try {
      const res = await fetch("/api/admin/contact-enquiry");
      if (res.ok) {
        const data = await res.json();
        setEntries(data.data);
      }
    } catch (error) {
      console.log("Error fetching contact enquiries", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    try {
      const res = await fetch(`/api/admin/contact-enquiry/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setEntries((prev) => prev.filter((e) => e._id !== id));
        setSelected((prev) => prev.filter((s) => s !== id));
      }
    } catch (error) {
      console.log("Error deleting entry", error);
    }
  };

  const handleBulkDelete = async () => {
    if (!selected.length) return;
    if (!confirm(`Delete ${selected.length} selected entries?`)) return;
    try {
      const res = await fetch("/api/admin/contact-enquiry/bulk-delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selected }),
      });
      if (res.ok) {
        setEntries((prev) => prev.filter((e) => !selected.includes(e._id)));
        setSelected([]);
      }
    } catch (error) {
      console.log("Error bulk deleting", error);
    }
  };

  const toggleOne = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const toggleAll = () => {
    setSelected(
      selected.length === entries.length ? [] : entries.map((e) => e._id),
    );
  };

  const allSelected = entries.length > 0 && selected.length === entries.length;
  const someSelected = selected.length > 0 && !allSelected;

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Contact Enquiries</h1>
        <span className="text-sm text-gray-500">{entries.length} total</span>
      </div>

      {selected.length > 0 && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-md px-4 py-2">
          <span className="text-sm text-red-600">
            {selected.length} selected
          </span>
          <Button
            type="button"
            onClick={handleBulkDelete}
            className="ml-auto text-white bg-red-500 hover:bg-red-600 text-xs px-3 py-1 h-auto"
          >
            Delete Selected
          </Button>
        </div>
      )}

      {loading ? (
        <p className="text-sm text-gray-400">Loading...</p>
      ) : entries.length === 0 ? (
        <p className="text-sm text-gray-400">No enquiries yet.</p>
      ) : (
        <div className="rounded-md border border-black/10 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = someSelected;
                    }}
                    onChange={toggleAll}
                    className="cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Company</th>
                <th className="px-4 py-3 font-semibold">Role</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Phone</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold">System</th>
                {/* <th className="px-4 py-3 font-semibold">Brief</th> */}
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr
                  key={entry._id}
                  className={`border-t border-black/10 ${
                    selected.includes(entry._id)
                      ? "bg-red-50"
                      : index % 2 === 0
                        ? "bg-white"
                        : "bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(entry._id)}
                      onChange={() => toggleOne(entry._id)}
                      className="cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {entry.firstName} {entry.lastName}
                  </td>
                  <td className="px-4 py-3">{entry.companyName || "—"}</td>
                  <td className="px-4 py-3">{entry.role || "—"}</td>
                  <td className="px-4 py-3">{entry.email}</td>
                  <td className="px-4 py-3">{entry.phone}</td>
                  <td className="px-4 py-3">{entry.projectLocation || "—"}</td>
                  <td className="px-4 py-3">{entry.systemOfInterest || "—"}</td>
                  {/* <td className="px-4 py-3 max-w-[200px] truncate">
                    {entry.projectBrief || "—"}
                  </td> */}
                  <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                    {new Date(entry.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-5">
                      <button
                        onClick={() => setViewEntry(entry)}
                        className="text-blue-500 hover:text-blue-700 transition-colors cursor-pointer"
                        title="View"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                      <RiDeleteBinLine
                        onClick={() => handleDelete(entry._id)}
                        className="cursor-pointer text-red-500 hover:text-red-700 text-base"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {viewEntry && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setViewEntry(null)}
        >
          <div
            className="bg-white w-full sm:max-w-xl sm:mx-4 sm:rounded-xl rounded-t-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b">
              <div>
                <h2 className="font-semibold text-base text-gray-800">
                  Enquiry Details
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {new Date(viewEntry.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <button
                onClick={() => setViewEntry(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 flex flex-col gap-5 max-h-[70vh] overflow-y-auto">
              {/* Person */}
              <div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="First Name" value={viewEntry.firstName} />
                  <Field label="Last Name" value={viewEntry.lastName} />
                  <Field label="Company" value={viewEntry.companyName} />
                  <Field label="Role" value={viewEntry.role} />
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Contact */}
              <div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Email" value={viewEntry.email} />
                  <Field label="Phone" value={viewEntry.phone} />
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Project */}
              <div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Field label="Location" value={viewEntry.projectLocation} />
                  <Field
                    label="System of Interest"
                    value={viewEntry.systemOfInterest}
                  />
                </div>
                <div className="bg-gray-50 rounded-lg px-4 py-3">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-medium">
                    Project Brief
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {viewEntry.projectBrief || "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactEnquiriesPage;
