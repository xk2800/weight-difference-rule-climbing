import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/components/Updates/modal-provider";
import { ModalProvider as AddOnModal } from "@/components/AddOnSurvey/modal-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { LogRocketProvider } from "@/utils/LogRocketProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const APP_NAME = "Lead Climbing Safety Calculator";
const APP_DEFAULT_TITLE = "Lead Climbing Safety Calculator";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "Safe climbing app for climbers to track their weight and climbing progress.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ModalProvider />
          <AddOnModal />
          <LogRocketProvider>
            {children}
          </LogRocketProvider>
        </ThemeProvider>
        <script defer src="https://umami.xavierkhew.com/script.js" data-website-id="4ffb86ce-53e6-417f-a602-1604ad1c5db7"></script>      </body>
    </html>
  );
}
