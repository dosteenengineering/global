"use client";

import { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";

type PartnerEntry = {
    _id: string;
    fullName: string;
    jobTitle?: string;
    email: string;
    phone: string;
    whatsapp?: string;
    companyLegalName: string;
    tradeLicense: string;
    vatNumber?: string;
    yearOfEstablishment?: string;
    companyAddress?: string;
    countryCity?: string;
    companyEmail?: string;
    companyPhone?: string;
    website?: string;
    businessType: string;
    productServices: string[];
    annualCapacity?: string;
    marketsServed: string[];
    minimumOrderQuantity?: string;
    minimumOrderQuantitySpecify?: string;
    relevantExperience?: string;
    keyCertifications?: string;
    pastProjects?: string;
    brochure: string[];
    technicalSpecSheet: string[];
    uploadedDocuments: string[];
    paymentTermsPreference?: string;
    termsAccepted: boolean;
    createdAt: string;
};


const Field = ({ label, value }: { label: string; value?: string | number }) => (
    <div className="flex flex-col gap-0.5">
        <span className="text-[11px] uppercase tracking-wider text-gray-400">
            {label}
        </span>
        <span className="text-gray-800 font-medium">{value || "—"}</span>
    </div>
);

const FileLinks = ({ label, urls }: { label: string; urls?: string[] }) => (
    <div className="flex flex-col gap-0.5">
        <span className="text-[11px] uppercase tracking-wider text-gray-400">
            {label}
        </span>
        {urls && urls.length > 0 ? (
            <div className="flex flex-col gap-1">
                {urls.map((url, i) => (
                    <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 text-sm underline truncate"
                    >
                        File {i + 1}
                    </a>
                ))}
            </div>
        ) : (
            <span className="text-gray-800 font-medium">—</span>
        )}
    </div>
);

const PartnerRegistrationsPage = () => {
    const [entries, setEntries] = useState<PartnerEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<string[]>([]);
    const [viewEntry, setViewEntry] = useState<PartnerEntry | null>(null);
    const [statusFilter, setStatusFilter] = useState<string>("all");

    const fetchEntries = async () => {
        try {
            const res = await fetch("/api/admin/partner");
            if (res.ok) {
                const data = await res.json();
                setEntries(data.data);
                console.log(data.data)
            }
        } catch (error) {
            console.log("Error fetching partner entries", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this entry?")) return;
        try {
            const res = await fetch(`/api/admin/partner/${id}`, {
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
            const res = await fetch("/api/admin/partner/bulk-delete", {
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
            selected.length === filteredEntries.length
                ? []
                : filteredEntries.map((e) => e._id),
        );
    };

    const filteredEntries = entries

    const allSelected =
        filteredEntries.length > 0 && selected.length === filteredEntries.length;
    const someSelected = selected.length > 0 && !allSelected;

    useEffect(() => {
        fetchEntries();
    }, []);

    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Vendor Registrations</h1>
                <span className="text-sm text-gray-500">{filteredEntries.length} total</span>
            </div>

            {/* <div className="flex items-center gap-2">
                {["all", "pending", "reviewed", "approved", "rejected"].map((s) => (
                    <button
                        key={s}
                        onClick={() => setStatusFilter(s)}
                        className={`text-xs px-3 py-1.5 rounded-full border capitalize transition-colors cursor-pointer ${statusFilter === s
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                            }`}
                    >
                        {s}
                    </button>
                ))}
            </div> */}

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
                <p className="text-sm text-gray-400">No registrations yet.</p>
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
                                <th className="px-4 py-3 font-semibold">Full Name</th>
                                <th className="px-4 py-3 font-semibold">Company</th>
                                <th className="px-4 py-3 font-semibold">Business Type</th>
                                <th className="px-4 py-3 font-semibold">Email</th>
                                <th className="px-4 py-3 font-semibold">Phone</th>
                                <th className="px-4 py-3 font-semibold">Country/City</th>
                                {/* <th className="px-4 py-3 font-semibold">Status</th> */}
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
                                    <td className="px-4 py-3 whitespace-nowrap">{entry.fullName}</td>
                                    <td className="px-4 py-3">{entry.companyLegalName}</td>
                                    <td className="px-4 py-3">{entry.businessType}</td>
                                    <td className="px-4 py-3">{entry.email}</td>
                                    <td className="px-4 py-3">{entry.phone}</td>
                                    <td className="px-4 py-3">{entry.countryCity || "—"}</td>
                                    {/* <td className="px-4 py-3">
                                        <select
                                            value={entry.status}
                                            onChange={(e) => handleStatusChange(entry._id, e.target.value)}
                                            onClick={(e) => e.stopPropagation()}
                                            className={`text-xs px-2 py-1 rounded-full border capitalize cursor-pointer ${STATUS_STYLES[entry.status]}`}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="reviewed">Reviewed</option>
                                            <option value="approved">Approved</option>
                                            <option value="rejected">Rejected</option>
                                        </select>
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
                        className="bg-white w-full sm:max-w-2xl sm:mx-4 sm:rounded-xl rounded-t-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b">
                            <div>
                                <h2 className="font-semibold text-base text-gray-800">
                                    Vendor Registration Details
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
                                {/* <select
                                    value={viewEntry.status}
                                    onChange={(e) => handleStatusChange(viewEntry._id, e.target.value)}
                                    className={`text-xs px-2 py-1 rounded-full border capitalize cursor-pointer ${STATUS_STYLES[viewEntry.status]}`}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="reviewed">Reviewed</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                </select> */}
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
                            {/* Personal */}
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3 font-medium">
                                    Personal & Contact
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    <Field label="Full Name" value={viewEntry.fullName} />
                                    <Field label="Job Title" value={viewEntry.jobTitle} />
                                    <Field label="Email" value={viewEntry.email} />
                                    <Field label="Phone" value={viewEntry.phone} />
                                    <Field label="WhatsApp" value={viewEntry.whatsapp} />
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Company */}
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3 font-medium">
                                    Company Details
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    <Field label="Legal Name" value={viewEntry.companyLegalName} />
                                    <Field label="Trade License" value={viewEntry.tradeLicense} />
                                    <Field label="VAT Number" value={viewEntry.vatNumber} />
                                    <Field label="Year Established" value={viewEntry.yearOfEstablishment} />
                                    <Field label="Address" value={viewEntry.companyAddress} />
                                    <Field label="Country/City" value={viewEntry.countryCity} />
                                    <Field label="Company Email" value={viewEntry.companyEmail} />
                                    <Field label="Company Phone" value={viewEntry.companyPhone} />
                                    <Field label="Website" value={viewEntry.website} />
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Business */}
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3 font-medium">
                                    Business Info
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    <Field label="Business Type" value={viewEntry.businessType} />
                                    <Field label="Annual Capacity" value={viewEntry.annualCapacity} />
                                    <Field
                                        label="Products/Services"
                                        value={viewEntry.productServices?.join(", ")}
                                    />
                                    <Field
                                        label="Markets Served"
                                        value={viewEntry.marketsServed?.join(", ")}
                                    />
                                    <Field
                                        label="MOQ"
                                        value={
                                            viewEntry.minimumOrderQuantity === "Yes (specify):"
                                                ? viewEntry.minimumOrderQuantitySpecify
                                                : viewEntry.minimumOrderQuantity
                                        }
                                    />
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Experience & Docs */}
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3 font-medium">
                                    Experience & Documents
                                </p>
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <Field label="Relevant Experience" value={viewEntry.relevantExperience} />
                                    <Field label="Key Certifications" value={viewEntry.keyCertifications} />
                                    <Field label="Payment Terms" value={viewEntry.paymentTermsPreference} />
                                </div>
                                <div className="bg-gray-50 rounded-lg px-4 py-3 mb-3">
                                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-medium">
                                        Past Projects
                                    </p>
                                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                                        {viewEntry.pastProjects || "—"}
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <FileLinks label="Brochure" urls={viewEntry.brochure} />
                                    <FileLinks label="Technical Spec Sheet" urls={viewEntry.technicalSpecSheet} />
                                    <FileLinks label="Uploaded Documents" urls={viewEntry.uploadedDocuments} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PartnerRegistrationsPage;