// Adjust this import/export style to match how your other templates
// (e.g. ContactEnquiryEmail) are structured/rendered by your sendMail util.

export type DownloadApprovedEmailProps = {
  name: string;
  fileName: string;
  downloadUrl: string;
  expiresInDays: number;
};

export const DownloadApprovedEmail = ({
  name,
  fileName,
  downloadUrl,
  expiresInDays,
}: DownloadApprovedEmailProps) => (
  <div
    style={{
      fontFamily: "sans-serif",
      color: "#1B2B6B",
      maxWidth: 480,
      margin: "0 auto",
      lineHeight: 1.6,
    }}
  >
    <h2 style={{ fontWeight: 400 }}>Hi {name},</h2>
    <p>
      Your request to download <strong>{fileName}</strong> has been approved.
      Click the button below to download your file.
    </p>
    <p style={{ margin: "24px 0" }}>
      <a
        href={downloadUrl}
        style={{
          display: "inline-block",
          padding: "12px 28px",
          backgroundColor: "#1B2B6B",
          color: "#ffffff",
          textDecoration: "none",
          borderRadius: 4,
        }}
      >
        Download {fileName}
      </a>
    </p>
    <p style={{ fontSize: 13, color: "#666" }}>
      For security, this link can only be used <strong>once</strong> and will
      expire in {expiresInDays} day{expiresInDays === 1 ? "" : "s"}. If you
      need the file again after that, please submit a new request.
    </p>
    <p style={{ fontSize: 13, color: "#666" }}>
      If the button above doesn&apos;t work, copy and paste this link into
      your browser:
      <br />
      {downloadUrl}
    </p>
  </div>
);

export default DownloadApprovedEmail;