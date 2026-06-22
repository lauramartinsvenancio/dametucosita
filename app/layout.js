import "./globals.css";

export const metadata = {
  title: "Dame Tu Cosita - Portal de Alerta Global",
  description: "A entidade alienígena que dança foi avistada novamente. Acesse os dossiês restritos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
