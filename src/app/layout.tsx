"use client"; // Pastikan ini di atas semua ekspresi

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useEffect } from 'react'; // Pastikan import ini ada
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import "./globals.css";

import Header from '../components/Header';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ["latin"] });

// Komponen Client untuk mengubah kelas body berdasarkan tema
const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isLightTheme } = useTheme(); // Ambil status tema dari konteks

  useEffect(() => {
    // Ubah kelas body sesuai dengan tema
    document.body.className = isLightTheme ? 'bg-white text-gray-900' : 'bg-gray-900 text-white';
  }, [isLightTheme]);

  return <>{children}</>; // Hanya kembalikan children tanpa div
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <html lang="id" className={inter.className}>
        <body>
          <ThemeWrapper>
            <Header />
            <main className="container mx-auto p-4">{children}</main>
            <Footer />
          </ThemeWrapper>
        </body>
      </html>
    </ThemeProvider>
  );
};

export default RootLayout;
