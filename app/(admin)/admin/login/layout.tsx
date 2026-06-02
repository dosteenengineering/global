import "../../../globals.css";

export const metadata = {
  title: "Dosteen | Backend Console",
  description: "Dosteen",
};
  
  export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }