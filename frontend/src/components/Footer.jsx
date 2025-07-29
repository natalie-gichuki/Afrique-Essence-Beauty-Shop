import React from "react";
import {
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";
import { useTranslation } from 'react-i18next';

const Footer = () => {

  const { i18n, t } = useTranslation();

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    i18n.changeLanguage(selectedLang);
  };

  
    return (
      <footer className="bg-[#F5E1E6] text-[#4B2E2E] border-t border-[#E3C9D9] py-10 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 text-sm">
          {/* Left: Brand & Social */}
          <div className="flex flex-col items-start space-y-4">
            <h2 className="text-xl font-bold tracking-wide">Afrique Essence</h2>
            <p className="text-[#5A3D3D]">{t('unveilLuxury')}</p>
            <div className="flex space-x-3">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5 hover:text-[#B88BA4]" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5 hover:text-[#B88BA4]" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <Youtube className="h-5 w-5 hover:text-[#B88BA4]" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 hover:text-[#B88BA4]" />
              </a>
            </div>
          </div>

          {/* Middle: Newsletter Signup */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-semibold text-[#4B2E2E]">{t('joinNewsletter')}</h3>
            <p className="text-[#5A3D3D]">{t('getDeals')}</p>
            <form className="flex w-full max-w-sm">
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 p-2 rounded-l-lg border border-[#E3C9D9] focus:outline-none focus:ring-1 focus:ring-[#B88BA4]"
              />
              <button
                type="submit"
                className="bg-[#B88BA4] text-white px-4 py-2 rounded-r-lg hover:bg-[#A87592]"
              >
                {t('subscribe')}
              </button>
            </form>
          </div>

          {/* Right: Settings */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-semibold text-[#4B2E2E]">{t('settings')}</h3>
            <label className="flex flex-col">
              <span className="mb-1 text-[#5A3D3D]">{t('language')}</span>
              <select className="p-2 border border-[#E3C9D9] rounded"
                onChange={handleLanguageChange}
                value={i18n.language}>
                <option value='en'>English</option>
                <option value='fr'>Français</option>
                <option value='kw'>Swahili</option>
                <option value='cn'>Chinese</option>
              </select>
            </label>
            <label className="flex flex-col">
              <span className="mb-1 text-[#5A3D3D]">{t('currency')}</span>
              <select className="p-2 border border-[#E3C9D9] rounded">
                <option>USD</option>
                <option>KES</option>
                <option>EUR</option>
              </select>
            </label>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="text-center text-xs mt-8 text-[#7D5E5E]">
          &copy; {new Date().getFullYear()} Afrique Essence. {t('allRights')}.
        </div>
      </footer>
    );
  
};

export default Footer;
