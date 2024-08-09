import { FC, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext'; // Mengimpor ThemeContext

const Footer: FC = () => {
  const context = useContext(ThemeContext); // Mengambil tema dari context
  const isLightTheme = context?.isLightTheme ?? false; 

  return (
    <footer className={`p-4 mt-4 ${isLightTheme ? 'bg-gray-300 text-black' : 'bg-gray-900 text-white'} text-white text-center`}>
      <p>&copy; 2024 Portofolio Saya. Semua hak cipta dilindungi.</p>
    </footer>
  );
};

export default Footer;