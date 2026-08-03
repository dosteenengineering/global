"use client";

import { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";

type NewsletterEntry = {
  _id: string;
  email: string;
  createdAt: string;
};

const NewsletterSubscribersPage = () => {
  const [entries, setEntries] = useState<NewsletterEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);

  const fetchEntries = async () => {
    try {
      const res = await fetch("/api/admin/newsletter");
      if (res.ok) {
        const data = await res.json();
        setEntries(data.data);
      }
    } catch (error) {
      console.log("Error fetching newsletter entries", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    try {
      const res = await fetch(`/api/admin/newsletter/${id}`, {
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
      const res = await fetch("/api/admin/newsletter/bulk-delete", {
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
        <h1 className="text-xl font-semibold">Newsletter Subscribers</h1>
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
        <p className="text-sm text-gray-400">No subscribers yet.</p>
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
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Date Subscribed</th>
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
                  <td className="px-4 py-3 whitespace-nowrap">{entry.email}</td>
                  <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                    {new Date(entry.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <RiDeleteBinLine
                      onClick={() => handleDelete(entry._id)}
                      className="cursor-pointer text-red-500 hover:text-red-700 text-base"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NewsletterSubscribersPage;