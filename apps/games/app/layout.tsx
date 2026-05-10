export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui", margin: 0, padding: 24, background: "#0a0a0a", color: "#eee" }}>
        {children}
      </body>
    </html>
  );
}
