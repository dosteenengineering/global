export function typeToId(type: string) {
  const map: Record<string, string> = {
    technicalDocuments: "technical-documents",
    bimCadFiles: "bim-cad-files",
    videosDemos: "videos-demos",
    brochures: "brochures-catalogues",
    certifications: "certifications-compliance",
    installationMaintenance: "installation-maintenance",
  };
  return map[type] ?? type;
}

export function typeToLabel(type: string) {
  const map: Record<string, string> = {
    technicalDocuments: "Technical Documents",
    bimCadFiles: "BIM & CAD Files",
    videosDemos: "Videos & Demos",
    brochures: "Brochures & catalogues",
    certifications: "Certifications & Compliance",
    installationMaintenance: "Installation & Maintenance",
  };
  return map[type] ?? type;
}

export function inferFileType(tags: string[] = []) {
  const fileTypes = ["PDF", "DWG", "RVT", "IFC", "DXF"];
  return tags.find((t) => fileTypes.includes(t.toUpperCase())) ?? "PDF";
}

export function inferBimType(columnTitle: string = "") {
  const match = columnTitle.match(/\(([^)]+)\)/);
  return match ? match[1].toUpperCase() : columnTitle.toUpperCase();
}