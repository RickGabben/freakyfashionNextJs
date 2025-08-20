// src/app/layout.tsx
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body className="min-h-dvh bg-gray-50 text-slate-900">{children}</body>
    </html>
  );
}
