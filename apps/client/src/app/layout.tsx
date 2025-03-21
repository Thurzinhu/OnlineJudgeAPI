import NavBar from "@/components/nav-bar/nav-bar";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <NavBar />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
