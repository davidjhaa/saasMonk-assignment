import "./globals.css";

export const metadata = {
  title: 'Movie Critic',
  description: 'A Movie Review Website',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
