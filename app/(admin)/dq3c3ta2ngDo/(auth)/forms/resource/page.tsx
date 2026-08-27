"use client";

import { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";

type ResourceEntry = {
    _id: string;
    name: string;
    email: string;
    contactNumber: string;
    fileUrl: string;
    fileName: string;
    createdAt: string;
    approved: boolean;
};

const Field = ({ label, value }: { label: string; value?: string | number }) => (
    <div className="flex flex-col gap-0.5">
        <span className="text-[11px] uppercase tracking-wider text-gray-400">
            {label}
        </span>
        <span className="text-gray-800 font-medium">{value || "—"}</span>
    </div>
);

const FileLink = ({ label, url, fileName }: { label: string; url?: string; fileName?: string }) => (
    <div className="flex flex-col gap-0.5">
        <span className="text-[11px] uppercase tracking-wider text-gray-400">
            {label}
        </span>
        {url ? (
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 text-sm underline truncate"
            >
                {fileName || "View file"}
            </a>
        ) : (
            <span className="text-gray-800 font-medium">—</span>
        )}
    </div>
);

const ResourceSubmissionsPage = () => {
    const [entries, setEntries] = useState<ResourceEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<string[]>([]);
    const [viewEntry, setViewEntry] = useState<ResourceEntry | null>(null);

    const fetchEntries = async () => {
        try {
            const res = await fetch("/api/admin/download-lead");
            if (res.ok) {
                const data = await res.json();
                setEntries(data.data);
            }
        } catch (error) {
            console.log("Error fetching resource entries", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this entry?")) return;
        try {
            const res = await fetch(`/api/admin/download-lead?id=${id}`, {
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

    const handleApprove = async (id: string, approved: boolean) => {
        try {
            const res = await fetch(`/api/admin/download-lead?id=${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ approved }),
            });
            if (res.ok) {
                setEntries((prev) =>
                    prev.map((e) => (e._id === id ? { ...e, approved } : e)),
                );
                setViewEntry((prev) =>
                    prev && prev._id === id ? { ...prev, approved } : prev,
                );
            } else {
                const data = await res.json().catch(() => null);
                if (data?.message) alert(data.message);
            }
        } catch (error) {
            console.log("Error updating approval status", error);
        }
    };

    const handleBulkDelete = async () => {
        if (!selected.length) return;
        if (!confirm(`Delete ${selected.length} selected entries?`)) return;
        try {
            await Promise.all(
                selected.map((id) =>
                    fetch(`/api/admin/download-lead?id=${id}`, { method: "DELETE" }),
                ),
            );
            setEntries((prev) => prev.filter((e) => !selected.includes(e._id)));
            setSelected([]);
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
            selected.length === filteredEntries.length
                ? []
                : filteredEntries.map((e) => e._id),
        );
    };

    const filteredEntries = entries;

    const allSelected =
        filteredEntries.length > 0 && selected.length === filteredEntries.length;
    const someSelected = selected.length > 0 && !allSelected;

    useEffect(() => {
        fetchEntries();
    }, []);

    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Resource Submissions</h1>
                <span className="text-sm text-gray-500">{filteredEntries.length} total</span>
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
            ) : filteredEntries.length === 0 ? (
                <p className="text-sm text-gray-400">No submissions yet.</p>
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
                                <th className="px-4 py-3 font-semibold">Email</th>
                                <th className="px-4 py-3 font-semibold">Contact Number</th>
                                <th className="px-4 py-3 font-semibold">File</th>
                                <th className="px-4 py-3 font-semibold">Approved</th>
                                <th className="px-4 py-3 font-semibold">Date</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEntries.map((entry, index) => (
                                <tr
                                    key={entry._id}
                                    className={`border-t border-black/10 ${selected.includes(entry._id)
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
                                    <td className="px-4 py-3 whitespace-nowrap">{entry.name}</td>
                                    <td className="px-4 py-3">{entry.email}</td>
                                    <td className="px-4 py-3">{entry.contactNumber}</td>
                                    <td className="px-4 py-3">
                                        <a
                                            href={entry.fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:text-blue-700 underline truncate"
                                        >
                                            {entry.fileName}
                                        </a>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleApprove(entry._id, !entry.approved);
                                            }}
                                            className={`text-xs px-2.5 py-1 rounded-full border capitalize transition-colors cursor-pointer ${entry.approved
                                                ? "bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                                                : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
                                                }`}
                                        >
                                            {entry.approved ? "Approved" : "Pending"}
                                        </button>
                                    </td>
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
                        className="bg-white w-full sm:max-w-lg sm:mx-4 sm:rounded-xl rounded-t-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b">
                            <div>
                                <h2 className="font-semibold text-base text-gray-800">
                                    Resource Submission Details
                                </h2>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    {new Date(viewEntry.createdAt).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => handleApprove(viewEntry._id, !viewEntry.approved)}
                                    className={`text-xs px-2.5 py-1 rounded-full border capitalize transition-colors cursor-pointer ${viewEntry.approved
                                        ? "bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                                        : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
                                        }`}
                                >
                                    {viewEntry.approved ? "Approved" : "Pending"}
                                </button>
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
                        </div>

                        {/* Body */}
                        <div className="px-6 py-5 flex flex-col gap-5 max-h-[70vh] overflow-y-auto">
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3 font-medium">
                                    Contact Details
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    <Field label="Name" value={viewEntry.name} />
                                    <Field label="Email" value={viewEntry.email} />
                                    <Field label="Contact Number" value={viewEntry.contactNumber} />
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3 font-medium">
                                    Downloaded Resource
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    <FileLink label="File" url={viewEntry.fileUrl} fileName={viewEntry.fileName} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResourceSubmissionsPage;