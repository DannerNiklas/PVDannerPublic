import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from './NavBar'
import Footer from './Footer'
import * as FirestoreService from "@/services/firestore";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PVDanner',
  description: 'Webapp for visualizing PV inverter data. ',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="w-full max-w-screen align-middle justify-center bg-primary flex flex-col px-4 sm:px-8">
          <NavBar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
