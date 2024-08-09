"use client"; // Menandakan bahwa ini adalah Client Component

import { FC, useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeContext } from '../context/ThemeContext'; // Mengimpor ThemeContext
import Image from 'next/image'; // Mengimpor Image dari next/image

const Header: FC = () => {
  const context = useContext(ThemeContext); // Mengambil context
  const isLightTheme = context?.isLightTheme ?? false; // Menggunakan optional chaining
  const setIsLightTheme = context?.setIsLightTheme; // Ambil fungsi dari context
  const pathname = usePathname();
  const [isSticky, setIsSticky] = useState(false); // Tambahkan state untuk sticky header
  const locale = context?.locale ?? 'en';
  const setLocal = context?.setLocal;
  // const [language, setLanguage] = useState('en'); // Tambahkan state untuk bahasa
  const [dropdownOpen, setDropdownOpen] = useState(false); // Tambahkan state untuk dropdown
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Tambahkan tipe HTMLDivElement

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0); // Perbarui state berdasarkan posisi scroll
    };

    window.addEventListener('scroll', handleScroll); // Tambahkan event listener scroll
    return () => {
      window.removeEventListener('scroll', handleScroll); // Hapus event listener saat unmount
    };
  }, []);

  const toggleTheme = () => {
    if (setIsLightTheme) {
      setIsLightTheme((prev: boolean) => !prev); // Memperbarui context dengan tipe boolean
    } else {
      console.error("setIsLightTheme tidak tersedia dalam context.");
    }
  };

  const handleLanguageChange = (lang: string) => {
    if (setLocal) { // Tambahkan pemeriksaan untuk memastikan setLocal tidak undefined
      setLocal(lang); 
    } else {
      console.error("setLocal tidak tersedia dalam context."); // Tambahkan log error jika setLocal tidak ada
    }
  };
  const handleClickOutside = (event: MouseEvent) => { // Tambahkan tipe MouseEvent
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) { // Tambahkan casting ke Node
      setDropdownOpen(false);
    }
  };

useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, []);

  return (
    <header className={`shadow-md ${isLightTheme ? 'bg-gray-300 text-gray-900' : 'bg-gray-900 text-white'} ${isSticky ? 'fixed top-0 left-0 w-full z-10' : ''}`}>
      <div className="container mx-auto flex justify-between items-center p-4">
      <Link href="/"><h1 className="text-3xl font-bold">AMIR RUDIN</h1></Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/about" className={`hover:text-teal-500 ${pathname === '/about' ? 'text-teal-500' : ''}`}>About</Link>
          <Link href="/articles" className={`hover:text-teal-500 ${pathname === '/articles' ? 'text-teal-500' : ''}`}>Articles</Link>
          <Link href="/projects" className={`hover:text-teal-500 ${pathname === '/projects' ? 'text-teal-500' : ''}`}>Projects</Link>
          <Link href="/speaking" className={`hover:text-teal-500 ${pathname === '/speaking' ? 'text-teal-500' : ''}`}>Speaking</Link>
          <Link href="/uses" className={`hover:text-teal-500 ${pathname === '/uses' ? 'text-teal-500' : ''}`}>Uses</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            aria-label="Switch to light theme"
            className="group rounded-full bg-gray-800/90 p-2 transition hover:bg-gray-700/90 focus:outline-none"
            onClick={toggleTheme}
          >
            <svg
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 stroke-zinc-500 transition group-hover:stroke-teal-400"
              aria-hidden="true"
            >
              <path d="M12 3v1.5M12 19.5v1.5M3 12H1.5M22.5 12H21M5.29 5.29l1.06 1.06M18.36 18.36l1.06 1.06M5.29 18.36l1.06-1.06M18.36 5.29l1.06-1.06M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" />
            </svg>
          </button>
          <div className="relative" ref={dropdownRef}>
            <button className="flex items-center space-x-2" onClick={() => setDropdownOpen(prev => !prev)} >
              <Image src={locale === 'en' ? '/img/english.svg' : '/img/indonesia.svg'} alt="Flag" width={20} height={20} />
              <span>{locale === 'en' ? 'English' : 'Bahasa'}</span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                <button onClick={() => handleLanguageChange('en')} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">English</button>
                <button onClick={() => handleLanguageChange('id')} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">Bahasa</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;