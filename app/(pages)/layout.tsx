import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Registro de Actividades",
  description: "Sistemas de Registro de Actividades para los auxiliares del Laboratorio Integrado de Sistemas - UdeA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">{children}</body>
    </html>
  );
}
