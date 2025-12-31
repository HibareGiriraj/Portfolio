import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains"
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://girirajhibare.dev'),
  title: {
    default: "Giriraj Hibare | MERN Stack Developer",
    template: "%s | Giriraj Hibare"
  },
  description: "Full Stack Developer specializing in React, Next.js, Node.js, and MongoDB. Building beautiful, scalable, and performant web applications. Available for freelance and full-time opportunities.",
  keywords: [
    "MERN Stack Developer",
    "React Developer",
    "Full Stack Developer",
    "Web Developer",
    "Node.js Developer",
    "Next.js Developer",
    "MongoDB",
    "JavaScript",
    "Portfolio",
    "Giriraj Hibare",
    "Freelance Developer",
    "India"
  ],
  authors: [{ name: "Giriraj Hibare", url: "https://girirajhibare.dev" }],
  creator: "Giriraj Hibare",
  publisher: "Giriraj Hibare",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://girirajhibare.dev",
    siteName: "Giriraj Hibare Portfolio",
    title: "Giriraj Hibare | MERN Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, Node.js, and MongoDB. Building beautiful, scalable web applications.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Giriraj Hibare - MERN Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Giriraj Hibare | MERN Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, Node.js, and MongoDB.",
    creator: "@girirajh",
    images: ["/og-image.png"],
  },
  verification: {
    // Add your verification codes here when you have them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
